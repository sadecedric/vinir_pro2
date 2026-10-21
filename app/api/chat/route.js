import { Mistral } from '@mistralai/mistralai';
import { SYSTEM_PROMPT } from '@/config/systemPrompt';
import { sql, ensureTables } from '@/lib/db';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 20;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'The request body must be valid JSON.' }, { status: 400 });
  }
  const { message, history = [], sessionId } = body ?? {};

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return Response.json(
      { error: "The 'message' field is required and cannot be empty." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `The message must not exceed ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    // Never accept client-supplied system instructions that could override the English-only rule.
    const trimmedHistory = (Array.isArray(history) ? history : [])
      .filter((entry) => entry && ['user', 'assistant'].includes(entry.role) && typeof entry.content === 'string')
      .slice(-MAX_HISTORY_LENGTH)
      .map(({ role, content }) => ({ role, content: content.slice(0, MAX_MESSAGE_LENGTH) }));

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedHistory,
      { role: 'user', content: message.trim() },
    ];

    if (!process.env.MISTRAL_API_KEY) {
      return Response.json({ error: 'The assistant is temporarily unavailable. Please try again later.' }, { status: 503 });
    }
    const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    const response = await mistral.chat.complete({
      model: 'mistral-small-latest',
      messages,
    });

    const reply = response.choices[0]?.message?.content ?? '';

    if (sessionId && process.env.DATABASE_URL) {
      try {
        await ensureTables();
        await sql`
          INSERT INTO sessions (id, updated_at, message_count)
          VALUES (${sessionId}, NOW(), 1)
          ON CONFLICT (id) DO UPDATE
          SET updated_at = NOW(), message_count = sessions.message_count + 1
        `;
        await sql`
          INSERT INTO messages (session_id, role, content)
          VALUES (${sessionId}, 'user', ${message.trim()}),
                 (${sessionId}, 'assistant', ${reply})
        `;
      } catch (dbErr) {
        console.error('[chat] DB error:', dbErr.message ?? dbErr);
      }
    }

    return Response.json({ reply });
  } catch (err) {
    console.error('[chat] Mistral request failed:', err.message ?? err);
    return Response.json(
      { error: 'An error occurred. Please try again in a moment.' },
      { status: 500 }
    );
  }
}

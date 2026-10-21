export async function sendMessage(message, history = [], sessionId = null) {
  let response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history, sessionId }),
    });
  } catch {
    throw new Error('Unable to reach the server. Please check your connection.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error ?? `Server error (${response.status})`);
  }

  const data = await response.json();
  return data.reply;
}

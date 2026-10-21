'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatBubble from '@/components/ChatBubble';
import VoiceNote from '@/components/VoiceNote';
import PlatformsCard from '@/components/PlatformsCard';
import ChatInput from '@/components/ChatInput';
import { WELCOME_MESSAGE } from '@/lib/config';
import { sendMessage } from '@/services/chatApi';

function getSessionId() {
  const key = 'vinir_pro2_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export default function Page() {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const currentHistory = history;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text },
    ]);
    setIsLoading(true);

    try {
      const reply = await sendMessage(text, currentHistory.slice(-20), sessionIdRef.current);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'assistant', text: reply },
      ]);
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'assistant',
          text: "Sorry, I could not reply. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app-backdrop ${isDark ? 'dark' : ''}`}>
      <div className="chat-shell flex flex-col h-dvh max-w-md mx-auto text-slate-900 dark:text-white overflow-hidden">

        <Header isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

        <main className="chat-timeline flex-1 overflow-y-auto min-h-0 px-4 py-5 space-y-4">
          <ChatBubble sender="assistant" text={WELCOME_MESSAGE} />

          <ChatBubble sender="assistant">
            <VoiceNote src="/welcome.ogg" />
          </ChatBubble>

          {messages.map((msg) => (
            <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
          ))}

          {isLoading && (
            <ChatBubble sender="assistant">
              <span className="flex gap-1 items-center py-0.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce [animation-delay:300ms]" />
              </span>
            </ChatBubble>
          )}

          <div ref={bottomRef} />
        </main>

        <div className="flex-shrink-0 bg-rose-50/90 dark:bg-slate-950/95 border-t border-rose-100 dark:border-slate-800">
          <PlatformsCard />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>

      </div>
    </div>
  );
}

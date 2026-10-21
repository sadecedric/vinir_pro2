'use client';

import { useState } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        className="flex-shrink-0 w-10 h-10 bg-rose-500 hover:bg-rose-400 active:bg-rose-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shadow"
        aria-label="Send"
      >
        <SendIcon />
      </button>
    </form>
  );
}

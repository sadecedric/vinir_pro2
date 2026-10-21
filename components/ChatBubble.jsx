'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const mdComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

export default function ChatBubble({ sender, text, children }) {
  const isUser = sender === 'user';

  let content;
  if (isUser) {
    content = <p>{text ?? children}</p>;
  } else if (text) {
    content = (
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      </div>
    );
  } else {
    content = children;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-br-sm leading-relaxed'
            : 'bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  );
}

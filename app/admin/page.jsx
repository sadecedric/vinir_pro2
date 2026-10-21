'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ASSISTANT_NAME } from '@/lib/config';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-sm mx-4 rounded-2xl p-8 bg-slate-900 border border-slate-700 shadow-xl">
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-white tracking-wide">{ASSISTANT_NAME}</p>
          <p className="text-sm mt-1 text-rose-500">Admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 bg-slate-800 border border-slate-700 focus:outline-none focus:border-rose-500"
          />
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

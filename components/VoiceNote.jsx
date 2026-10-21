'use client';

import { useState, useRef, useEffect } from 'react';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function formatTime(sec) {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const SPEEDS = [1, 1.5, 2];

export default function VoiceNote({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [error, setError] = useState('');
  const speed = SPEEDS[speedIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { audio.currentTime = 0; setCurrentTime(0); setIsPlaying(false); };
    const onPlay = () => { setIsPlaying(true); setError(''); };
    const onPause = () => setIsPlaying(false);
    const onError = () => { setIsPlaying(false); setError('Unable to play this voice note. Please try again.'); };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play().catch(() => setError('Unable to play this voice note. Please try again.'));
    }
  };

  const cycleSpeed = () => {
    const nextIndex = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(nextIndex);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[nextIndex];
  };

  return (
    <div>
    <div className="flex items-center gap-2.5 min-w-55">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={togglePlay}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white bg-green-500 hover:bg-green-400 active:bg-green-600 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="flex-1 min-w-0">
        <input
          type="range"
          min="0"
          max={Number.isFinite(duration) && duration > 0 ? duration : 0}
          step="0.1"
          value={currentTime}
          disabled={!Number.isFinite(duration) || duration <= 0}
          onChange={(e) => {
            if (!audioRef.current) return;
            const time = Number(e.target.value);
            audioRef.current.currentTime = time;
            setCurrentTime(time);
          }}
          aria-label="Voice note progress"
          className="block w-full h-1.5 accent-green-500 cursor-pointer"
        />
        <p className="text-[11px] mt-1 text-gray-500 dark:text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
      </div>

      <button
        type="button"
        onClick={cycleSpeed}
        className="shrink-0 px-2 py-1 rounded-full text-[11px] font-bold text-green-500 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
        aria-label="Change playback speed"
        title="Playback speed"
      >
        {speed}x
      </button>
    </div>
    {error && <p role="alert" className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}

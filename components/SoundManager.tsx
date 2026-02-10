
import React, { useEffect, useRef } from 'react';

// Singleton-ish audio instances to avoid GC thrashing
const UI_CLICK_AUDIO = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
UI_CLICK_AUDIO.volume = 0.15;

export const playClickSound = () => {
  // Reset playback if sound is already playing
  UI_CLICK_AUDIO.currentTime = 0;
  UI_CLICK_AUDIO.play().catch(() => {}); 
};

const SoundManager: React.FC = () => {
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3');
    audio.loop = true;
    audio.volume = 0.08;
    
    const playAmbient = () => {
        audio.play().catch(e => console.log("Ambient audio blocked or failed."));
    };

    playAmbient();
    ambientRef.current = audio;

    return () => {
      audio.pause();
      audio.src = ""; // Clean up source for better memory management
    };
  }, []);

  return null;
};

export default SoundManager;

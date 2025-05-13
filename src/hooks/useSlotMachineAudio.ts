
import { useEffect, useRef } from 'react';

export const useSlotMachineAudio = () => {
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const loseSoundRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio elements
    spinSoundRef.current = new Audio('/spin-sound.mp3');
    winSoundRef.current = new Audio('/win-sound.mp3');
    loseSoundRef.current = new Audio('/lose-sound.mp3');
    
    // Cleanup on unmount
    return () => {
      spinSoundRef.current?.pause();
      winSoundRef.current?.pause();
      loseSoundRef.current?.pause();
    };
  }, []);

  const playSpinSound = () => {
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(e => console.error("Error playing spin sound:", e));
    }
  };

  const playWinSound = () => {
    if (winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play().catch(e => console.error("Error playing win sound:", e));
    }
  };

  const playLoseSound = () => {
    if (loseSoundRef.current) {
      loseSoundRef.current.currentTime = 0;
      loseSoundRef.current.play().catch(e => console.error("Error playing lose sound:", e));
    }
  };

  return {
    playSpinSound,
    playWinSound,
    playLoseSound
  };
};

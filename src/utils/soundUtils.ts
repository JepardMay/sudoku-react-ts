import { useSound } from '../hooks/useSound';

export const openGameSound = (mute: boolean) => useSound('sounds/Modern8.mp3', mute);

export const closeGameSound = (mute: boolean) => useSound('sounds/Modern9.mp3', mute);

export const cellFillSound = (mute: boolean) => useSound('sounds/Modern5.mp3', mute);

export const cellEraseSound = (mute: boolean) => useSound('sounds/Modern6.mp3', mute);

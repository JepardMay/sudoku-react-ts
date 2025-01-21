export const useSound = (url: string, mute: boolean) => {
  const audio = new Audio(url);

  const play = () => {
    if (!mute) audio.play();
  };

  return play;
};

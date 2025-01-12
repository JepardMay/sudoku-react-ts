export const useSound = (url: string) => {
  const audio = new Audio(url);

  const play = () => {
    audio.play();
  };

  return play;
};

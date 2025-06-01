export const preloadImage = (src: string): Promise<unknown> => {
  const img = new Image();
  img.src = src;

  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
};

export const getTimeByMinutes = (minutes: number = 1): Date => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * minutes);

  return time;
};

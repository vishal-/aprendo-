export const preloadImage = (src: string): Promise<unknown> => {
  const img = new Image();
  img.src = src;

  return new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
};

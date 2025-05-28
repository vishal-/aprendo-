export const generateUniqueId = (): string => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${random}`;
};

export const generateSimpleId = (): string =>
  Date.now().toString(36).slice(0, 5) +
  "_" +
  Math.random().toString(36).slice(2, 7) +
  "_" +
  Math.random().toString(36).slice(2, 7);

export const getRandomUUID = (): string => crypto.randomUUID();

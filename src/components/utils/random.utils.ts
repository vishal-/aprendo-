export const generateUniqueId = (): string => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${random}`;
};

export const getRandomId = (): string =>
  Date.now().toString(36).slice(0, 5) +
  "_" +
  Math.random().toString(36).slice(2, 7) +
  "_" +
  Math.random().toString(36).slice(2, 7);

// export const getRandomUUID = (): string => crypto.randomUUID();

export const getRandomFromDataset = (
  dataset: Record<string, unknown>[],
  existing: string[]
): Record<string, unknown> | null => {
  const available = dataset.filter(
    (item) => !existing.includes(item.id as string)
  );

  if (available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  return null;
};

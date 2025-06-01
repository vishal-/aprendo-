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
    ({ label }) => !existing.includes(label as string)
  );

  if (available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }

  return null;
};

export const getRandomOptionsFromDataset = (
  dataset: Record<string, unknown>[],
  original: string,
  size: number = 6
): string[] => {
  const itemList = dataset.map(({ label }) => label as string);
  const options = [original];

  while (options.length < size) {
    const option = itemList[Math.floor(Math.random() * itemList.length)];

    if (!options.includes(option)) {
      options.push(option);
    }
  }

  options.sort(() => Math.random() - 0.2);
  options.sort(() => Math.random() - 0.6);

  return options;
};

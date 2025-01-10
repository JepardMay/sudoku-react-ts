export const setStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getStorage = <T>(key: string, defaultValue: T): T => {
  const savedValue = localStorage.getItem(key);
  
  try {
    return savedValue ? JSON.parse(savedValue) as T : defaultValue;
  } catch {
    return savedValue !== null ? savedValue as unknown as T : defaultValue;
  }
};

export const removeSavedStorage = (key: string): void => {
  localStorage.removeItem(key);
};

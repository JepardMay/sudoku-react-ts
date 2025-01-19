export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

export const stringToArray = (str: string): number[][] => {
  const replacedString = str.replace(/-/g, '0');

  const numbersArray = replacedString.split('').map(char => parseInt(char, 10));

  const groupedArray = [];
  for (let i = 0; i < numbersArray.length; i += 9) {
    groupedArray.push(numbersArray.slice(i, i + 9));
  }

  return groupedArray;
};

export function formatDate(input: Date | string) {
  let date;

  if (typeof input === 'string') {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    throw new Error('Invalid input type');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};

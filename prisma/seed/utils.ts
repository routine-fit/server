export const padMessage = (message: string, char = '-', startLength = 20, endLength = 45) => {
  return '|'.padEnd(startLength, char) + ` ${message} `.padEnd(endLength, char) + '|';
};

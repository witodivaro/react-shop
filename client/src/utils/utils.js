export const cutStringByLength = (string, length) => {
  return string.length < length ? string : string.slice(0, length) + '…';
};

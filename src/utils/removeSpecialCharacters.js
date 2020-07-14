export const removeSpecial = obj => {
  const removed = {};
  for (const property in obj) {
    removed[property] = obj[property].replace(/[^\w\s]/gi, '');
  }
  return removed;
};

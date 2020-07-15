export const removeSpecial = obj => {
  const removed = {};
  for (const property in obj) {
    if (
      !obj[property] ||
      property.includes('passw') ||
      obj[property].includes('@') ||
      obj[property].includes('avatar')
    ) {
      removed[property] = obj[property];
    } else {
      removed[property] = obj[property].replace(/[^\w\s]/gi, '');
    }
  }
  return removed;
};

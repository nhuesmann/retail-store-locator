exports.capitalize = string => {
  if (!string) return string;

  return string
    .replace('.', '')
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
};

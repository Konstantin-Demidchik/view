/* eslint-disable */
const getFileSize = (file) => {
  if (file.size / 1073741824 > 1) return `${(file.size / 1073741824).toFixed(2)} Гб`;
  if (file.size / 1048576 > 1) return `${(file.size / 1048576).toFixed(2)} Мб`;
  if (file.size / 1024 > 1) return `${(file.size / 1024).toFixed(2)} Кб`;
  return '1 Кб';
};

const fileSizeMegabytes = (file) => {
  if (file) {
    return file.size / 1048576;
  }

  return 0;
};

export {
  getFileSize,
  fileSizeMegabytes,
};

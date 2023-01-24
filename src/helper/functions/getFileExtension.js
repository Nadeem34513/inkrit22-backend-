export const getFileExtension = (fileName) => {
  const fileExtension = fileName.split(".").pop();
  return fileExtension;
};

export const humanSize = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let humanSize = size;
  while (humanSize >= 1024 && unitIndex < units.length - 1) {
    humanSize /= 1024;
    unitIndex++;
  }
  return `${humanSize.toFixed(2)} ${units[unitIndex]}`;
};

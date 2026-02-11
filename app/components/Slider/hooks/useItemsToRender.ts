export const useItemsToRender = <T>(
  arr: T[],
  current: number,
  renderedLength: number,
): T[] => {
  const len = arr.length;
  if (len === 0 || renderedLength <= 0) return [];

  const safeCurrent = modifyI(current, len);
  const center = Math.floor(renderedLength / 2);

  const result: T[] = new Array(renderedLength);

  for (let i = 0; i < renderedLength; i++) {
    const offset = i - center;
    const index = modifyI(safeCurrent + offset, len);
    result[i] = arr[index];
  }

  return result;
};

function modifyI(n: number, m: number) {
  return ((n % m) + m) % m;
}

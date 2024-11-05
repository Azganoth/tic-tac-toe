export const getRowCol = (
  index: number,
  cols: number = 3,
): [row: number, col: number] => [
  Math.floor(index / cols) + 1,
  (index % cols) + 1,
];

export const getIndex = (row: number, col: number, cols: number = 3): number =>
  (row - 1) * cols + (col - 1);

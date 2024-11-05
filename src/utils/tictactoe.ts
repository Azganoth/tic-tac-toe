export enum BoardCell {
  N,
  X,
  O,
}

export const N = BoardCell.N;
export const X = BoardCell.X;
export const O = BoardCell.O;

// 0 1 2
// 3 4 5
// 6 7 8
export type Board = BoardCell[];
export type BoardSymbol = BoardCell.X | BoardCell.O;

export const getOpponent = (symbol: BoardSymbol): BoardSymbol =>
  symbol === BoardCell.X ? BoardCell.O : BoardCell.X;

export const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, () => BoardCell.N);

export const place = (
  board: Board,
  symbol: BoardSymbol,
  row: number,
  col: number,
): void => {
  board[(row - 1) * 3 + col - 1] = symbol;
};

export const hasWinner = (board: Board, symbol: BoardSymbol): boolean => {
  for (let i = 0; i < 3; i++) {
    // Check row (0, 1, 2) (3, 4, 5) (6, 7, 8)
    const rowStart = 3 * i;
    if (
      board[rowStart] === symbol &&
      board[rowStart + 1] === symbol &&
      board[rowStart + 2] === symbol
    ) {
      // console.log(`${i}-row`);
      return true;
    }

    // Check column (0, 3, 6) (1, 4, 7) (2, 5, 8)
    if (
      board[i] === symbol &&
      board[i + 3] === symbol &&
      board[i + 6] === symbol
    ) {
      // console.log(`${i}-column`);
      return true;
    }
  }

  // Check diagonal from top left to bottom right (0, 4, 8)
  if (board[0] === symbol && board[4] === symbol && board[8] === symbol) {
    // console.log("dl");
    return true;
  }
  // Check diagonal from top right to bottom left (2, 4, 6)
  if (board[2] === symbol && board[4] === symbol && board[6] === symbol) {
    // console.log("dr");
    return true;
  }

  return false;
};

export const isTie = (board: Board): boolean =>
  board.every((cell) => cell !== BoardCell.N) &&
  !hasWinner(board, BoardCell.X) &&
  !hasWinner(board, BoardCell.O);

const getEmptyCells = (board: Board): number[] => {
  const cells: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === BoardCell.N) {
      cells.push(i);
    }
  }

  return cells;
};

// Minimax Algorithm
const minmax = (
  board: Board,
  player: BoardSymbol,
  depth: number,
  isMaximizing: boolean = false,
): number => {
  // console.log(board, player, isMaximizing);
  const opponentPlayer = getOpponent(player);

  // Check for terminal states:
  // - If the current player has won, return a high score.
  // - If the opponent has won, return a low score.
  // - If the board is full (no empty cells), it's a tie.
  if (hasWinner(board, player)) {
    return 10;
  }
  if (hasWinner(board, opponentPlayer)) {
    return -10;
  }
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) {
    return 0;
  }

  // Recursively explore possible moves:
  // - Maximizing player's turn: Find the move that maximizes the player's chance of winning.
  // - Minimizing player's turn: Find the move that minimizes the opponent's chance of winning.
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const i of emptyCells) {
      const newBoard = [...board];
      newBoard[i] = player;
      const score = minmax(newBoard, player, depth + 1, false);
      bestScore = Math.max(bestScore, score);
    }

    return bestScore - depth;
  } else {
    let bestScore = Infinity;
    for (const i of emptyCells) {
      const newBoard = [...board];
      newBoard[i] = opponentPlayer;
      const score = minmax(newBoard, opponentPlayer, depth + 1, true);
      bestScore = Math.min(bestScore, score);
    }

    return bestScore + depth;
  }
};

export const aiMove = (board: Board, symbol: BoardSymbol): number => {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (const i of getEmptyCells(board)) {
    const newBoard = [...board];
    newBoard[i] = symbol;
    const score = minmax(newBoard, symbol, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
};

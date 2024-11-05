import { GameScorer, type GameState } from "../reducers/GameReducer";
import * as TicTacToe from "./tictactoe";

const isRecord = <T extends string | number | symbol>(
  value: unknown,
  keys: T[],
): value is Record<T, unknown> =>
  value !== null &&
  typeof value === "object" &&
  keys.every((key) => key in value);

export const boardValidator = (board: unknown): board is TicTacToe.Board =>
  Array.isArray(board) &&
  board.length === 9 &&
  board.every(
    (cell) =>
      cell === TicTacToe.N || cell === TicTacToe.X || cell === TicTacToe.O,
  );

const isTicTacToeSymbol = (value: unknown) =>
  value === TicTacToe.X || value === TicTacToe.O;

const isValidScore = (value: unknown) =>
  typeof value === "number" && value >= 0;

const isValidMovePosition = (value: unknown) =>
  typeof value === "number" && value >= 1 && value <= 3;

export const gameStateValidator = (state: unknown): state is GameState =>
  isRecord(state, [
    "player",
    "againstCPU",
    "board",
    "currentTurn",
    "score",
    "history",
  ]) &&
  isTicTacToeSymbol(state.player) &&
  typeof state.againstCPU === "boolean" &&
  boardValidator(state.board) &&
  isTicTacToeSymbol(state.currentTurn) &&
  isRecord(state.score, [GameScorer.X, GameScorer.Ties, GameScorer.O]) &&
  isValidScore(state.score[GameScorer.X]) &&
  isValidScore(state.score[GameScorer.Ties]) &&
  isValidScore(state.score[GameScorer.O]) &&
  Array.isArray(state.history) &&
  state.history.every(
    (move) =>
      Array.isArray(move) &&
      move.length === 3 &&
      isTicTacToeSymbol(move[0]) &&
      isValidMovePosition(move[1]) &&
      isValidMovePosition(move[2]),
  );

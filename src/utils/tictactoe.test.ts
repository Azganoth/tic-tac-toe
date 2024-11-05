import { describe, expect, it } from "vitest";
import { createTestBoard } from "./test-utils";
import * as TicTacToe from "./tictactoe";

describe("TicTacToe", () => {
  it("should create a new empty board", () => {
    const board = TicTacToe.createEmptyBoard();

    expect(board.length).toBe(9);
    board.forEach((cell) => {
      expect(cell).toBe(TicTacToe.N);
    });
  });

  it("should detect a horizontal winner", () => {
    const board = TicTacToe.createEmptyBoard();

    // Set a row to the same symbol
    TicTacToe.place(board, TicTacToe.X, 1, 1);
    TicTacToe.place(board, TicTacToe.X, 1, 2);
    TicTacToe.place(board, TicTacToe.X, 1, 3);

    expect(TicTacToe.hasWinner(board, TicTacToe.X)).toBe(true);
  });

  it("should detect a vertical winner", () => {
    const board = TicTacToe.createEmptyBoard();

    // Set a column to the same symbol
    TicTacToe.place(board, TicTacToe.X, 1, 1);
    TicTacToe.place(board, TicTacToe.X, 2, 1);
    TicTacToe.place(board, TicTacToe.X, 3, 1);

    expect(TicTacToe.hasWinner(board, TicTacToe.X)).toBe(true);
  });

  it("should detect a diagonal winner (top left to bottom right)", () => {
    const board = TicTacToe.createEmptyBoard();

    // Set the diagonal to the same symbol
    TicTacToe.place(board, TicTacToe.O, 1, 1);
    TicTacToe.place(board, TicTacToe.O, 2, 2);
    TicTacToe.place(board, TicTacToe.O, 3, 3);

    expect(TicTacToe.hasWinner(board, TicTacToe.O)).toBe(true);
  });

  it("should detect a diagonal winner (top right to bottom left)", () => {
    const board = TicTacToe.createEmptyBoard();

    // Set the diagonal to the same symbol
    TicTacToe.place(board, TicTacToe.O, 1, 3);
    TicTacToe.place(board, TicTacToe.O, 2, 2);
    TicTacToe.place(board, TicTacToe.O, 3, 1);

    expect(TicTacToe.hasWinner(board, TicTacToe.O)).toBe(true);
  });

  it("should detect a tie", () => {
    expect(TicTacToe.isTie(createTestBoard("tie"))).toBe(true);
  });

  it("should detect a non-tie", () => {
    for (const board of [
      createTestBoard("2x1-win"),
      createTestBoard("x-win"),
      createTestBoard("o-win"),
    ]) {
      expect(TicTacToe.isTie(board)).toBe(false);
    }
  });

  it("should return the opponent's symbol", () => {
    expect(TicTacToe.getOpponent(TicTacToe.X)).toBe(TicTacToe.O);
    expect(TicTacToe.getOpponent(TicTacToe.O)).toBe(TicTacToe.X);
  });
});

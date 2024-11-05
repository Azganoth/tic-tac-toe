import { describe, expect, it } from "vitest";
import { createTestBoard, createTestGameState } from "./test-utils";
import * as TicTacToe from "./tictactoe";
import { boardValidator, gameStateValidator } from "./validators";

describe("validators", () => {
  describe("boardValidator", () => {
    it("should accept an empty board", () => {
      const emptyBoard = createTestBoard("empty");
      expect(boardValidator(emptyBoard)).toBe(true);
    });

    it("should accept a tied board", () => {
      const validBoard = createTestBoard("tie");
      expect(boardValidator(validBoard)).toBe(true);
    });

    it("should accept an unfinished game board", () => {
      const validBoard = createTestBoard("2x1-win");
      expect(boardValidator(validBoard)).toBe(true);
    });

    it("should accept a finished game board", () => {
      const validBoard = createTestBoard("o-win");
      expect(boardValidator(validBoard)).toBe(true);
    });

    it("should reject invalid board by it's size", () => {
      const invalidBoard = createTestBoard("tie").slice(-3);
      expect(boardValidator(invalidBoard)).toBe(false);
    });

    it("should reject invalid cell values", () => {
      const invalidBoard: unknown[] = createTestBoard("tie");
      invalidBoard[4] = "invalid";
      expect(boardValidator(invalidBoard)).toBe(false);
    });
  });

  describe("gameStateValidator", () => {
    it("should accept a clean game state", () => {
      const validGameState = createTestGameState();
      expect(gameStateValidator(validGameState)).toBe(true);
    });

    it("should reject invalid 'player' property", () => {
      const invalidGameState = {
        ...createTestGameState(),
        player: "invalid",
      };
      expect(gameStateValidator(invalidGameState)).toBe(false);
    });

    it("should reject invalid 'currentTurn' property", () => {
      const invalidGameState = {
        ...createTestGameState(),
        currentTurn: "invalid",
      };
      expect(gameStateValidator(invalidGameState)).toBe(false);
    });

    it("should reject invalid 'score' property", () => {
      const invalidGameState = {
        ...createTestGameState(),
        score: { X: "invalid", Ties: 0, O: 0 },
      };
      expect(gameStateValidator(invalidGameState)).toBe(false);
    });

    it("should reject invalid 'history' property", () => {
      const invalidGameState = {
        ...createTestGameState(),
        history: [[9, -1, 99]],
      };
      expect(gameStateValidator(invalidGameState)).toBe(false);
    });

    it("should reject an incomplete game state", () => {
      const invalidGameState = {
        player: TicTacToe.X,
        againstCPU: true,
        board: createTestBoard("empty"),
      };
      expect(gameStateValidator(invalidGameState)).toBe(false);
    });
  });
});

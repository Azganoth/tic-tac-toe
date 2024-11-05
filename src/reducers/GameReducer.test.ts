import { describe, expect, it } from "vitest";
import {
  createTestBoard,
  createTestGameState,
  createTestScore,
} from "../utils/test-utils";
import * as TicTacToe from "../utils/tictactoe";
import { GameAction, gameReducer, GameScorer } from "./GameReducer";

describe("gameReducer", () => {
  it("should initialize with a clean game state on START action", () => {
    const initialState = createTestGameState({ player: TicTacToe.O });
    const player = TicTacToe.X;
    const againstCPU = false;

    const newState = gameReducer(initialState, {
      type: GameAction.Start,
      payload: { player, againstCPU },
    });

    expect(newState.player).toBe(player);
    expect(newState.againstCPU).toBe(againstCPU);
    expect(newState.board).toEqual(TicTacToe.createEmptyBoard());
    expect(newState.currentTurn).toBeOneOf([TicTacToe.X, TicTacToe.O]); // Random initial turn
    expect(newState.score).toEqual(createTestScore(0, 0, 0));
    expect(newState.history).toEqual([]);
  });

  it("should reset the game to a clean state but maintain score on RESTART action", () => {
    const initialState = createTestGameState({
      player: TicTacToe.O,
      againstCPU: true,
      board: "2x1-win",
      score: createTestScore(1, 0, 2),
      history: [
        [TicTacToe.X, 1, 1],
        [TicTacToe.O, 3, 1],
        [TicTacToe.X, 1, 2],
      ],
    });
    const player = initialState.player;
    const againstCPU = initialState.againstCPU;
    const score = initialState.score;

    const newState = gameReducer(initialState, {
      type: GameAction.Restart,
    });

    expect(newState.player).toBe(player);
    expect(newState.againstCPU).toBe(againstCPU);
    expect(newState.board).toEqual(createTestBoard("empty"));
    expect(newState.currentTurn).toBe(TicTacToe.X);
    expect(newState.score).toEqual(score);
    expect(newState.history).toEqual([]);
  });

  it("should reset the game state but maintain score on NEXT action", () => {
    const initialState = createTestGameState({
      player: TicTacToe.X,
      board: "2x1-win",
      score: createTestScore(1, 0, 2),
      history: [[TicTacToe.X, 1, 1]],
    });
    const player = initialState.player;
    const againstCPU = initialState.againstCPU;
    const score = initialState.score;

    const newState = gameReducer(initialState, {
      type: GameAction.Next,
    });

    expect(newState.player).toBe(player);
    expect(newState.againstCPU).toBe(againstCPU);
    expect(newState.board).toEqual(createTestBoard("empty"));
    expect(newState.currentTurn).toBe(TicTacToe.X);
    expect(newState.score).toEqual(score);
    expect(newState.history).toEqual([]);
  });

  it("should update the board and advance to the next turn on a valid PLACE action", () => {
    const initialState = createTestGameState({
      board: "2x1-win",
      currentTurn: TicTacToe.X,
    });
    const row = 2;
    const col = 1;

    const expectedBoard = [...initialState.board];
    TicTacToe.place(expectedBoard, initialState.currentTurn, row, col);

    const newState = gameReducer(initialState, {
      type: GameAction.Place,
      payload: { row, col },
    });

    expect(newState.board).toEqual(expectedBoard);
    expect(newState.currentTurn).toBe(TicTacToe.O);
  });

  it("should update the history on a valid PLACE action", () => {
    const initialState = createTestGameState({
      board: "empty",
      currentTurn: TicTacToe.X,
    });

    const row = 1;
    const col = 2;

    const expectedBoard = [...initialState.board];
    TicTacToe.place(expectedBoard, initialState.currentTurn, row, col);

    const newState = gameReducer(initialState, {
      type: GameAction.Place,
      payload: { row, col },
    });

    expect(newState.board).toEqual(expectedBoard);
    expect(newState.currentTurn).toBe(TicTacToe.O);
  });

  it("should update the history on a valid PLACE action", () => {
    const initialState = createTestGameState({
      board: "empty",
      currentTurn: TicTacToe.X,
    });

    let newState = initialState;
    newState = gameReducer(newState, {
      type: GameAction.Place,
      payload: { row: 1, col: 1 },
    });
    newState = gameReducer(newState, {
      type: GameAction.Place,
      payload: { row: 1, col: 2 },
    });
    newState = gameReducer(newState, {
      type: GameAction.Place,
      payload: { row: 1, col: 3 },
    });

    expect(newState.history).toEqual([
      [TicTacToe.X, 1, 1],
      [TicTacToe.O, 1, 2],
      [TicTacToe.X, 1, 3],
    ]);
  });

  it("should update the score on a valid SCORE action", () => {
    const initialState = createTestGameState({ board: "2x1-win" });

    const newState = gameReducer(initialState, {
      type: GameAction.Score,
      payload: { scorer: GameScorer.X },
    });

    expect(newState.score).toEqual(createTestScore(1, 0, 0));
  });
});

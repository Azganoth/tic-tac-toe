import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { saveGameState } from "../utils/storage";
import { createTestGameState, createTestScore } from "../utils/test-utils";
import * as TicTacToe from "../utils/tictactoe";
import { AI_TIMEOUT, GameStatus, useGame } from "./useGame";

vi.mock(import("../utils/storage"), () => ({
  saveGameState: vi.fn(),
}));

vi.mock(import("../utils/tictactoe"), async (importOriginalModule) => ({
  ...(await importOriginalModule()),
  aiMove: vi.fn().mockReturnValue(3),
}));

describe("useGame", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with correct state and status", () => {
    const initialState = createTestGameState();
    const { result } = renderHook(() => useGame(initialState));

    expect(result.current[0]).toEqual({
      ...initialState,
      status: GameStatus.Next,
    });
    expect(result.current[1].place).toBeTypeOf("function");
    expect(result.current[1].start).toBeTypeOf("function");
    expect(result.current[1].restart).toBeTypeOf("function");
    expect(result.current[1].next).toBeTypeOf("function");
  });

  it("should update status and score on a tied game", () => {
    const initialState = createTestGameState({ board: "3x1-tie" });
    const { result } = renderHook(() => useGame(initialState));

    expect(result.current[0].status).toBe(GameStatus.Next);

    act(() => {
      result.current[1].place(3, 1);
    });

    expect(result.current[0].status).toBe(GameStatus.Tie);
    expect(result.current[0].score).toEqual(createTestScore(0, 1, 0));
  });

  it("should update status and score when X wins a column", () => {
    const initialState = createTestGameState({
      board: "2x1-win",
      currentTurn: TicTacToe.X,
    });
    const { result } = renderHook(() => useGame(initialState));

    expect(result.current[0].status).toBe(GameStatus.Next);

    act(() => {
      result.current[1].place(2, 1);
    });

    expect(result.current[0].status).toBe(GameStatus.XWin);
    expect(result.current[0].score).toEqual(createTestScore(1, 0, 0));
  });

  it("should update status and score when O wins a row", () => {
    const initialState = createTestGameState({
      board: "2x1-win",
      currentTurn: TicTacToe.O,
    });
    const { result } = renderHook(() => useGame(initialState));

    expect(result.current[0].status).toBe(GameStatus.Next);

    act(() => {
      result.current[1].place(2, 1);
    });

    expect(result.current[0].status).toBe(GameStatus.OWin);
    expect(result.current[0].score).toEqual(createTestScore(0, 0, 1));
  });

  it("should make CPU move after player", async () => {
    const initialState = createTestGameState({
      againstCPU: true,
      board: "empty",
    });
    const { result } = renderHook(() => useGame(initialState));

    act(() => {
      result.current[1].place(1, 1);
    });

    // wait for ai move
    await waitFor(
      () => expect(result.current[0].currentTurn).toBe(TicTacToe.X),
      {
        timeout: AI_TIMEOUT + 500,
      },
    );

    expect(result.current[0].history).toEqual([
      [TicTacToe.X, 1, 1],
      [TicTacToe.O, 2, 1],
    ]);
  });

  it("should call saveGameState on state change", () => {
    const initialState = createTestGameState({ board: "empty" });
    const { result } = renderHook(() => useGame(initialState));

    expect(saveGameState).toHaveBeenCalledOnce();
    expect(saveGameState).toHaveBeenCalledWith(initialState);

    act(() => {
      result.current[1].place(1, 1);
    });

    expect(saveGameState).toHaveBeenCalledTimes(2);
  });
});

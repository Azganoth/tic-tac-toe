import { render, type RenderOptions } from "@testing-library/react";
import { TranslationProvider } from "../contexts/TranslationContext.tsx";
import {
  GameScorer,
  getInitialGameState,
  type GameState,
} from "../reducers/GameReducer.ts";
import * as TicTacToe from "./tictactoe.ts";

export const createTestBoard = (
  state: "empty" | "3x1-tie" | "2x1-win" | "tie" | "x-win" | "o-win",
): TicTacToe.Board => {
  switch (state) {
    case "3x1-tie":
      return [
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.O, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.N, TicTacToe.X, TicTacToe.O],
      ];
    case "tie":
      return [
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.O, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.X, TicTacToe.X, TicTacToe.O],
      ];
    case "2x1-win":
      return [
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.N, TicTacToe.O, TicTacToe.O],
        ...[TicTacToe.X, TicTacToe.X, TicTacToe.O],
      ];
    case "x-win":
      return [
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.O],
        ...[TicTacToe.X, TicTacToe.X, TicTacToe.O],
      ];
    case "o-win":
      return [
        ...[TicTacToe.X, TicTacToe.O, TicTacToe.X],
        ...[TicTacToe.O, TicTacToe.O, TicTacToe.O],
        ...[TicTacToe.X, TicTacToe.X, TicTacToe.O],
      ];
    default: // "empty"
      return [
        ...[TicTacToe.N, TicTacToe.N, TicTacToe.N],
        ...[TicTacToe.N, TicTacToe.N, TicTacToe.N],
        ...[TicTacToe.N, TicTacToe.N, TicTacToe.N],
      ];
  }
};

export const noop = () => {};

export const createTestGameState = ({
  player,
  againstCPU,
  board,
  currentTurn,
  score,
  history,
}: Partial<Omit<GameState, "board">> & {
  board?: Parameters<typeof createTestBoard>[0];
} = {}): GameState => ({
  ...getInitialGameState(player ?? TicTacToe.X, againstCPU ?? false),
  ...(board && { board: createTestBoard(board) }),
  ...(currentTurn && { currentTurn }),
  ...(score && { score }),
  ...(history && { history }),
});

export const createTestScore = (x: number, ties: number, o: number) => ({
  [GameScorer.X]: x,
  [GameScorer.Ties]: ties,
  [GameScorer.O]: o,
});

// render

const root = document.createElement("div");
root.setAttribute("id", "root");

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");

const setupRoot = () => ({
  root: document.body.appendChild(root),
  modalRoot: document.body.appendChild(modalRoot),
});

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <TranslationProvider>{children}</TranslationProvider>;
};

export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper" | "">,
) =>
  render(ui, {
    ...options,
    wrapper: AppProviders,
    container: setupRoot().root,
  });

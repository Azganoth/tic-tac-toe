import type {
  Reducer,
  ReducerAction,
  ReducerActionNoPayload,
} from "../utils/reducer";
import * as TicTacToe from "../utils/tictactoe";

export enum GameScorer {
  X,
  Ties,
  O,
}

export type GameState = {
  player: TicTacToe.BoardSymbol;
  againstCPU: boolean;
  board: TicTacToe.Board;
  currentTurn: TicTacToe.BoardSymbol;
  score: Record<GameScorer, number>;
  history: [player: TicTacToe.BoardSymbol, row: number, col: number][];
};

export const getInitialGameState = (
  player: GameState["player"],
  againstCPU: GameState["againstCPU"],
): GameState => {
  return {
    player,
    againstCPU,
    board: TicTacToe.createEmptyBoard(),
    currentTurn: TicTacToe.X,
    score: {
      [GameScorer.X]: 0,
      [GameScorer.Ties]: 0,
      [GameScorer.O]: 0,
    },
    history: [],
  };
};

export enum GameAction {
  Start = "START",
  Restart = "RESTART",
  Next = "NEXT",
  Place = "PLACE",
  Score = "SCORE",
}

type ReducerActions =
  | ReducerAction<GameAction.Start, Pick<GameState, "player" | "againstCPU">>
  | ReducerActionNoPayload<GameAction.Restart>
  | ReducerActionNoPayload<GameAction.Next>
  | ReducerAction<GameAction.Place, { row: number; col: number }>
  | ReducerAction<GameAction.Score, { scorer: GameScorer }>;
export const gameReducer: Reducer<GameState, ReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case GameAction.Start:
      return getInitialGameState(
        action.payload.player,
        action.payload.againstCPU,
      );
    case GameAction.Restart:
      return {
        ...state,
        board: TicTacToe.createEmptyBoard(),
        currentTurn: TicTacToe.X,
        history: [],
      };
    case GameAction.Next:
      return {
        ...state,
        board: TicTacToe.createEmptyBoard(),
        currentTurn: TicTacToe.X,
        history: [],
      };
    case GameAction.Place: {
      const board = [...state.board];
      const { row, col } = action.payload;
      TicTacToe.place(board, state.currentTurn, row, col);

      return {
        ...state,
        board,
        currentTurn: TicTacToe.getOpponent(state.currentTurn),
        history: [...state.history, [state.currentTurn, row, col]],
      };
    }
    case GameAction.Score:
      const score = { ...state.score };
      score[action.payload.scorer] += 1;
      return {
        ...state,
        score,
      };
    default:
      return state;
  }
};

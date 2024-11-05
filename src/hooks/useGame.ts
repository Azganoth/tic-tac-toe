import { useEffect, useReducer, useState } from "react";
import {
  GameAction,
  gameReducer,
  GameScorer,
  type GameState,
} from "../reducers/GameReducer";
import * as Grid from "../utils/grid";
import { saveGameState } from "../utils/storage";
import * as TicTacToe from "../utils/tictactoe";

export const AI_TIMEOUT = 750;

export enum GameStatus {
  Next,
  Tie,
  XWin,
  OWin,
}

export type Game = GameState & {
  status: GameStatus;
};

export type GameActions = {
  place: (row: number, col: number) => void;
  start: (
    player: GameState["player"],
    againstCPU: GameState["againstCPU"],
  ) => void;
  restart: () => void;
  next: () => void;
};

export const useGame = (initialState: GameState): [Game, GameActions] => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [status, setStatus] = useState<GameStatus>(GameStatus.Next);

  useEffect(() => {
    // console.log({ status });
    // console.log({ gameState });
    const board = gameState.board;

    // Save game state locally
    saveGameState(gameState);

    // Calculate game status
    if (TicTacToe.isTie(board)) {
      setStatus(GameStatus.Tie);
    } else if (TicTacToe.hasWinner(board, TicTacToe.X)) {
      setStatus(GameStatus.XWin);
    } else if (TicTacToe.hasWinner(board, TicTacToe.O)) {
      setStatus(GameStatus.OWin);
    } else {
      setStatus(GameStatus.Next);
    }
  }, [gameState]);

  useEffect(() => {
    let scorer: GameScorer | undefined;
    switch (status) {
      case GameStatus.XWin: {
        scorer = GameScorer.X;
        break;
      }
      case GameStatus.Tie: {
        scorer = GameScorer.Ties;
        break;
      }
      case GameStatus.OWin: {
        scorer = GameScorer.O;
        break;
      }
      default:
        break;
    }

    if (scorer !== undefined) {
      dispatch({
        type: GameAction.Score,
        payload: { scorer },
      });
    }
  }, [status]);

  const place: GameActions["place"] = (row, col) => {
    dispatch({ type: GameAction.Place, payload: { row, col } });
  };
  const start: GameActions["start"] = (player, againstCPU) => {
    dispatch({ type: GameAction.Start, payload: { player, againstCPU } });
  };
  const restart: GameActions["restart"] = () => {
    dispatch({ type: GameAction.Restart });
  };
  const next: GameActions["next"] = () => {
    dispatch({ type: GameAction.Next });
  };

  useEffect(() => {
    if (
      status === GameStatus.Next &&
      gameState.againstCPU &&
      gameState.currentTurn !== gameState.player
    ) {
      const aiMove = TicTacToe.aiMove(gameState.board, gameState.currentTurn);
      const timeoutId = setTimeout(() => {
        place(...Grid.getRowCol(aiMove));
      }, AI_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [status, gameState.againstCPU, gameState.currentTurn]);

  return [
    { ...gameState, status },
    { place, start, restart, next },
  ];
};

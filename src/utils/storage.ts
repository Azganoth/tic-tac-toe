import type { GameState } from "../reducers/GameReducer";
import { gameStateValidator } from "./validators";

export const STORAGE_GAME_STATE_KEY = "gameState";

export const saveGameState = (state: GameState): void => {
  localStorage.setItem(STORAGE_GAME_STATE_KEY, JSON.stringify(state));
};

export const retrieveGameState = (): GameState | undefined => {
  const rawValue = localStorage.getItem(STORAGE_GAME_STATE_KEY);
  if (rawValue) {
    try {
      const value = JSON.parse(rawValue);
      if (gameStateValidator(value)) {
        return value;
      }
    } catch (error) {}
  }

  return undefined;
};

export const resetGameState = (): void => {
  localStorage.removeItem(STORAGE_GAME_STATE_KEY);
};

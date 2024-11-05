import { afterEach, describe, expect, it } from "vitest";
import {
  resetGameState,
  retrieveGameState,
  saveGameState,
  STORAGE_GAME_STATE_KEY,
} from "./storage";
import { createTestGameState } from "./test-utils";

describe("storage", () => {
  afterEach(() => {
    localStorage.removeItem(STORAGE_GAME_STATE_KEY);
  });

  describe("saveGameState", () => {
    it("should save the game state to localStorage", () => {
      const gameState = createTestGameState();

      saveGameState(gameState);

      const savedState = localStorage.getItem(STORAGE_GAME_STATE_KEY);
      expect(savedState).not.toBeNull();
      expect(JSON.parse(savedState!)).toEqual(gameState);
    });
  });

  describe("retrieveGameState", () => {
    it("should retrieve a valid game state from localStorage", () => {
      const gameState = createTestGameState();
      localStorage.setItem(STORAGE_GAME_STATE_KEY, JSON.stringify(gameState));

      const retrievedState = retrieveGameState();
      expect(retrievedState).toEqual(gameState);
    });

    it("should return undefined if no game state is saved", () => {
      const retrievedState = retrieveGameState();
      expect(retrievedState).toBeUndefined();
    });

    it("should return undefined if the saved state is invalid", () => {
      localStorage.setItem(STORAGE_GAME_STATE_KEY, "invalid data");

      const retrievedState = retrieveGameState();
      expect(retrievedState).toBeUndefined();
    });

    it("should handle errors during JSON parsing", () => {
      localStorage.setItem(STORAGE_GAME_STATE_KEY, "{invalid json");

      const retrievedState = retrieveGameState();
      expect(retrievedState).toBeUndefined();
    });
  });

  describe("resetGameState", () => {
    it("should remove the game state from localStorage", () => {
      const gameState = createTestGameState();
      saveGameState(gameState);

      expect(localStorage.getItem(STORAGE_GAME_STATE_KEY)).not.toBeNull();

      resetGameState();

      expect(localStorage.getItem(STORAGE_GAME_STATE_KEY)).toBeNull();
    });
  });
});

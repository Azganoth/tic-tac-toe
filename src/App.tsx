import { useState } from "react";
import { getInitialGameState } from "./reducers/GameReducer";
import { resetGameState, retrieveGameState } from "./utils/storage";
import { GameView } from "./views/GameView";
import { NewGameView } from "./views/NewGameView";

export const App = () => {
  const [initialGameState, setInitialGameState] = useState(() =>
    retrieveGameState(),
  );

  const quit = () => {
    resetGameState();
    setInitialGameState(undefined);
  };

  return initialGameState ? (
    <GameView initialState={initialGameState} quitHandle={quit} />
  ) : (
    <NewGameView
      startHandle={(symbol, isAgainstCPU) =>
        setInitialGameState(getInitialGameState(symbol, isAgainstCPU))
      }
    />
  );
};

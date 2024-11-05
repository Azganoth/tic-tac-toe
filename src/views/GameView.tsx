import { useMemo, useState } from "react";
import RestartIcon from "../assets/images/icon-restart.svg?react";
import XMarkIcon from "../assets/images/icon-x-mark.svg?react";
import { Board } from "../components/Board";
import { EndGameDialog } from "../components/EndGameDialog";
import { QuitDialog } from "../components/QuitDialog";
import { RestartDialog } from "../components/RestartDialog";
import { Scoreboard } from "../components/Scoreboard";
import { Title } from "../components/Title";
import { TurnIndicator } from "../components/TurnIndicator";
import { useTranslation } from "../contexts/TranslationContext";
import { GameStatus, useGame } from "../hooks/useGame";
import { GameScorer, type GameState } from "../reducers/GameReducer";
import { cx } from "../utils/cx";
import * as TicTacToe from "../utils/tictactoe";
import classes from "./GameView.module.scss";

export type GameViewProps = {
  initialState: GameState;
  quitHandle: () => void;
};

export const GameView = ({ initialState, quitHandle }: GameViewProps) => {
  const { translations } = useTranslation();

  const [state, actions] = useGame(initialState);

  const [askRestart, setAskRestart] = useState(false);
  const restart = (): void => {
    setAskRestart(false);
    actions.restart();
  };

  const [askQuit, setAskQuit] = useState(false);
  const quit = (): void => {
    quitHandle();
  };

  const nextRound = (): void => {
    actions.next();
  };

  const formattedPlayerStrings = useMemo(() => {
    const player1Symbol = state.player;
    const player2Symbol = TicTacToe.getOpponent(state.player);
    const { labels, messages } = translations.dialog.endGame;

    const strings = {
      [player1Symbol]: {
        label: labels.player1,
        message: messages.player1,
      },
      [player2Symbol]: {
        label: labels.player2,
        message: messages.player2,
      },
    };

    if (state.againstCPU) {
      strings[player1Symbol].label = labels.cpuPlayer;
      strings[player1Symbol].message = messages.cpuWin;
      strings[player2Symbol].label = labels.cpuCPU;
      strings[player2Symbol].message = messages.cpuLose;
    }

    return strings;
  }, [state.againstCPU, state.player, translations]);

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <Title />
        <TurnIndicator symbol={state.currentTurn} />
        <div className={classes.actionWrapper}>
          <button
            type="button"
            className={classes.action}
            onClick={() => setAskRestart(true)}
            aria-label={translations.game.restart}
          >
            <RestartIcon className={classes.actionIcon} aria-hidden />
          </button>
          <button
            type="button"
            className={classes.action}
            onClick={() => setAskQuit(true)}
            aria-label={translations.game.quit}
          >
            <XMarkIcon
              className={cx(classes.actionIcon, classes.actionQuit)}
              aria-hidden
            />
          </button>
        </div>
      </header>
      <main className={classes.content}>
        <Board
          player={state.player}
          againstCPU={state.againstCPU}
          board={state.board}
          currentTurn={state.currentTurn}
          history={state.history}
          placeHandle={actions.place}
        />
        <Scoreboard
          scoreX={state.score[GameScorer.X]}
          scoreTies={state.score[GameScorer.Ties]}
          scoreO={state.score[GameScorer.O]}
          labelX={formattedPlayerStrings[TicTacToe.X].label}
          labelO={formattedPlayerStrings[TicTacToe.O].label}
        />
      </main>
      <RestartDialog
        isShown={askRestart}
        restartHandle={restart}
        cancelHandle={() => setAskRestart(false)}
      />
      <QuitDialog
        isShown={askQuit}
        quitHandle={quit}
        cancelHandle={() => setAskQuit(false)}
      />
      <EndGameDialog
        isShown={
          state.status === GameStatus.XWin ||
          state.status === GameStatus.OWin ||
          state.status === GameStatus.Tie
        }
        status={state.status}
        message={
          state.status === GameStatus.XWin
            ? formattedPlayerStrings[TicTacToe.X].message
            : formattedPlayerStrings[TicTacToe.O].message
        }
        nextRoundHandle={nextRound}
        quitHandle={quit}
      />
    </section>
  );
};

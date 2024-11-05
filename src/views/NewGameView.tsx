import { useMemo, useState } from "react";
import OIcon from "../assets/images/icon-o.svg?react";
import XIcon from "../assets/images/icon-x.svg?react";
import { Title } from "../components/Title";
import { useTranslation } from "../contexts/TranslationContext";
import { cx } from "../utils/cx";
import * as TicTacToe from "../utils/tictactoe";
import classes from "./NewGameView.module.scss";

export type NewGameViewProps = {
  startHandle: (symbol: TicTacToe.BoardSymbol, isAgainstCPU: boolean) => void;
};

export const NewGameView = ({ startHandle }: NewGameViewProps) => {
  const { translations } = useTranslation();

  const [selectedSymbol, setSelectedSymbol] = useState<TicTacToe.BoardSymbol>(
    TicTacToe.X,
  );

  const handleSymbolSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSymbol(parseInt(event.target.value));
  };

  const startGame = (enemy: "cpu" | "player"): void => {
    startHandle(selectedSymbol, enemy === "cpu");
  };

  const symbolOptions = useMemo<
    { label: string; value: TicTacToe.BoardSymbol }[]
  >(() => {
    return [
      { label: translations.common.x, value: TicTacToe.X },
      { label: translations.common.o, value: TicTacToe.O },
    ];
  }, [translations]);

  return (
    <main className={classes.container}>
      <Title className={classes.title} />
      <fieldset className={classes.pickerContainer}>
        <legend className={classes.pickerLegend}>
          {translations.newGame.playerChoice}
        </legend>
        <div className={classes.picker}>
          {symbolOptions.map(({ label, value }) => (
            <div
              key={value}
              className={cx(classes.symbol, {
                [classes.selected]: value === selectedSymbol,
              })}
            >
              <input
                className={classes.symbolInput}
                type="radio"
                name="playerSymbol"
                value={value}
                onChange={handleSymbolSelect}
                checked={value === selectedSymbol}
                aria-label={label}
              />
              {value === TicTacToe.X ? (
                <XIcon className={classes.symbolIcon} aria-hidden />
              ) : (
                <OIcon className={classes.symbolIcon} aria-hidden />
              )}
            </div>
          ))}
        </div>
        <p role="note" className={classes.message}>
          {translations.newGame.hint}
        </p>
      </fieldset>
      <button
        type="button"
        className={cx(classes.newGame, classes.cpu)}
        onClick={() => startGame("cpu")}
        data-testid="start-game-cpu"
      >
        {translations.newGame.title} ({translations.newGame.modes.vsCpu})
      </button>
      <button
        type="button"
        className={cx(classes.newGame, classes.player)}
        onClick={() => startGame("player")}
        data-testid="start-game-player"
      >
        {translations.newGame.title} ({translations.newGame.modes.vsPlayer})
      </button>
    </main>
  );
};

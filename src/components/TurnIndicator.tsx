import OIcon from "../assets/images/icon-o.svg?react";
import XIcon from "../assets/images/icon-x.svg?react";
import { useTranslation } from "../contexts/TranslationContext";
import * as TicTacToe from "../utils/tictactoe";
import classes from "./TurnIndicator.module.scss";

export type TurnIndicatorProps = {
  symbol: TicTacToe.BoardSymbol;
};

export const TurnIndicator = ({ symbol }: TurnIndicatorProps) => {
  const { translations } = useTranslation();

  return (
    <div className={classes.turn} role="status" aria-live="polite" aria-atomic>
      {symbol === TicTacToe.X ? (
        <XIcon
          className={classes.turnIcon}
          aria-hidden
          data-testid="turn-x-icon"
        />
      ) : (
        <OIcon
          className={classes.turnIcon}
          aria-hidden
          data-testid="turn-o-icon"
        />
      )}
      <span className={classes.turnSymbol}>
        {symbol === TicTacToe.X ? translations.common.x : translations.common.o}
      </span>
      {translations.common.turn}
    </div>
  );
};

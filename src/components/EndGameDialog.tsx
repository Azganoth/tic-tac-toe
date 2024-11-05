import OIcon from "../assets/images/icon-o.svg?react";
import XIcon from "../assets/images/icon-x.svg?react";
import { useTranslation } from "../contexts/TranslationContext";
import { GameStatus } from "../hooks/useGame";
import { cx } from "../utils/cx";
import { Dialog } from "./Dialog";
import classes from "./EndGameDialog.module.scss";

export type EndGameDialogProps = {
  isShown: boolean;
  status: GameStatus;
  message: string;
  nextRoundHandle: () => void;
  quitHandle: () => void;
};

export const EndGameDialog = ({
  isShown,
  status,
  message,
  nextRoundHandle,
  quitHandle,
}: EndGameDialogProps) => {
  const { translations } = useTranslation();

  return (
    <Dialog
      isShown={isShown}
      okHandle={() => nextRoundHandle()}
      okText={translations.dialog.endGame.nextRound}
      cancelHandle={() => quitHandle()}
      cancelText={translations.dialog.endGame.quit}
      ariaLabel={translations.dialog.endGame.title}
    >
      {status === GameStatus.Tie ? (
        <h2 className={classes.message}>{translations.game.tie}</h2>
      ) : (
        <>
          <h2 className={classes.title}>{message}</h2>
          <p
            className={cx(classes.messageContainer, {
              [classes.messageX]: status === GameStatus.XWin,
              [classes.messageO]: status === GameStatus.OWin,
            })}
          >
            {status === GameStatus.XWin ? (
              <XIcon className={classes.messageIcon} aria-hidden />
            ) : (
              <OIcon className={classes.messageIcon} aria-hidden />
            )}
            <span className={classes.messageSymbol}>
              {status === GameStatus.XWin
                ? translations.common.x
                : translations.common.o}
            </span>
            <span className={classes.message}>
              {translations.game.takesRound}
            </span>
          </p>
        </>
      )}
    </Dialog>
  );
};

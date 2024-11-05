import { useTranslation } from "../contexts/TranslationContext";
import { Dialog } from "./Dialog";
import classes from "./RestartDialog.module.scss";

export type RestartDialogProps = {
  isShown: boolean;
  restartHandle: () => void;
  cancelHandle: () => void;
};

export const RestartDialog = ({
  isShown,
  restartHandle,
  cancelHandle,
}: RestartDialogProps) => {
  const { translations } = useTranslation();

  return (
    <Dialog
      isShown={isShown}
      okHandle={() => restartHandle()}
      okText={translations.dialog.restart.yes}
      cancelHandle={() => cancelHandle()}
      cancelText={translations.dialog.restart.no}
      ariaLabel={translations.dialog.restart.title}
      big
    >
      <h2 className={classes.message}>{translations.dialog.restart.message}</h2>
    </Dialog>
  );
};

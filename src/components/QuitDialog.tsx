import { useTranslation } from "../contexts/TranslationContext";
import { Dialog } from "./Dialog";
import classes from "./QuitDialog.module.scss";

export type QuitDialogProps = {
  isShown: boolean;
  quitHandle: () => void;
  cancelHandle: () => void;
};

export const QuitDialog = ({
  isShown,
  quitHandle,
  cancelHandle,
}: QuitDialogProps) => {
  const { translations } = useTranslation();

  return (
    <Dialog
      isShown={isShown}
      okHandle={() => quitHandle()}
      okText={translations.dialog.quit.yes}
      cancelHandle={() => cancelHandle()}
      cancelText={translations.dialog.quit.no}
      ariaLabel={translations.dialog.quit.title}
    >
      <h2 className={classes.message}>{translations.dialog.quit.message}</h2>
    </Dialog>
  );
};

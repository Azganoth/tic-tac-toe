import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";
import classes from "./Dialog.module.scss";

export type DialogProps = {
  children?: ReactNode;
  isShown: boolean;
  okText: string;
  okHandle: () => void;
  cancelText: string;
  cancelHandle: () => void;
  ariaLabel: string;
};

export const Dialog = ({
  children,
  isShown,
  okText,
  okHandle,
  cancelText,
  cancelHandle,
  ariaLabel,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isShown) {
      dialogRef.current?.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [isShown]);

  // Shortcuts
  useEffect(() => {
    if (isShown) {
      const handleKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "Escape":
            cancelHandle();
            break;
          default:
            break;
        }
      };

      document.addEventListener("keydown", handleKeydown);
      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [isShown]);

  return createPortal(
    <dialog
      ref={dialogRef}
      role="alertdialog"
      className={cx(classes.dialog)}
      aria-label={ariaLabel}
    >
      {children}
      <div className={classes.dialogActionContainer}>
        <button
          type="button"
          className={cx(classes.dialogAction, classes.ok)}
          onClick={() => okHandle()}
        >
          {okText}
        </button>
        <button
          type="button"
          className={cx(classes.dialogAction, classes.cancel)}
          onClick={() => cancelHandle()}
        >
          {cancelText}
        </button>
      </div>
    </dialog>,
    document.querySelector("#modal-root")!,
  );
};

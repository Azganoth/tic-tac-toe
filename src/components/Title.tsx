import LogoIcon from "../assets/images/logo.svg?react";
import { useTranslation } from "../contexts/TranslationContext";
import { cx } from "../utils/cx";
import classes from "./Title.module.scss";

export type TitleProps = {
  className?: string;
};

export const Title = ({ className }: TitleProps) => {
  const { translations } = useTranslation();

  return (
    <>
      <LogoIcon
        className={cx(classes.title, className)}
        role="img"
        data-testid="title-logo-icon"
        aria-labelledby="ticTacToeHeading"
      />
      <h1 id="ticTacToeHeading" className={classes.titleHeading}>
        {translations.appName}
      </h1>
    </>
  );
};

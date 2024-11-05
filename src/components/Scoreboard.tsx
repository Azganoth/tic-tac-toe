import { useMemo } from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { cx } from "../utils/cx";
import classes from "./Scoreboard.module.scss";

export type ScoreboardProps = {
  scoreX: number;
  scoreO: number;
  scoreTies: number;
  labelX: string;
  labelO: string;
};

export const Scoreboard = ({
  scoreX,
  scoreTies,
  scoreO,
  labelX,
  labelO,
}: ScoreboardProps) => {
  const { translations } = useTranslation();

  const data = useMemo<
    { id: string; className: string; score: number; label: string }[]
  >(() => {
    return [
      {
        id: "xScore",
        className: classes.xWins,
        score: scoreX,
        label: `${translations.common.x} (${labelX})`,
      },
      {
        id: "tiesScore",
        className: classes.ties,
        score: scoreTies,
        label: translations.common.ties,
      },
      {
        id: "oScore",
        className: classes.oWins,
        score: scoreO,
        label: `${translations.common.o} (${labelO})`,
      },
    ];
  }, [scoreX, scoreTies, scoreO, labelX, labelO, translations]);

  return (
    <div
      className={classes.scoreboard}
      role="status"
      aria-live="polite"
      aria-atomic
    >
      {data.map(({ id, className, label, score }) => (
        <div key={id} className={cx(classes.score, className)}>
          <h2 className={classes.scoreLabel} id={id}>
            {label}
          </h2>
          <p className={classes.scorePoints} aria-labelledby={id}>
            {score}
          </p>
        </div>
      ))}
    </div>
  );
};

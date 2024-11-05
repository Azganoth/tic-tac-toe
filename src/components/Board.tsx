import { useCallback, useRef } from "react";
import OutlineOIcon from "../assets/images/icon-o-outline.svg?react";
import OIcon from "../assets/images/icon-o.svg?react";
import OutlineXIcon from "../assets/images/icon-x-outline.svg?react";
import XIcon from "../assets/images/icon-x.svg?react";
import { useTranslation } from "../contexts/TranslationContext";
import type { GameState } from "../reducers/GameReducer";
import { cx } from "../utils/cx";
import * as Grid from "../utils/grid";
import * as TicTacToe from "../utils/tictactoe";
import classes from "./Board.module.scss";

export type BoardProps = Pick<
  GameState,
  "player" | "againstCPU" | "board" | "currentTurn" | "history"
> & {
  placeHandle: (row: number, col: number) => void;
};

export const Board = ({
  player,
  againstCPU,
  board,
  currentTurn,
  history,
  placeHandle,
}: BoardProps) => {
  const { translations } = useTranslation();

  const cellRefs = useRef<(HTMLButtonElement | null)[]>(
    Array.from({ length: 9 }, () => null),
  );

  const place = (index: number): void => {
    if (
      board[index] === TicTacToe.N &&
      (!againstCPU || player === currentTurn)
    ) {
      const [row, col] = Grid.getRowCol(index);
      placeHandle(row, col);
    }
  };

  const cellShortcut = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
      switch (event.key) {
        case "ArrowUp":
          cellRefs.current[i - 3]?.focus();
          break;
        case "ArrowDown":
          cellRefs.current[i + 3]?.focus();
          break;
        case "ArrowLeft":
          cellRefs.current[
            Math.max(
              i - (i % 3), // Lowest index for the row
              i - 1,
            )
          ]?.focus();
          break;
        case "ArrowRight":
          cellRefs.current[
            Math.min(
              Math.floor(i / 3) * 3 + 2, // Highest index for the column
              i + 1,
            )
          ]?.focus();
          break;
        default:
          break;
      }
    },
    [],
  );

  const lastMove = history.at(-1);

  return (
    <div
      className={cx(classes.board, {
        [classes.x]: currentTurn === TicTacToe.X,
        [classes.o]: currentTurn === TicTacToe.O,
      })}
      data-testid="board"
    >
      {board.map((cell, i) => {
        const [row, col] = Grid.getRowCol(i);

        return (
          <button
            key={`${i}-${cell}`}
            ref={(el) => (cellRefs.current[i] = el)}
            type="button"
            className={cx(classes.boardCell, {
              [classes.x]: cell === TicTacToe.X,
              [classes.o]: cell === TicTacToe.O,
            })}
            onClick={() => place(i)}
            onKeyDown={(event) => cellShortcut(event, i)}
            autoFocus={
              i === (lastMove ? Grid.getIndex(lastMove[1], lastMove[2]) : 0)
            }
            aria-disabled={
              (againstCPU && player !== currentTurn) || cell !== TicTacToe.N
            }
            aria-label={`${cell === TicTacToe.X ? translations.common.x : translations.common.o} ${translations.common.at} ${translations.common.row} ${row} ${translations.common.column} ${col}`}
            data-testid={`board-cell-${i}`}
          >
            {cell === TicTacToe.N ? (
              currentTurn === TicTacToe.X ? (
                <OutlineXIcon
                  className={cx(classes.icon, classes.preview)}
                  data-testid="empty-x-icon"
                  aria-hidden
                />
              ) : (
                <OutlineOIcon
                  className={cx(classes.icon, classes.preview)}
                  data-testid="empty-o-icon"
                  aria-hidden
                />
              )
            ) : cell === TicTacToe.X ? (
              <XIcon
                className={classes.icon}
                data-testid="x-icon"
                aria-hidden
              />
            ) : (
              <OIcon
                className={classes.icon}
                data-testid="o-icon"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

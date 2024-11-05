import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createTestBoard, customRender, noop } from "../utils/test-utils";
import * as TicTacToe from "../utils/tictactoe";
import { Board, type BoardProps } from "./Board";
import classes from "./Board.module.scss";

const composeBoard = (props: Partial<BoardProps> = {}) => (
  <Board
    player={TicTacToe.X}
    againstCPU={false}
    board={createTestBoard("empty")}
    currentTurn={TicTacToe.X}
    history={[]}
    placeHandle={noop}
    {...props}
  />
);

describe("Board", () => {
  it("should render the board with all its cells", () => {
    customRender(composeBoard({ board: createTestBoard("empty") }));

    expect(screen.getByTestId("board")).toBeInTheDocument();
    const cells = screen.getAllByRole("button");
    expect(cells).toHaveLength(9);
    for (const cell of cells) {
      expect(cell).not.toHaveClass(classes.x, classes.o);
    }
  });

  it("should render the board with classes based on currentTurn", () => {
    const { rerender } = customRender(composeBoard());

    expect(screen.getByTestId("board")).toHaveClass(classes.x);

    rerender(composeBoard({ currentTurn: TicTacToe.O }));
    expect(screen.getByTestId("board")).toHaveClass(classes.o);
  });

  it("should render the correct icon for each cell based on the board state", () => {
    const board = createTestBoard("empty");
    board[0] = TicTacToe.X;
    board[1] = TicTacToe.O;
    const { rerender } = customRender(composeBoard({ board }));

    expect(screen.getAllByTestId("x-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("o-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("empty-x-icon")).toHaveLength(7);

    rerender(composeBoard({ board, currentTurn: TicTacToe.O }));
    expect(screen.getAllByTestId("empty-o-icon")).toHaveLength(7);
  });

  it("should call handlePlace function on cell click", async () => {
    const user = userEvent.setup();

    const placeHandleMock = vi.fn();
    customRender(composeBoard({ placeHandle: placeHandleMock }));

    await user.click(screen.getByTestId("board-cell-0"));

    expect(placeHandleMock).toHaveBeenCalledWith(1, 1);
  });

  it("should focus neighboring cells on arrow key press", async () => {
    const user = userEvent.setup();

    customRender(composeBoard());

    const cells = screen.getAllByRole("button");

    await user.keyboard("[ArrowRight]");
    expect(cells[1]).toHaveFocus();

    await user.keyboard("[ArrowDown]");
    expect(cells[4]).toHaveFocus();

    await user.keyboard("[ArrowLeft]");
    expect(cells[3]).toHaveFocus();

    // Should not change
    await user.keyboard("[ArrowLeft]");
    expect(cells[3]).toHaveFocus();

    // Should not get past last column of current row
    await user.keyboard("[ArrowRight]");
    await user.keyboard("[ArrowRight]");
    await user.keyboard("[ArrowRight]");
    await user.keyboard("[ArrowRight]");
    expect(cells[5]).toHaveFocus();
  });

  it("should retain focus after marking current cell", async () => {
    const user = userEvent.setup();

    customRender(composeBoard());

    expect(screen.getByTestId("board-cell-0")).toHaveFocus();

    await user.keyboard("[Enter]");

    expect(screen.getByTestId("board-cell-0")).toHaveFocus();
  });
});

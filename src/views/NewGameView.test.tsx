// NewGameView.test.jsx

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { customRender, noop } from "../utils/test-utils";
import * as TicTacToe from "../utils/tictactoe";
import { NewGameView, type NewGameViewProps } from "./NewGameView";

const composeNewGameView = ({
  startHandle = noop,
}: Partial<NewGameViewProps> = {}) => <NewGameView startHandle={startHandle} />;

describe("NewGameView", () => {
  it("should display the player symbol selection options", () => {
    customRender(composeNewGameView());

    expect(screen.getByLabelText("X")).toBeInTheDocument();
    expect(screen.getByLabelText("O")).toBeInTheDocument();
  });

  it("should select the X symbol by default", () => {
    customRender(composeNewGameView());

    expect(screen.getByLabelText("X")).toBeChecked();
  });

  it("should update the selected symbol on radio button change", async () => {
    const user = userEvent.setup();

    customRender(composeNewGameView());
    const okButton = screen.getByLabelText("O");

    await user.click(okButton);

    expect(okButton).toBeChecked();
  });

  it("should call handleStart with the selected symbol on New Game (vs cpu) click", async () => {
    const user = userEvent.setup();

    const startHandleMock = vi.fn();
    customRender(composeNewGameView({ startHandle: startHandleMock }));

    await user.click(screen.getByTestId("start-game-cpu"));

    expect(startHandleMock).toHaveBeenCalledWith(TicTacToe.X, true);
  });

  it("should call handleStart with the selected symbol on New Game (vs player) click", async () => {
    const user = userEvent.setup();

    const startHandleMock = vi.fn();
    customRender(composeNewGameView({ startHandle: startHandleMock }));

    await user.click(screen.getByTestId("start-game-player"));

    expect(startHandleMock).toHaveBeenCalledWith(TicTacToe.X, false);
  });

  it("should allow user to select O symbol and start a new game against CPU", async () => {
    const user = userEvent.setup();

    const startHandleMock = vi.fn();
    customRender(composeNewGameView({ startHandle: startHandleMock }));

    await user.click(screen.getByLabelText("O"));
    await user.click(screen.getByTestId("start-game-cpu"));

    expect(startHandleMock).toHaveBeenCalledWith(TicTacToe.O, true);
  });
});

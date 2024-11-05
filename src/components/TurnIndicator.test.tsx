import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "../contexts/TranslationContext";
import { customRender } from "../utils/test-utils";
import * as TicTacToe from "../utils/tictactoe";
import { TurnIndicator } from "./TurnIndicator";

describe("TurnIndicator", () => {
  it("should render correctly for X", () => {
    customRender(<TurnIndicator symbol={TicTacToe.X} />);
    expect(screen.getByText(LOCALES.en.common.x)).toBeInTheDocument();
    expect(screen.getByTestId("turn-x-icon")).toBeInTheDocument();
  });

  it("should render correctly for O", () => {
    customRender(<TurnIndicator symbol={TicTacToe.O} />);
    expect(screen.getByText(LOCALES.en.common.o)).toBeInTheDocument();
    expect(screen.getByTestId("turn-o-icon")).toBeInTheDocument();
  });
});

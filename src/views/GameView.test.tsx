import { describe, expect, it, vi } from "vitest";
import { createTestGameState, customRender, noop } from "../utils/test-utils";
import { GameView, type GameViewProps } from "./GameView";
// import { LOCALES } from "../contexts/TranslationContext";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOCALES } from "../contexts/TranslationContext";

vi.mock(import("../hooks/useGame"), { spy: true });

const composeGameView = ({
  quitHandle = noop,
  ...props
}: Partial<
  Parameters<typeof createTestGameState>[0] & Pick<GameViewProps, "quitHandle">
> = {}) => (
  <GameView initialState={createTestGameState(props)} quitHandle={quitHandle} />
);

describe("GameView", () => {
  it.todo("should render the RestartDialog when asking to restart");
  it.todo("should render the QuitDialog when asking to quit");
  it.todo("should render the EndGameDialog when the game is won or tied");
  it.todo(
    "should trigger restartHandle when clicking the Restart button and confirming",
  );

  it("should trigger quitHandle when clicking the Quit button and confirming", async () => {
    const user = userEvent.setup();

    const quitHandleMock = vi.fn();
    customRender(composeGameView({ quitHandle: quitHandleMock }));

    await user.click(screen.getByLabelText(LOCALES.en.game.quit));
    await user.click(screen.getByText(LOCALES.en.dialog.quit.yes));

    expect(quitHandleMock).toHaveBeenCalledOnce();
  });
});

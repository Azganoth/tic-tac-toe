import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "../contexts/TranslationContext";
import { customRender } from "../utils/test-utils";
import { Scoreboard, type ScoreboardProps } from "./Scoreboard";

describe("Scoreboard", () => {
  it("should render scores correctly", () => {
    const props: ScoreboardProps = {
      scoreX: 5,
      scoreTies: 2,
      scoreO: 3,
      labelX: "Player One",
      labelO: "Player Two",
    };

    customRender(<Scoreboard {...props} />);

    expect(
      screen.getByText(`${LOCALES.en.common.x} (${props.labelX})`),
    ).toBeInTheDocument();
    expect(screen.getByText(props.scoreX)).toBeInTheDocument();
    expect(screen.getByText(LOCALES.en.common.ties)).toBeInTheDocument();
    expect(screen.getByText(props.scoreTies)).toBeInTheDocument();
    expect(
      screen.getByText(`${LOCALES.en.common.o} (${props.labelO})`),
    ).toBeInTheDocument();
    expect(screen.getByText(props.scoreO)).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "../contexts/TranslationContext";
import { customRender } from "../utils/test-utils";
import { Title } from "./Title";

describe("Title", () => {
  it("should render the logo and title", () => {
    customRender(<Title />);
    expect(screen.getByTestId("title-logo-icon")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(LOCALES.en.appName);
  });
});

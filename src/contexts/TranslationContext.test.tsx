import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { customRender } from "../utils/test-utils";
import { TranslationProvider, useTranslation } from "./TranslationContext";

// @ts-ignore: Completely replace the module
vi.mock(import("../assets/locales/en.json"), () => ({
  default: { hello: "Hello" },
}));
// @ts-ignore
vi.mock(import("../assets/locales/ptBR.json"), () => ({
  default: { hello: "Olá" },
}));

// Test component to simplify rendering and assertions
const TestComponent = () => {
  const { translations } = useTranslation();

  // @ts-ignore: Locales are mocked
  return <p>{translations.hello}</p>;
};

describe("TranslationContext", () => {
  it("should set the initial locale based on browser language", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("pt-BR");

    customRender(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>,
    );

    expect(screen.getByText("Olá")).toBeInTheDocument();
  });

  it("should use default locale when browser language is not supported", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("xx-YY");

    customRender(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});

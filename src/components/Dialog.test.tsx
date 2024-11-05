import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { customRender, noop } from "../utils/test-utils";
import { Dialog, type DialogProps } from "./Dialog";

const composeDialog = (
  props: Partial<
    Pick<DialogProps, "isShown" | "okHandle" | "cancelHandle">
  > = {},
) => (
  <Dialog
    isShown={false}
    okText="OK"
    okHandle={noop}
    cancelText="Cancel"
    cancelHandle={noop}
    ariaLabel="test-dialog"
    {...props}
  >
    <p>Hello, world!</p>
  </Dialog>
);

describe("Dialog", () => {
  it("should render the dialog", () => {
    customRender(composeDialog());

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should call the okHandle when the ok button is clicked", async () => {
    const user = userEvent.setup();

    const okHandleMock = vi.fn();
    customRender(composeDialog({ isShown: true, okHandle: okHandleMock }));

    await user.click(screen.getByText("OK"));

    expect(okHandleMock).toHaveBeenCalledOnce();
  });

  it("should call the cancelHandle when the cancel button is clicked", async () => {
    const user = userEvent.setup();

    const cancelHandleMock = vi.fn();
    customRender(
      composeDialog({ isShown: true, cancelHandle: cancelHandleMock }),
    );

    await user.click(screen.getByText("Cancel"));

    expect(cancelHandleMock).toHaveBeenCalledOnce();
  });

  it("should call the cancelHandle when the Escape key is pressed", async () => {
    const user = userEvent.setup();

    const cancelHandleMock = vi.fn();
    customRender(
      composeDialog({ isShown: true, cancelHandle: cancelHandleMock }),
    );

    await user.keyboard("[Escape]");

    expect(cancelHandleMock).toHaveBeenCalledOnce();
  });
});

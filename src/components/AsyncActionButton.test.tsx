import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AsyncActionButton } from "./AsyncActionButton";

describe("AsyncActionButton", () => {
  it("prevents duplicate execution and reports success beside the action", async () => {
    const user = userEvent.setup();
    let resolveAction: () => void = () => {};
    const action = vi.fn(() => new Promise<void>((resolve) => { resolveAction = resolve; }));
    render(<AsyncActionButton onAction={action} successMessage="Review ready.">Review campaign</AsyncActionButton>);

    const button = screen.getByRole("button", { name: "Review campaign" });
    await user.dblClick(button);
    expect(action).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Working…" })).toBeDisabled();

    resolveAction();
    expect(await screen.findByRole("status")).toHaveTextContent("Review ready.");
  });

  it("reports a failed outcome locally", async () => {
    const user = userEvent.setup();
    render(<AsyncActionButton onAction={() => Promise.reject(new Error("failed"))} successMessage="Done">Try action</AsyncActionButton>);

    await user.click(screen.getByRole("button", { name: "Try action" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The action did not complete");
  });
});

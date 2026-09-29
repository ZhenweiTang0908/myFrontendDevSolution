import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { RangeSliderField, SliderField } from "./SliderField";

function SliderHarness({ delayed = false }: { delayed?: boolean }) {
  const [value, setValue] = useState(40);
  return (
    <SliderField
      label="Creativity"
      value={value}
      min={0}
      max={100}
      precise
      onCommit={(next) => {
        if (delayed) setTimeout(() => setValue(next), 20);
        else setValue(next);
      }}
    />
  );
}

describe("SliderField", () => {
  it("supports precise keyboard entry", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<SliderHarness />);

    const input = screen.getByRole("spinbutton", { name: "Creativity" });
    await user.clear(input);
    await user.type(input, "72");
    await user.tab();

    expect(input).toHaveValue(72);
    expect(screen.getByRole("slider", { name: "Creativity" })).toHaveAttribute("aria-valuenow", "72");
  });

  it("keeps the draft value while delayed persistence completes", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<SliderHarness delayed />);

    const input = screen.getByRole("spinbutton", { name: "Creativity" });
    await user.clear(input);
    await user.type(input, "65");
    await user.tab();

    expect(input).toHaveValue(65);
  });

  it("supports arrow-key adjustment for continuous values", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    render(<SliderField label="Intensity" value={40} min={0} max={100} onCommit={onCommit} />);

    const slider = screen.getByRole("slider", { name: "Intensity" });
    slider.focus();
    await user.keyboard("{ArrowRight}");

    expect(slider).toHaveAttribute("aria-valuenow", "41");
    expect(onCommit).toHaveBeenLastCalledWith(41);
  });

  it("keeps range thumbs distinguishable at the minimum step distance", async () => {
    const user = userEvent.setup();
    render(<RangeSliderField label="Preferred score" value={[20, 25]} min={0} max={100} step={5} onCommit={() => undefined} />);

    const minimum = screen.getByRole("slider", { name: "Preferred score minimum" });
    minimum.focus();
    await user.keyboard("{ArrowRight}");

    expect(minimum).toHaveAttribute("aria-valuenow", "20");
    expect(screen.getByRole("slider", { name: "Preferred score maximum" })).toHaveAttribute("aria-valuenow", "25");
  });

  it("exposes disabled and error states semantically", () => {
    render(<SliderField label="Confidence" value={12} min={0} max={100} disabled error="Choose at least 20%." onCommit={() => undefined} />);

    expect(screen.getByRole("slider", { name: "Confidence" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("slider", { name: "Confidence" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Choose at least 20%.")).toBeVisible();
  });
});

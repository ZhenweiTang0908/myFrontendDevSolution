import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DesignConfigProvider } from "../../config/DesignConfigProvider";
import { PatternExample } from "./PatternExample";
import { patternIds } from "../patternRegistry";

describe("Golden Example registry", () => {
  it.each(patternIds)("renders %s as a canonical example", (patternId) => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/patterns/${patternId}`]}>
        <DesignConfigProvider>
          <PatternExample patternId={patternId} />
        </DesignConfigProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
    const interactive = [...container.querySelectorAll("button, a, input, select, textarea, [role='slider']")]
      .filter((element) => !(element instanceof HTMLInputElement && element.style.display === "none"));
    expect(interactive.length).toBeGreaterThan(0);
    for (const element of interactive) {
      const labelledBy = element.getAttribute("aria-labelledby");
      const referencedLabel = labelledBy
        ? labelledBy.split(" ").map((id) => container.ownerDocument.getElementById(id)?.textContent ?? "").join(" ")
        : "";
      const associatedLabel = element.id
        ? [...container.querySelectorAll("label")].find((label) => label.htmlFor === element.id)?.textContent
        : "";
      const accessibleText = [
        element.getAttribute("aria-label"),
        referencedLabel,
        associatedLabel,
        element.closest("label")?.textContent,
        element.textContent,
      ].join(" ").trim();
      expect(accessibleText, `${patternId} has an unnamed ${element.tagName.toLowerCase()} control`).not.toBe("");
    }
  });
});

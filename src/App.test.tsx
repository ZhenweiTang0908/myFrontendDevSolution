import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

describe("showcase application", () => {
  it("renders the Control and a visible page heading", () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { level: 1, name: /choose a proven page shape/i })).toBeVisible();
    expect(screen.getByRole("complementary", { name: /design configuration/i })).toBeVisible();
  });

  it("renders every registered pattern route with its own heading", async () => {
    render(<MemoryRouter initialEntries={["/patterns/search-list?theme=green"]}><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { level: 1, name: "Search list" })).toBeVisible();
    expect(screen.getByText("green", { selector: ".top-rail__status span" })).toBeVisible();
  });

  it("switches Page Patterns from Control while preserving the selected configuration", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/?theme=green&density=compact"]}><App /></MemoryRouter>);

    await user.selectOptions(screen.getByRole("combobox", { name: "Page Pattern" }), "search-list");

    expect(await screen.findByRole("heading", { level: 1, name: "Search list" })).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Theme" })).toHaveValue("green");
    expect(screen.getByRole("combobox", { name: "Density" })).toHaveValue("compact");
  });

  it("shows stable multi-module navigation for a large platform", () => {
    render(<MemoryRouter initialEntries={["/?scale=large-platform&navigation=topbar"]}><App /></MemoryRouter>);

    expect(screen.getByText("Platform modules")).toBeVisible();
    const navigation = within(screen.getByRole("navigation", { name: "Primary navigation" }));
    expect(navigation.getByRole("link", { name: /Dashboard/i })).toBeVisible();
    expect(navigation.getByRole("link", { name: /Data table/i })).toBeVisible();
    expect(navigation.getByRole("link", { name: /Reports & analytics/i })).toBeVisible();
    expect(navigation.getByRole("link", { name: /Settings/i })).toBeVisible();
  });

  it("offers a searchable semantic icon catalog", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/resources/icons?theme=blue"]}><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { level: 1, name: /choose icons by meaning/i })).toBeVisible();
    expect(screen.getByText("blue", { selector: ".top-rail__status span" })).toBeVisible();

    await user.type(screen.getByRole("textbox", { name: "Search icons" }), "destroy");

    expect(screen.getByRole("heading", { level: 3, name: "Delete" })).toBeVisible();
    expect(screen.queryByRole("heading", { level: 3, name: "Close" })).not.toBeInTheDocument();
    expect(screen.getByText("1 semantic icon")).toBeVisible();
  });
});

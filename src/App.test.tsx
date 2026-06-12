import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { test, expect } from "vitest";
import App from "./App";

test("renders home page with navigation links", () => {
  render(<App />);

  expect(screen.getByText("Energy Mix UK")).toBeInTheDocument();
  expect(screen.getByText("Miks energetyczny")).toBeInTheDocument();
  expect(screen.getByText("Okno ładowania")).toBeInTheDocument();
});
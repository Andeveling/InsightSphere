import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";

// Mock the auth actions
vi.mock('@/actions/auth.actions', () => ({
  authenticate: vi.fn(),
}));

// Mock next-auth
vi.mock('next-auth', () => ({
  default: vi.fn(),
}));

test("renders login page component", () => {
  render(<Page />);
  expect(screen.getByText("InsightSphere")).toBeInTheDocument();
  expect(screen.getByText("Sign in to access your High 5 strengths profile")).toBeInTheDocument();
});

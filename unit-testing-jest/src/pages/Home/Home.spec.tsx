import { render, screen } from "@testing-library/react"
import { Home } from "."

jest.mock("react-router-dom", () => ({
  Link: "Link"
}))

describe("Home page", () => {
  it("should render Home page", () => {
    render(<Home />)

    expect(screen.getByText("Home")).toBeInTheDocument
  });
})
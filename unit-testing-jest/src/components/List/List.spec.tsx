import { List } from "."
import { render, screen } from '@testing-library/react'

describe("List component test", () => {
  it("should render", () => {
    render(<List />)

    expect(screen.getByText("Pedro")).toBeInTheDocument
  })
})
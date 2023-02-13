import { List } from "."
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


jest.mock("react-router-dom", () => ({
  Link: "Link"
}))

describe("List component test", () => {
  it("should render", () => {
    render(<List initialUsers={["Matheus", "Carol"]} />)

    expect(screen.getByText(/Matheus/i)).toBeInTheDocument
  });

  it("should be able to add new item on the list", async () => {
    render(<List initialUsers={["Matheus", "Carol"]} />);

    const inputElement = screen.getByPlaceholderText('Novo usuário');
    const addButton = screen.getByText('Adicionar usuário');

    await userEvent.type(inputElement, 'Pedro');
    await userEvent.click(addButton);

    expect(screen.getByText("Pedro")).toBeInTheDocument
  });
});
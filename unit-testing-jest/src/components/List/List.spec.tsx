import { List } from "."
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock("react-router-dom", () => ({
  Link: "Link"
}));

const users = ["Matheus", "Carol"]

describe("List component test", () => {
  it("should render", () => {
    render(<List initialUsers={users} />)

    expect(screen.getByText("Matheus")).toBeInTheDocument
    expect(screen.getByText("Carol")).toBeInTheDocument
  });

  it("should be able to add new item on the list", async () => {
    render(<List initialUsers={users} />);

    const inputElement = screen.getByPlaceholderText('Novo usuário');
    const addButton = screen.getByText('Adicionar usuário');

    await userEvent.type(inputElement, 'Pedro');
    await userEvent.click(addButton);

    expect(screen.getByText("Pedro")).toBeInTheDocument
  });

  it("should navigate to another page sending correctly params", async () => {

    render(<List initialUsers={users} />);

    const linkButton = screen.getAllByTestId("link-component")
    
    await userEvent.click(linkButton[0])

    expect(screen.findByText("Olá Matheus")).toBeInTheDocument
  });
});
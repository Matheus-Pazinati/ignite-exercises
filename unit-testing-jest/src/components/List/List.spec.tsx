import { List } from "."
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe("List component test", () => {
  it("should render", () => {
    render(<List initialUsers={["Matheus", "Carol"]} />)

    expect(screen.getByText("Matheus")).toBeInTheDocument
  });

  it("should be able to add new item on the list", async () => {
    const { getByText, getByPlaceholderText } = render(<List initialUsers={["Matheus", "Carol"]} />);

    const inputElement = getByPlaceholderText('Novo usuário');
    const addButton = getByText('Adicionar usuário');

    await userEvent.type(inputElement, 'Pedro');
    await userEvent.click(addButton);

    expect(getByText('Pedro')).toBeInTheDocument
  });
});
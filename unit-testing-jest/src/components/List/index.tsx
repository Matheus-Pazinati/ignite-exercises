import { useState } from "react"

export function List() {
  const [users, setUsers] = useState<string[]>(["Carol", "Matheus"])
  const [newUser, setNewUser] = useState('')

  function handleAddNewUser() {
    setUsers( state => [...state, newUser])
  }

  return (
    <div>
      <h1>Lista de usuários</h1>
      <input placeholder="Novo usuário" type="text" value={newUser} onChange={(event) => {
        return setNewUser(event.target.value)
      }} />
      <button onClick={handleAddNewUser}>Adicionar usuário</button>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  )
}
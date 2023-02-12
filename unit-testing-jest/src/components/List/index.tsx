import { useState } from "react"

export function List() {
  const [users, setUsers] = useState<string[]>([])
  const [newUser, setNewUser] = useState('')

  function handleAddNewUser() {
    setUsers( state => [...state, newUser])
    setNewUser('')
  }
  return (
    <div>
      <input type="text" value={newUser} onChange={(event) => {
        setNewUser(event.target.value)
      }} />
      <button onClick={handleAddNewUser}>Adiciona usuário</button>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  )
}
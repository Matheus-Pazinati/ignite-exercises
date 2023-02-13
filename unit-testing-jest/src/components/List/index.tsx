import { useState } from "react"
import { Link } from 'react-router-dom'

interface ListProps {
  initialUsers: string[]
}

export function List({ initialUsers }: ListProps) {
  const [users, setUsers] = useState<string[]>(initialUsers)
  const [newUser, setNewUser] = useState('')

  function handleAddNewUser() {
    setUsers( state => [...state, newUser])
  }

  return (
    <div>
      <input placeholder="Novo usuário" type="text" value={newUser} onChange={(event) => {
        return setNewUser(event.target.value)
      }} />
      <button onClick={handleAddNewUser}>Adicionar usuário</button>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <Link to={`/${user}`}>
              {user}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
import { useParams } from "react-router-dom"

export function User() {
  const { user } = useParams()
  return (
    <h1>{user}</h1>
  )
}
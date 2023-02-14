import { useParams } from "react-router-dom"

export function User() {
  const { user } = useParams()
  return (
    <h1>{`Olá ${user}`}</h1>
  )
}
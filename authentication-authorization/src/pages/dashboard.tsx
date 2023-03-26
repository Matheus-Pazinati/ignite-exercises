import { AuthContext } from "@/context/AuthContext"
import { api } from "@/lib/api"
import { useContext, useEffect } from "react"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then((response) => console.log(response.data))
    .catch(error => console.log(error))
  }, [])
  return (
    <h1>Dashboard: {user?.email}</h1>
  )
}
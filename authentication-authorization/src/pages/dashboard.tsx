import { UserCan } from "@/components/UserCan"
import { AuthContext } from "@/context/AuthContext"
import { setupApiClient } from "@/lib/api"
import { api } from "@/lib/apiClient"
import { useContext, useEffect } from "react"
import { withSSRAuth } from "../../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then((response) => console.log(response.data))
    .catch(error => console.log(error))
  }, [])
  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>Sign Out</button>
      <UserCan permissions={['metrics.list']}>
        Metrics
      </UserCan>
    </>

  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get('/me')

  console.log(response.data)

  return {
    props: {}
  }
})
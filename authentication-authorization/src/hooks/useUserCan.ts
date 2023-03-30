import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { verifyUserPermissions } from "../../utils/verifyUserPermissions"

interface UseUserCanProps {
  permissions?: string[]
  roles?: string[]
}

export function useUserCan({ permissions = [], roles = [] }: UseUserCanProps) {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = verifyUserPermissions({
    user,
    permissions,
    roles
  })

  return userHasValidPermissions

}
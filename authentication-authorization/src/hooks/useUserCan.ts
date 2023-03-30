import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

interface UseUserCanProps {
  permissions?: string[]
  roles?: string[]
}

export function useUserCan({ permissions = [], roles = [] }: UseUserCanProps) {
  const { isAuthenticated, user } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every((permission) => {
      return user?.permissions.includes(permission)
    })

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles?.some((role) => {
      return user?.roles.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true

}
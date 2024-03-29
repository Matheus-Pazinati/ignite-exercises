import { useUserCan } from "@/hooks/useUserCan"
import { ReactNode } from "react"

interface UserCanProps {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export function UserCan({ children, permissions, roles }: UserCanProps) {
  const userCanSeeComponent = useUserCan({
    permissions,
    roles
  })

  if (!userCanSeeComponent) {
    return null
  }
  
  return (
    <>
      {children}
    </>
  )
}
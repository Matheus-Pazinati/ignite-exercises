import { api } from "@/lib/api";
import { createContext, ReactNode, useState } from "react"
import Router from "next/router";
import { setCookie } from 'nookies'

interface SignInCredentials {
  email: string
  password: string
}

interface UserProps {
  email: string
  permissions: string[]
  roles: string[]
}

interface AuthContextProps {
  signIn: (credentials: SignInCredentials) => Promise<void>
  isAuthenticated: boolean
  user?: UserProps
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })
      const { token, refreshToken, permissions, roles } = response.data

      setUser({
        email,
        permissions,
        roles
      })

      setCookie(undefined, 'token:nextauth', token, {
        maxAge: 60 * 60 *24 * 30, //1 month
        path: '/'
      })
      setCookie(undefined, 'refreshToken:nextauth', refreshToken)

      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
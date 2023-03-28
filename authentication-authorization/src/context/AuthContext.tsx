import { createContext, ReactNode, useEffect, useState } from "react"
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "@/lib/apiClient";

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

export function signOut() {
  destroyCookie(undefined, 'token:nextauth')
  destroyCookie(undefined, 'refreshToken:nextauth'),

  Router.push("/")
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const {'token:nextauth': token} = parseCookies()
    if (token) {
      api.get('/me')
      .then((response) => {
        const { email, permissions, roles } = response.data
        setUser({email, permissions, roles})
      })
      .catch( () => {
        signOut()
      })
    }
  }, [])

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

      api.defaults.headers['Authorization'] = `Bearer ${token}`

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
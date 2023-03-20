import { api } from "@/lib/api";
import { createContext, ReactNode } from "react"

interface SignInCredentials {
  email: string;
  password: string
}

interface AuthContextProps {
  signIn: (credentials: SignInCredentials) => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password
    })
    console.log(response.data)
  }
  return (
    <AuthContext.Provider value={{signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
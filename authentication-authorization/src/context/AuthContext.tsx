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
    console.log(email, password)
  }
  return (
    <AuthContext.Provider value={{signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
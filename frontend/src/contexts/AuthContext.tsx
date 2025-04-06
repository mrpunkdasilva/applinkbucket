import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth'
import { authService } from '../services/auth.service'

// Interface que define todas as operações de autenticação disponíveis
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

// Criação do contexto com valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props do AuthProvider
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Estado para controlar autenticação
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  })
  
  // Estados adicionais para melhor UX
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Efeito para verificar autenticação inicial
  useEffect(() => {
    try {
      const user = authService.getCurrentUser()
      if (user) {
        setState({ user, isAuthenticated: true })
      }
    } catch (err) {
      console.error('Error checking authentication:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Função de login
  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    
    try {
      const credentials: LoginCredentials = { email, password }
      const user = await authService.login(credentials)
      setState({ user, isAuthenticated: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Função de registro
  const register = async (name: string, email: string, password: string) => {
    setError(null)
    setLoading(true)
    
    try {
      const registerData: RegisterData = { name, email, password }
      const user = await authService.register(registerData)
      setState({ user, isAuthenticated: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Função de logout
  const logout = () => {
    try {
      authService.logout()
      setState({ user: null, isAuthenticated: false })
    } catch (err) {
      console.error('Error during logout:', err)
    }
  }

  // Valor do contexto que será disponibilizado
  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout,
    loading,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
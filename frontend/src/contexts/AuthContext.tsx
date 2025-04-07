import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types/user'
import { authService } from '../services/auth.service'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isPro: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'ADMIN'
  const isPro = user?.role === 'PRO' || isAdmin

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const user = await authService.validateToken(token)
          if (user) {
            setUser(user)
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
        setUser(null)
      }
    }

    checkAuth()
  }, [])

  const register = async (name: string, email: string, password: string) => {
    const user = await authService.register(name, email, password)
    if (user.token) {
      localStorage.setItem('token', user.token)
    }
    setUser(user)
  }

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password)
    if (user.token) {
      localStorage.setItem('token', user.token)
    }
    setUser(user)
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = async (data: Partial<User>) => {
    const updatedUser = await authService.updateUser(data)
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isPro,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
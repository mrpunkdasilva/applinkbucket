export interface User {
  name: string
  email: string
  token: string
  password?: string // Opcional, usado apenas para armazenamento local
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
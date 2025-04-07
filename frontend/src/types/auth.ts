import { UserRole } from './user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  token: string
  createdAt: string
  password?: string // Optional, used only for local storage
  profilePicture?: string
  subscription?: {
    type: 'FREE' | 'PRO'
    validUntil?: string
  }
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
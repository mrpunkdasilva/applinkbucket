import { LoginCredentials, RegisterData, User } from '../types/auth'

class AuthService {
  private readonly STORAGE_KEY = 'auth_user'
  private readonly USERS_STORAGE_KEY = 'registered_users'
  // private readonly API_URL = '/api/auth' // Para quando integrarmos com o backend

  private getRegisteredUsers(): User[] {
    const users = localStorage.getItem(this.USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  }

  private saveRegisteredUsers(users: User[]): void {
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users))
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const users = this.getRegisteredUsers()
      const user = users.find(u => u.email === credentials.email)

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials')
      }

      const userData: User = {
        email: user.email,
        name: user.name,
        token: 'dummy-token-' + Date.now()
      }

      this.saveUserToStorage(userData)
      return userData
    } catch (error) {
      throw new Error('Invalid credentials')
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      const users = this.getRegisteredUsers()
      
      // Verificar se o email já está registrado
      if (users.some(user => user.email === data.email)) {
        throw new Error('Email already registered')
      }

      // Criar novo usuário
      const newUser: User & { password: string } = {
        email: data.email,
        name: data.name,
        password: data.password, // Em uma implementação real, isso seria hasheado
        token: 'dummy-token-' + Date.now()
      }

      // Salvar na lista de usuários
      users.push(newUser)
      this.saveRegisteredUsers(users)

      // Retornar dados do usuário (sem a senha)
      const userData: User = {
        email: newUser.email,
        name: newUser.name,
        token: newUser.token
      }

      this.saveUserToStorage(userData)
      return userData
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Registration failed')
    }
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(this.STORAGE_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
  }
}

export const authService = new AuthService()
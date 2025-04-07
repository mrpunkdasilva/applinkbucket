import { User, UserRole } from '../types/user'

class AuthService {
  private readonly STORAGE_KEY = 'user'
  private readonly USERS_KEY = 'registered_users'

  private getRegisteredUsers(): any[] {
    const usersJson = localStorage.getItem(this.USERS_KEY)
    return usersJson ? JSON.parse(usersJson) : []
  }

  private saveRegisteredUsers(users: any[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.STORAGE_KEY)
    return userData ? JSON.parse(userData) : null
  }

  async validateToken(token: string): Promise<User | null> {
    const userData = this.getCurrentUser()
    if (userData?.token === token) {
      return userData
    }
    return null
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const users = this.getRegisteredUsers()

      if (users.some(user => user.email === email)) {
        throw new Error('Email already registered')
      }

      // Criando o usuário de acordo com a interface User
      const newUser: User = {
        id: String(Date.now()),
        email,
        name,
        role: UserRole.FREE,
        createdAt: new Date().toISOString(),
        subscription: {
          type: 'FREE'
        }
      }

      const userWithPassword = {
        ...newUser,
        password,
        token: 'dummy-token-' + Date.now()
      }

      users.push(userWithPassword)
      this.saveRegisteredUsers(users)
      this.saveUserToStorage(newUser)

      return {
        ...newUser,
        token: userWithPassword.token // Adicionando o token apenas no retorno
      } as User
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Registration failed')
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const users = this.getRegisteredUsers()
      const user = users.find(u => u.email === email && u.password === password)

      if (!user) {
        throw new Error('Invalid credentials')
      }

      // Criando o objeto de acordo com a interface User
      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        subscription: user.subscription || { type: 'FREE' }
      }

      const userWithToken = {
        ...userData,
        token: 'dummy-token-' + Date.now()
      }

      this.saveUserToStorage(userWithToken)
      return userWithToken as User
    } catch (error) {
      throw new Error('Invalid credentials')
    }
  }

  async updateUser(data: Partial<User>): Promise<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) {
      throw new Error('No user logged in')
    }

    const updatedUser = { ...currentUser, ...data }
    this.saveUserToStorage(updatedUser)
    return updatedUser
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

export const authService = new AuthService()
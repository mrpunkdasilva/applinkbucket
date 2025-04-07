import { User, UserRole } from '../types/user'

export const mockFreeUser: User = {
  id: "mock-free-123",
  name: "John Doe",
  email: "john@example.com",
  role: UserRole.FREE,
  token: "mock-token-free-123",
  createdAt: "2024-01-01T00:00:00.000Z",
  subscription: {
    type: "FREE"
  }
}

export const mockProUser: User = {
  id: "mock-pro-456",
  name: "Jane Smith",
  email: "jane@example.com",
  role: UserRole.PRO,
  token: "mock-token-pro-456",
  createdAt: "2024-01-01T00:00:00.000Z",
  subscription: {
    type: "PRO",
    validUntil: "2025-01-01T00:00:00.000Z"
  }
}

export const mockAdminUser: User = {
  id: "mock-admin-789",
  name: "Admin User",
  email: "admin@example.com",
  role: UserRole.ADMIN,
  token: "mock-token-admin-789",
  createdAt: "2024-01-01T00:00:00.000Z",
  subscription: {
    type: "PRO"
  }
}

export const mockUserCredentials = {
  email: "john@example.com",
  password: "password123"
}

export const mockRegistrationData = {
  name: "New User",
  email: "newuser@example.com",
  password: "Password123!"
}

// Mock de usuários para localStorage
export const mockStorageUsers = [
  {
    ...mockFreeUser,
    password: "password123"
  },
  {
    ...mockProUser,
    password: "password456"
  },
  {
    ...mockAdminUser,
    password: "adminpass789"
  }
]

// Helper para inicializar o localStorage com dados mock
export const initializeMockStorage = () => {
  localStorage.setItem('registered_users', JSON.stringify(mockStorageUsers))
}

// Helper para limpar dados mock do localStorage
export const clearMockStorage = () => {
  localStorage.removeItem('registered_users')
  localStorage.removeItem('user')
}

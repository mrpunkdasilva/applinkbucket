import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from './LoginForm'
import { mockUserCredentials, initializeMockStorage, clearMockStorage } from '../../mocks/users'

// Mock do useAuth
const mockLogin = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
    logout: vi.fn()
  })
}))

// Mock do useAuthForm
vi.mock('../../hooks/useAuthForm', () => ({
  useAuthForm: () => ({
    formState: {
      email: { value: '', error: undefined },
      password: { value: '', error: undefined }
    },
    isSubmitting: false,
    setIsSubmitting: vi.fn(),
    updateField: vi.fn(),
    hasErrors: () => false,
    getValues: () => ({ 
      email: mockUserCredentials.email, 
      password: mockUserCredentials.password 
    })
  })
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearMockStorage()
    initializeMockStorage()
  })

  it('should render login form', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should call login function with mock credentials', async () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockUserCredentials.email },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockUserCredentials.password },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockLogin).toHaveBeenCalledWith(
      mockUserCredentials.email, 
      mockUserCredentials.password
    )
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from './LoginForm'

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
    getValues: () => ({ email: 'test@example.com', password: 'password123' })
  })
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render login form', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should call login function with form data', async () => {
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
  })
})
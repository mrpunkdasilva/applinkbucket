import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../components/auth/AuthLayout'
import { PasswordStrengthGuide } from '../components/auth/PasswordStrengthGuide'
import { useAuthForm } from '../hooks/useAuthForm'
import { emailValidation, validatePassword } from '../utils/validations'
import { FormInput } from '../components/auth/FormInput'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const {
    formState,
    isSubmitting,
    setIsSubmitting,
    updateField,
    hasErrors,
    getValues
  } = useAuthForm(
    {
      email: { value: '' },
      password: { value: '' }
    },
    {
      email: emailValidation
    }
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (hasErrors() || !validatePassword(formState.password.value)) {
      return
    }

    setIsSubmitting(true)
    try {
      const values = getValues()
      await login(values.email, values.password)
      navigate('/dashboard')
    } catch (err: any) {
      // Handle error appropriately
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <span>
          Or{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
            create a new account
          </Link>
        </span>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email address"
          type="email"
          value={formState.email.value}
          error={formState.email.error}
          onChange={(e) => updateField('email', e.target.value)}
          autoComplete="email"
        />

        <div>
          <FormInput
            id="password"
            label="Password"
            type="password"
            value={formState.password.value}
            error={formState.password.error}
            onChange={(e) => updateField('password', e.target.value)}
            autoComplete="current-password"
          />
          <PasswordStrengthGuide password={formState.password.value} />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || hasErrors() || !validatePassword(formState.password.value)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
import { FormEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FormInput } from '../auth/FormInput'
import { useAuthForm } from '../../hooks/useAuthForm'
import { emailValidation } from '../../utils/validations'

export function LoginForm() {
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
    if (hasErrors()) {
      return
    }

    setIsSubmitting(true)
    try {
      const values = getValues()
      await login(values.email, values.password)
    } catch (err) {
      // Error handling can be added here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        id="email"
        label="Email address"
        type="email"
        value={formState.email.value}
        error={formState.email.error}
        onChange={(e) => updateField('email', e.target.value)}
        autoComplete="email"
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        value={formState.password.value}
        error={formState.password.error}
        onChange={(e) => updateField('password', e.target.value)}
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled={isSubmitting || hasErrors()}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../components/auth/AuthLayout'
import { PasswordStrengthGuide } from '../components/auth/PasswordStrengthGuide'
import { useAuthForm } from '../hooks/useAuthForm'
import { emailValidation, nameValidation, validatePassword } from '../utils/validations'
import { FormInput } from '../components/auth/FormInput'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  
  const {
    formState,
    isSubmitting,
    setIsSubmitting,
    updateField,
    hasErrors,
    getValues
  } = useAuthForm(
    {
      name: { value: '' },
      email: { value: '' },
      password: { value: '' }
    },
    {
      name: nameValidation,
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
      await register(values.name, values.email, values.password)
      navigate('/dashboard')
    } catch (err: any) {
      // Handle error appropriately
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Or{' '}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">
            sign in to existing account
          </Link>
        </>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Full name"
          type="text"
          value={formState.name.value}
          error={formState.name.error}
          onChange={(e) => updateField('name', e.target.value)}
          autoComplete="name"
        />

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
            autoComplete="new-password"
          />
          <PasswordStrengthGuide password={formState.password.value} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || hasErrors()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting || hasErrors()
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}
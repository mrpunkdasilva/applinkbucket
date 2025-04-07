import { useMemo } from 'react'
import { passwordRequirements, getPasswordStrength } from '../../utils/validations'

interface PasswordStrengthGuideProps {
  password: string
}

export function PasswordStrengthGuide({ password }: PasswordStrengthGuideProps) {
  const strengthColors = {
    'weak': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'strong': 'bg-green-500',
    'very-strong': 'bg-emerald-500'
  }

  const validations = useMemo(() => 
    passwordRequirements.map(requirement => ({
      ...requirement,
      valid: requirement.test(password)
    })),
    [password]
  )

  const strength = useMemo(() => getPasswordStrength(password), [password])

  return (
    <div className="mt-2 text-sm">
      <div className="mb-2 flex gap-1">
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={`h-1 w-1/4 rounded-full ${
              validations.filter(v => v.valid).length >= segment
                ? strengthColors[strength]
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <ul className="space-y-1 text-gray-400">
        {validations.map(({ key, message, valid }) => (
          <li
            key={key}
            className={`flex items-center space-x-2 ${
              valid ? 'text-green-500' : ''
            }`}
          >
            <span className={`text-xs ${
              valid ? 'text-green-500' : 'text-gray-500'
            }`}>
              {valid ? '✓' : '○'}
            </span>
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
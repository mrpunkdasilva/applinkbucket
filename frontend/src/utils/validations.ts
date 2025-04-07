export interface ValidationRule {
  test: (value: string) => boolean
  message: string
}

export interface PasswordRequirement extends ValidationRule {
  key: string
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    key: 'minLength',
    test: (pwd) => pwd.length >= 8,
    message: 'At least 8 characters'
  },
  {
    key: 'uppercase',
    test: (pwd) => /[A-Z]/.test(pwd),
    message: 'One uppercase letter'
  },
  {
    key: 'lowercase',
    test: (pwd) => /[a-z]/.test(pwd),
    message: 'One lowercase letter'
  },
  {
    key: 'number',
    test: (pwd) => /[0-9]/.test(pwd),
    message: 'One number'
  },
  {
    key: 'special',
    test: (pwd) => /[!@#$%^&*]/.test(pwd),
    message: 'One special character (!@#$%^&*)'
  }
]

export const emailValidation: ValidationRule = {
  test: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  message: 'Please enter a valid email address'
}

export const nameValidation: ValidationRule = {
  test: (name) => name.length >= 2,
  message: 'Name must be at least 2 characters'
}

export const validatePassword = (password: string): boolean => {
  return passwordRequirements.every(requirement => requirement.test(password))
}

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | 'very-strong' => {
  const validCount = passwordRequirements.filter(req => req.test(password)).length
  if (validCount === 0) return 'weak'
  if (validCount < 3) return 'medium'
  if (validCount < 5) return 'strong'
  return 'very-strong'
}
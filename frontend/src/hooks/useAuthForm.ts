import { useState, useEffect } from 'react'
import { ValidationRule } from '../utils/validations'

export interface FormField {
  value: string
  error?: string
}

export interface FormState {
  [key: string]: FormField
}

export interface FormValidations {
  [key: string]: ValidationRule
}

export function useAuthForm(initialState: FormState, validations: FormValidations) {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    validateFields()
  }, [formState])

  const validateFields = () => {
    const newState = { ...formState }
    let hasChanges = false

    Object.keys(validations).forEach(fieldName => {
      const field = formState[fieldName]
      if (field.value) {
        const validation = validations[fieldName]
        const isValid = validation.test(field.value)
        
        if (!isValid && (!field.error || field.error !== validation.message)) {
          newState[fieldName] = {
            ...field,
            error: validation.message
          }
          hasChanges = true
        } else if (isValid && field.error) {
          newState[fieldName] = {
            ...field,
            error: undefined
          }
          hasChanges = true
        }
      }
    })

    if (hasChanges) {
      setFormState(newState)
    }
  }

  const updateField = (fieldName: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value
      }
    }))
  }

  const hasErrors = () => {
    return Object.values(formState).some(field => field.error)
  }

  const getValues = () => {
    return Object.entries(formState).reduce((acc, [key, field]) => {
      acc[key] = field.value
      return acc
    }, {} as { [key: string]: string })
  }

  return {
    formState,
    isSubmitting,
    setIsSubmitting,
    updateField,
    hasErrors,
    getValues
  }
}
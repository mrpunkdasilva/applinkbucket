import { useState, useEffect } from 'react'

interface User {
  name: string
  email: string
  token: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData: User) => {
    localStorage.setItem('currentUser', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout
  }
}
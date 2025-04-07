import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../types/user'

function AppRoutes() {
  const { user } = useAuth()

  const isAdmin = user?.role === UserRole.ADMIN
  // @ts-ignore
    const isPro = user?.role === UserRole.PRO || isAdmin

  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  )
}

export default AppRoutes
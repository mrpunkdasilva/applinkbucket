import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: ReactNode
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <Logo className="text-blue-500" size={40} />
          <span className="text-2xl font-bold text-white">LinkBucket</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserRole } from '../../types/user'
import {
  HomeIcon,
  FolderIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  KeyIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export function Sidebar() {
  const { user } = useAuth()
  const isAdmin = user?.role === UserRole.ADMIN
  const isPro = user?.role === UserRole.PRO || isAdmin

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        {/* Basic Navigation - All Users */}
        <NavSection title="Main">
          <NavItem to="/dashboard" icon={HomeIcon}>Dashboard</NavItem>
          <NavItem to="/buckets" icon={FolderIcon}>My Buckets</NavItem>
        </NavSection>

        {/* Pro Features */}
        {isPro && (
          <NavSection title="Pro Features">
            <NavItem to="/analytics" icon={ChartBarIcon}>Analytics</NavItem>
            <NavItem to="/team" icon={UsersIcon}>Team</NavItem>
            <NavItem to="/api-keys" icon={KeyIcon}>API Keys</NavItem>
          </NavSection>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <NavSection title="Administration">
            <NavItem to="/admin" icon={ShieldCheckIcon}>Admin Dashboard</NavItem>
            <NavItem to="/admin/users" icon={UsersIcon}>User Management</NavItem>
            <NavItem to="/admin/settings" icon={CogIcon}>System Settings</NavItem>
          </NavSection>
        )}

        {/* User Settings */}
        <NavSection title="Settings">
          <NavItem to="/profile" icon={UsersIcon}>Profile</NavItem>
          <NavItem to="/settings" icon={CogIcon}>Settings</NavItem>
        </NavSection>
      </nav>
    </aside>
  )
}

interface NavSectionProps {
  title: string
  children: React.ReactNode
}

function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="mt-2 space-y-1">
        {children}
      </div>
    </div>
  )
}

interface NavItemProps {
  to: string
  icon: React.ComponentType<any>
  children: React.ReactNode
}

function NavItem({ to, icon: Icon, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      <Icon className="flex-shrink-0 w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" />
      {children}
    </NavLink>
  )
}
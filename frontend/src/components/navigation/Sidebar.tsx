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
  ShieldCheckIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export function Sidebar() {
  const { user } = useAuth()
  const isAdmin = user?.role === UserRole.ADMIN
  const isPro = user?.role === UserRole.PRO || isAdmin
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Menu items configuration
  const menuItems = {
    main: [
      { to: "/dashboard", icon: HomeIcon, label: "Dashboard" },
      { to: "/buckets", icon: FolderIcon, label: "My Buckets" },
    ],
    pro: isPro ? [
      { to: "/analytics", icon: ChartBarIcon, label: "Analytics" },
      { to: "/team", icon: UsersIcon, label: "Team" },
      { to: "/api-keys", icon: KeyIcon, label: "API Keys" },
    ] : [],
    admin: isAdmin ? [
      { to: "/admin", icon: ShieldCheckIcon, label: "Admin" },
      { to: "/admin/users", icon: UsersIcon, label: "Users" },
      { to: "/admin/settings", icon: CogIcon, label: "System" },
    ] : [],
    settings: [
      { to: "/profile", icon: UsersIcon, label: "Profile" },
      { to: "/settings", icon: CogIcon, label: "Settings" },
    ]
  }

  // Mobile bottom navigation - select most important items
  const mobileNavItems = [
    menuItems.main[0], // Dashboard
    menuItems.main[1], // Buckets
    ...(isPro ? [menuItems.pro[0]] : []), // Analytics if Pro
    menuItems.settings[0], // Profile
  ].slice(0, 4) // Limit to 4 items for mobile

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen" role="navigation" aria-label="Main navigation">
        <nav className="mt-5 px-2">
          <NavSection title="Main">
            {menuItems.main.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </NavSection>

          {isPro && (
            <NavSection title="Pro Features">
              {menuItems.pro.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </NavSection>
          )}

          {isAdmin && (
            <NavSection title="Administration">
              {menuItems.admin.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </NavSection>
          )}

          <NavSection title="Settings">
            {menuItems.settings.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </NavSection>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" 
           role="navigation" 
           aria-label="Mobile navigation">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full
                ${isActive ? 'text-blue-600' : 'text-gray-600'}
              `}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button - Only shown when needed */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle mobile menu"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Full Screen Mobile Menu - For less used items */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-40">
          <div className="flex flex-col p-4 pt-16">
            {Object.entries(menuItems).map(([section, items]) => (
              items.length > 0 && (
                <div key={section} className="mb-6">
                  <h2 className="text-gray-400 uppercase text-sm mb-2">{section}</h2>
                  {items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg mb-1
                        ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-6 w-6 mr-3" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </>
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
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="text-blue-500" size={40} />
            <span className="text-2xl font-bold text-white">LinkBucket</span>
          </Link>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Organize Your Digital World
            <span className="text-blue-500"> Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Save, organize, and share your favorite links in beautiful buckets.
            The smart way to manage your digital resources.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-blue-500 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Smart Organization
            </h3>
            <p className="text-gray-400">
              Create custom buckets to organize your links by project, topic, or any way you prefer.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-blue-500 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Quick Access
            </h3>
            <p className="text-gray-400">
              Find any saved link instantly with powerful search and filtering capabilities.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-blue-500 text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Easy Sharing
            </h3>
            <p className="text-gray-400">
              Share entire buckets or individual links with your team or the world.
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Developers & Teams
          </h2>
          <div className="flex justify-center space-x-12">
            <div className="text-gray-400">5000+ Users</div>
            <div className="text-gray-400">10,000+ Buckets Created</div>
            <div className="text-gray-400">4.9/5 Rating</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are already organizing their digital world better.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50"
          >
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">
          <p>© 2024 LinkBucket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
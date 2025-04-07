import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import ImageCat from '../assets/Animated heavy breathing cat - Imgur.gif'

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

      {/* New Fun CTA Section with Cat Meme */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <img 
            src={ImageCat}
            alt="Organized Cat Meme" 
            className="mx-auto mb-6 rounded-lg w-64 h-64 object-cover"
          />
          <h3 className="text-2xl font-bold text-white mb-4">
            When developers find their bookmarks organized in LinkBucket
          </h3>
          <p className="text-gray-400 text-lg">
            No more "I'll organize it later" excuses! 😺
          </p>
        </div>
      </div>

      {/* New Why Choose Us Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why Developers Love LinkBucket
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-green-500 text-2xl mb-2">99.9%</div>
            <div className="text-white font-medium">Uptime</div>
            <p className="text-gray-400 text-sm mt-2">Always available when you need it</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-blue-500 text-2xl mb-2">{"<"}50ms</div>
            <div className="text-white font-medium">Response Time</div>
            <p className="text-gray-400 text-sm mt-2">Lightning-fast performance</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-purple-500 text-2xl mb-2">256-bit</div>
            <div className="text-white font-medium">Encryption</div>
            <p className="text-gray-400 text-sm mt-2">Enterprise-grade security</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="text-orange-500 text-2xl mb-2">24/7</div>
            <div className="text-white font-medium">Support</div>
            <p className="text-gray-400 text-sm mt-2">We're here to help</p>
          </div>
        </div>
      </div>

      {/* New Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          What Developers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                alt="John" 
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="text-white font-medium">John D.</div>
                <div className="text-gray-400 text-sm">Senior Developer</div>
              </div>
            </div>
            <p className="text-gray-300">
              "Finally, a bookmarking tool that speaks developer! The API integration is just *chef's kiss*"
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
                alt="Sarah" 
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="text-white font-medium">Sarah M.</div>
                <div className="text-gray-400 text-sm">Tech Lead</div>
              </div>
            </div>
            <p className="text-gray-300">
              "Our team's productivity skyrocketed after we started using LinkBucket for project resources."
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Alex" 
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="text-white font-medium">Alex K.</div>
                <div className="text-gray-400 text-sm">Full-stack Developer</div>
              </div>
            </div>
            <p className="text-gray-300">
              "The search functionality is incredible. I can find that one Stack Overflow link from 3 months ago in seconds!"
            </p>
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
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Menu, X, User, LogOut, Shield, Calendar } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-green-700">
              PlasticFree
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/campaigns" className="text-gray-700 hover:text-green-600 transition">
              Campaigns
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-green-600 transition">
              Resources
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                {user.role === 'proposer' && (
                  <Link to="/proposer" className="text-gray-700 hover:text-green-600">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-green-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/campaigns" className="text-gray-700 hover:text-green-600">
                Campaigns
              </Link>
              <Link to="/resources" className="text-gray-700 hover:text-green-600">
                Resources
              </Link>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 hover:text-green-600">
                      Admin Panel
                    </Link>
                  )}
                  {user.role === 'proposer' && (
                    <Link to="/proposer" className="text-gray-700 hover:text-green-600">
                      Proposer Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="text-gray-700 hover:text-green-600">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-green-600">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
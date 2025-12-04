import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Lock, LogOut, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-brand-900 to-gray-900 shadow-xl sticky top-0 z-50 border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 transition-all duration-300">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                 <Heart className="h-7 w-7 md:h-9 md:w-9 text-amber-500 fill-current drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                 <div className="absolute inset-0 bg-amber-400 blur-lg opacity-20 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-2 md:ml-3 flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-serif font-bold text-amber-50 tracking-wide drop-shadow-sm leading-none md:leading-normal">
                  Qasmi <span className="text-amber-400">Matrimony</span>
                </span>
                <span className="hidden md:block text-[10px] text-amber-200/80 uppercase tracking-[0.2em] font-sans">
                  Premium Rishta Service
                </span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <Link 
              to="/" 
              className={`
                flex items-center justify-center transition-all duration-300 group
                ${isActive('/') ? 'text-amber-400' : 'text-gray-300 hover:text-amber-200'}
              `}
            >
              {/* Mobile Version: Visible Button */}
              <div className={`md:hidden flex items-center space-x-1 px-3 py-1.5 rounded-full border ${isActive('/') ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-white/5 border-white/10 text-gray-200'}`}>
                <Search className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wide">Find Match</span>
              </div>

              {/* Desktop Version: Nav Link */}
              <span className="hidden md:inline-block text-sm font-semibold tracking-wider uppercase relative py-2">
                Find Match
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform transition-transform duration-300 origin-left ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </span>
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className={`hidden md:inline-block text-sm font-semibold tracking-wider uppercase transition-all duration-300 relative group py-2 ${
                    location.pathname.includes('admin') 
                      ? 'text-amber-400' 
                      : 'text-gray-300 hover:text-amber-200'
                  }`}
                >
                  Dashboard
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform transition-transform duration-300 origin-left ${location.pathname.includes('admin') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 md:px-5 md:py-2 border border-amber-500/40 md:text-sm font-medium rounded-full text-amber-100 bg-brand-800/50 hover:bg-amber-600 hover:text-white hover:border-amber-600 focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                className="flex items-center justify-center p-2 md:px-5 md:py-2 text-sm font-medium text-amber-100 hover:text-white transition-all duration-300 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 shadow-sm"
                title="Admin Login"
              >
                <Lock className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
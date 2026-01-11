import { Link, useLocation } from 'react-router-dom';
import { Home, PlayCircle, PlusCircle, User } from 'lucide-react'; 

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/videos', icon: PlayCircle, label: 'Videos' },
    { path: '/add-workout', icon: PlusCircle, label: 'Add' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 pb-safe z-50 px-4 mb-6">
      <div className="max-w-md mx-auto bg-white rounded-full h-20 shadow-2xl flex justify-around items-center border border-gray-100 px-2">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className="relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300"
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${active ? 'bg-green-500/10 scale-110' : 'hover:bg-gray-100'}`}>
                <Icon 
                  size={28} 
                  className={`transition-colors duration-300 ${active ? 'text-green-600' : 'text-gray-500'}`}
                  strokeWidth={active ? 2.5 : 2} 
                />
              </div>
              
              {/* The Indicator Dot */}
              {active && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-green-600 rounded-full animate-in fade-in zoom-in duration-300"></div>
              )}
            </Link>
          );
        })}

      </div>
    </nav>
  );
};

export default Navbar;
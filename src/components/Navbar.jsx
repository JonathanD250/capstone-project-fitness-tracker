import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white rounded-full h-16 shadow-2xl flex justify-around items-center z-50">
      {/* Home Link */}
      <Link to="/" className="p-2">
        <Home 
          size={28} 
          color="black" 
          strokeWidth={isActive('/') ? 3 : 2} // Make it bolder if active
          fill={isActive('/') ? "black" : "none"} // Optional: fill if active like the design
        />
      </Link>

      {/* Analytics/Stats Link */}
      <Link to="/history" className="p-2">
        <PieChart 
          size={28} 
          color="black" 
          strokeWidth={isActive('/history') ? 3 : 2} 
        />
      </Link>

      {/* Profile Link */}
      <Link to="/profile" className="p-2">
        <User 
          size={28} 
          color="black" 
          strokeWidth={isActive('/profile') ? 3 : 2} 
        />
      </Link>
    </nav>
  );
};

export default Navbar;
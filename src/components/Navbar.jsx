import { Link, useLocation } from 'react-router-dom';
import { Home, PlayCircle, PlusCircle, User } from 'lucide-react'; 

// ... keep imports ...

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 pb-safe z-50 px-4 mb-6">
      <div className="max-w-md mx-auto bg-white rounded-full h-16 shadow-2xl flex justify-around items-center border border-gray-100">
        
        {/* 1. HOME */}
        <Link to="/" className="p-2 transition-transform hover:scale-110 active:scale-90">
          <Home 
            size={28} 
            color="black" 
            strokeWidth={isActive('/') ? 3 : 2} 
            fill={isActive('/') ? "black" : "none"}
          />
        </Link>

        {/* 2. VIDEOS */}
        <Link to="/videos" className="p-2 transition-transform hover:scale-110 active:scale-90">
          <PlayCircle 
            size={28} 
            color="black" 
            strokeWidth={isActive('/videos') ? 3 : 2}
            fill={isActive('/videos') ? "black" : "none"} 
          />
        </Link>

        {/* 3. ADD WORKOUT */}
        <Link to="/add-workout" className="p-2 transition-transform hover:scale-110 active:scale-90">
          <PlusCircle 
            size={28} 
            color="black" 
            strokeWidth={isActive('/add-workout') ? 3 : 2}
            fill={isActive('/add-workout') ? "black" : "none"} 
          />
        </Link>

        {/* 4. PROFILE */}
        <Link to="/profile" className="p-2 transition-transform hover:scale-110 active:scale-90">
          <User 
            size={28} 
            color="black" 
            strokeWidth={isActive('/profile') ? 3 : 2} 
            fill={isActive('/profile') ? "black" : "none"}
          />
        </Link>
      </div>
    </nav>
  );
};
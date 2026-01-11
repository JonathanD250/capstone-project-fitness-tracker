import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';       
import Dashboard from './pages/Dashboard'; 
import Profile from './pages/Profile';
import AddWorkout from './pages/AddWorkout';
import History from './pages/History';
import VideoLibrary from './pages/VideoLibrary'; 

function App() {
  return (
    <div className="min-h-screen text-white font-sans relative">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <img src="/bg.png" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/90"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/videos" element={<VideoLibrary />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-workout" element={<AddWorkout />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      
      <Navbar /> 
    </div>
  )
}

export default App;
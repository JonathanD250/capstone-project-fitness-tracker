import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24 font-sans relative">
      
      {/* 1. Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/bg.png"
          alt="Fitness Background" 
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {e.target.style.display='none'}} 
        />
      </div>

      {/* 2. Gradient Overlay Layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-slate-900/80 to-slate-900 z-0 pointer-events-none"></div>

      {/* 3. Main Content Layer */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <Navbar /> 
    </div>
  )
}

export default App;
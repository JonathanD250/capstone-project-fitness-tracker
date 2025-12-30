import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24 font-sans relative">
      
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 to-slate-900/90 z-0 pointer-events-none"></div>

      {/* Main Content (Z-index 10) */}
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
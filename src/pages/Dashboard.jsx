import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Flame, Award } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSmartTracking, setIsSmartTracking] = useState(true);
  
  // Dynamic Stats State
  const [stats, setStats] = useState({
    progress: 0,
    duration: 0,
    distance: 0
  });

  const WEEKLY_GOAL = 12; // Example goal

  useEffect(() => {
    // 1. Get History
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    const count = history.length;

    // 2. Calculate Stats (Estimations based on workout count)
    // Assuming approx 45 mins and 3.5km per logged session
    const calculatedDuration = count * 45; 
    const calculatedDistance = (count * 3.5).toFixed(1); // 1 decimal place
    
    // Calculate Percentage (capped at 100%)
    const percentage = Math.min(Math.round((count / WEEKLY_GOAL) * 100), 100);

    setStats({
      progress: percentage,
      duration: calculatedDuration,
      distance: calculatedDistance
    });
  }, []);

  // --- GAUGE MATH ---
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const semiCircle = circumference / 2; 
  const strokeDashoffset = semiCircle - (stats.progress / 100) * semiCircle;

  return (
    <div className="min-h-screen relative font-sans text-white pb-24 bg-slate-900">
      
      {/* 1. Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
          alt="Smart Tracking Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
      </div>

      {/* 2. Header */}
      <div className="relative z-10 p-6 pt-8 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
             <ArrowLeft size={24} className="text-white" />
        </button>
        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
             <Link to="/profile" className="block w-8 h-8 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
                {/* User Avatar Placeholder */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kweku" alt="User" />
             </Link>
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 px-6 mt-4">
        <h2 className="text-xl text-gray-200 mb-4 font-light">Today</h2>

        {/* --- GLASS CARD --- */}
        <div className="p-6 pb-24 min-h-screen">
            
            {/* Title & Icons */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-4">Fitness Status</h1>
                <div className="flex justify-center gap-4">
                    <div className="bg-white p-2.5 rounded-full text-black shadow-lg"><MapPin size={20} /></div>
                    <div className="bg-white p-2.5 rounded-full text-black shadow-lg"><Clock size={20} /></div>
                    <div className="bg-white p-2.5 rounded-full text-black shadow-lg"><Flame size={20} /></div>
                    <div className="bg-white p-2.5 rounded-full text-black shadow-lg"><Award size={20} /></div>
                </div>
            </div>

            {/* Track Record Label */}
            <div className="flex items-center gap-2 mb-2 justify-center">
                <span className="font-bold text-lg">Track Record</span>
                <span className="bg-black/60 text-green-400 text-[10px] px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Auto mode
                </span>
            </div>

            {/* --- THE GAUGE (Exact match to design) --- */}
            <div className="relative h-56 flex items-center justify-center mb-2 -mt-4">
                 <svg className="w-72 h-72 transform -rotate-180 overflow-visible">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" /> {/* Yellow */}
                            <stop offset="100%" stopColor="#f59e0b" /> {/* Orange-Yellow */}
                        </linearGradient>
                    </defs>

                    {/* 1. Gray Background Track (Dashed) */}
                    <circle 
                        cx="144" cy="144" r={radius} 
                        fill="none" 
                        stroke="#4b5563" // Gray-600
                        strokeWidth="18" 
                        strokeDasharray="2 4" /* Specific dash pattern to match image */
                        strokeOpacity="0.5"
                        style={{ strokeDasharray: `${semiCircle} ${circumference}` }} // Cut to semi-circle
                    />
                    
                    {/* 2. Yellow Progress Track (Solid) */}
                    <circle 
                        cx="144" cy="144" r={radius} 
                        fill="none" 
                        stroke="url(#gaugeGradient)" 
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray={`${semiCircle} ${circumference}`} 
                        strokeDashoffset={strokeDashoffset}
                        className="drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] transition-all duration-1000 ease-out"
                    />
                 </svg>
                 
                 {/* Text Inside Gauge */}
                 <div className="absolute top-28 text-center">
                    <span className="block text-5xl font-bold tracking-tighter">{stats.progress}%</span>
                    <span className="text-gray-400 text-lg font-medium">Progress</span>
                 </div>
            </div>

            {/* Stats Row */}
            <div className="space-y-4 mb-8 px-2">
                {/* Duration Row */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 rounded-full p-2 text-white"><Clock size={18} /></div>
                        <span className="font-medium text-gray-300">Duration</span>
                    </div>
                    <span className="text-white font-mono text-lg">{stats.duration} mins</span>
                </div>

                {/* Distance Row */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 rounded-full p-2 text-white"><MapPin size={18} /></div>
                        <span className="font-medium text-gray-300">Distance</span>
                    </div>
                    <span className="text-white font-mono text-lg">{stats.distance} Km</span>
                </div>
            </div>

            {/* Smart Tracking Toggle */}
            <div className="bg-black/40 rounded-full p-2 flex justify-between items-center pl-5 pr-2 h-16 border border-white/5">
                <span className="text-gray-200 font-bold">Smart Tracking</span>
                
                <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-green-400">On</span>
                    <button 
                        onClick={() => setIsSmartTracking(!isSmartTracking)}
                        className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 px-1 ${isSmartTracking ? 'bg-green-500' : 'bg-gray-700'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isSmartTracking ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
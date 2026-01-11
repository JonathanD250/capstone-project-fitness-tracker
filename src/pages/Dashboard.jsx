import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Flame, Award, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSmartTracking, setIsSmartTracking] = useState(true);
  
  // Stats State
  const [stats, setStats] = useState({
    progress: 0,
    duration: 0,
    distance: 0,
    badge: { color: "text-gray-500", label: "No Badge", bg: "bg-gray-200" } // Default
  });

  const WEEKLY_GOAL = 12;

  useEffect(() => {
    // 1. Get History
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    const count = history.length;

    // 2. Calculate Basic Stats (Estimations)
    const calculatedDuration = count * 45; 
    const calculatedDistance = (count * 3.5).toFixed(1); 
    const percentage = Math.min(Math.round((count / WEEKLY_GOAL) * 100), 100);

    // 3. CALCULATE BADGE LEVEL
    // Logic: Total Workouts / 12 = Weeks Completed
    const weeksCompleted = count / WEEKLY_GOAL;
    
    let currentBadge = { color: "text-gray-400", label: "Beginner", bg: "bg-gray-100/10" };

    if (weeksCompleted >= 24) {
        currentBadge = { color: "text-cyan-400", label: "Platinum", bg: "bg-cyan-500/20" };
    } else if (weeksCompleted >= 16) {
        currentBadge = { color: "text-yellow-400", label: "Gold", bg: "bg-yellow-500/20" };
    } else if (weeksCompleted >= 8) {
        currentBadge = { color: "text-orange-400", label: "Bronze", bg: "bg-orange-500/20" };
    } else if (weeksCompleted >= 1) {
        currentBadge = { color: "text-gray-300", label: "Silver", bg: "bg-gray-400/20" };
    }

    setStats({
      progress: percentage,
      duration: calculatedDuration,
      distance: calculatedDistance,
      badge: currentBadge
    });
  }, []);

  // Gauge Math
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const semiCircle = circumference / 2; 
  const strokeDashoffset = semiCircle - (stats.progress / 100) * semiCircle;

  return (
    <div className="min-h-screen relative font-sans text-white pb-24">
      
      {/* Header */}
      <div className="relative z-10 p-6 pt-8 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
             <ArrowLeft size={24} className="text-white" />
        </button>
        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
             <Link to="/profile" className="block w-8 h-8 bg-gray-300 rounded-full border-2 border-white overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kweku" alt="User" />
             </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 mt-4">
        <h2 className="text-xl text-gray-200 mb-4 font-light">Today</h2>

        {/* --- GLASS CARD --- */}
        <div className="p-6 pt-8 min-h-screen">
            
            {/* Title & Icons Row (UPDATED TO MATCH HOME PAGE STYLES) */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-4">Fitness Status</h1>
                
                <div className="flex justify-center gap-4">
                    {/* Distance (Green) */}
                    <div className="bg-green-500/20 p-2.5 rounded-full text-green-500 shadow-lg border border-green-500/10">
                        <MapPin size={24} />
                    </div>
                    
                    {/* Time (Blue) */}
                    <div className="bg-blue-500/20 p-2.5 rounded-full text-blue-500 shadow-lg border border-blue-500/10">
                        <Clock size={24} />
                    </div>
                    
                    {/* Calories (Orange) */}
                    <div className="bg-orange-500/20 p-2.5 rounded-full text-orange-500 shadow-lg border border-orange-500/10">
                        <Flame size={24} fill="currentColor" />
                    </div>
                    
                    {/* BADGE ICON (Dynamic) */}
                    <div className={`${stats.badge.bg} p-2.5 rounded-full ${stats.badge.color} shadow-lg border border-white/5 transition-colors duration-500`}>
                        <Award size={24} fill="currentColor" />
                    </div>
                </div>
                
                {/* Badge Label Display */}
                <div className="mt-2 text-xs font-bold uppercase tracking-widest opacity-80">
                    Current Rank: <span className={stats.badge.color}>{stats.badge.label}</span>
                </div>
            </div>

            {/* Track Record Label */}
            <div className="flex items-center gap-2 mb-2 justify-center">
                <span className="font-bold text-lg">Track Record</span>
                <span className="bg-black/60 text-green-400 text-[10px] px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Auto mode
                </span>
            </div>

            {/* --- THE GAUGE --- */}
            <div className="relative h-56 flex items-center justify-center mb-2 -mt-4">
                 <svg className="w-72 h-72 transform -rotate-180 overflow-visible">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>

                    {/* Background Track */}
                    <circle 
                        cx="144" cy="144" r={radius} 
                        fill="none" 
                        stroke="#4b5563" 
                        strokeWidth="18" 
                        strokeDasharray="2 4" 
                        strokeOpacity="0.5"
                        style={{ strokeDasharray: `${semiCircle} ${circumference}` }} 
                    />
                    
                    {/* Progress Track */}
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
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 rounded-full p-2 text-blue-500"><Clock size={18} /></div>
                        <span className="font-medium text-gray-300">Duration</span>
                    </div>
                    <span className="text-white font-mono text-lg">{stats.duration} mins</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 rounded-full p-2 text-green-500"><MapPin size={18} /></div>
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
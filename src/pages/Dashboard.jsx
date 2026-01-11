import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Flame, Plus, Footprints } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    calories: 0,
    time: 0,
    completed: 0,
    latestWorkout: null
  });

  // GOAL: Let's say the goal is 10 workouts per week
  const WEEKLY_GOAL = 10;

  useEffect(() => {
    // 1. Fetch data from LocalStorage
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    
    // 2. Calculate Stats
    // Logic: We estimate 150 calories and 20 mins per logged workout
    const totalCalories = history.length * 150; 
    const totalTime = history.length * 20; 

    setStats({
      calories: totalCalories,
      time: totalTime,
      completed: history.length,
      latestWorkout: history[0] || null // Get the first item (newest)
    });
  }, []);

  // Helper to calculate progress percentage (capped at 100%)
  const progressPercent = Math.min((stats.completed / WEEKLY_GOAL) * 100, 100);
  const circumference = 2 * Math.PI * 24; // Circle math for SVG
  const dashOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">
          Hi <span className="text-green-500">Kweku</span>,
        </h1>
        <h2 className="text-2xl font-light italic text-gray-400">
          Welcome back!
        </h2>
      </header>

      {/* --- SECTION 1: MY HEALTH (Stats Row) --- */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-white">My Health</h3>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/5 flex justify-between items-center">
            {/* Stats Group */}
            <div className="flex space-x-6 text-center">
                
                {/* Calories */}
                <div className="flex flex-col items-center">
                   <div className="bg-orange-500/20 p-2 rounded-full mb-1 text-orange-500">
                     <Flame size={20} fill="currentColor" />
                   </div>
                   <span className="text-xs text-gray-400">kcal</span>
                   <span className="font-bold">{stats.calories}</span>
                </div>

                {/* Time */}
                <div className="flex flex-col items-center">
                   <div className="bg-blue-500/20 p-2 rounded-full mb-1 text-blue-500">
                     <Clock size={20} />
                   </div>
                   <span className="text-xs text-gray-400">mins</span>
                   <span className="font-bold">{stats.time}</span>
                </div>

                {/* Distance (Mocked for now as 'Workouts') */}
                <div className="flex flex-col items-center">
                   <div className="bg-green-500/20 p-2 rounded-full mb-1 text-green-500">
                     <MapPin size={20} />
                   </div>
                   <span className="text-xs text-gray-400">count</span>
                   <span className="font-bold">{stats.completed}</span>
                </div>

            </div>
            
            {/* Add Button */}
            <Link to="/add-workout" className="flex flex-col items-center justify-center text-xs text-white hover:opacity-80 transition">
                <div className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center mb-1 shadow-lg shadow-white/10">
                    <Plus size={28} strokeWidth={3} />
                </div>
            </Link>
        </div>
      </div>

      {/* --- SECTION 2: ACTIVE TASK (Latest Workout) --- */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-white">Active Task</h3>
        
        {stats.latestWorkout ? (
            // CARD: Shows actual data if available
            <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/5 shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <h4 className="text-2xl font-bold mb-1 text-white capitalize">
                            {stats.latestWorkout.exercise}
                        </h4>
                        <p className="text-xs text-gray-400 mb-6">
                           {stats.latestWorkout.sets} Sets • {stats.latestWorkout.reps} Reps
                        </p>
                        
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full w-fit">
                            <Flame size={14} className="text-orange-500" fill="currentColor" />
                            <span className="text-xs font-bold">~150 kcal</span>
                        </div>
                    </div>

                    {/* Progress Wheel (SVG based on sets goal) */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-green-500" 
                                    strokeDasharray={2 * Math.PI * 36}
                                    strokeDashoffset={0} /* Full circle for active task */
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            // EMPTY STATE: Shows if no workouts exist
            <div className="p-6 bg-white/5 rounded-3xl text-center border border-white/5 border-dashed">
                <p className="text-gray-400 mb-2">No active tasks</p>
                <Link to="/add-workout" className="text-green-500 text-sm font-bold underline">Start a workout</Link>
            </div>
        )}
      </div>

      {/* --- SECTION 3: PREVIOUS TASKS (Progress Wheel) --- */}
      <div>
         <h3 className="text-xl font-semibold mb-3 text-white">Previous Tasks</h3>
         
         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* The "Wheel" */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Ring */}
                        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-700" />
                        {/* Progress Ring */}
                        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-yellow-500" 
                             strokeDasharray={circumference}
                             strokeDashoffset={dashOffset}
                             strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {Math.round(progressPercent)}%
                    </div>
                </div>

                <div>
                    <p className="font-bold text-lg">{stats.completed} Completed</p>
                    <p className="text-xs text-gray-400">Weekly Goal: {WEEKLY_GOAL}</p>
                </div>
            </div>
            
            <div className="bg-white/10 p-2 rounded-full">
                <Footprints className="text-gray-400" size={20}/>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
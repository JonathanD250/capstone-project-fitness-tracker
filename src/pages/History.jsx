import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Trash2, 
  ArrowLeft, 
  Share2,
  Weight as WeightIcon
} from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    setHistory(savedWorkouts);
  }, []);

  // --- SHARE FUNCTION ---
  const shareWorkout = (workout) => {
    const text = `🏋️‍♂️ *Workout Crushed!* %0A%0A` +
                 `Exercise: *${workout.exercise}*%0A` +
                 `Details: ${workout.sets} Sets x ${workout.reps} Reps @ ${workout.weight || 0}kg%0A` +
                 `Date: ${workout.date}%0A%0A` +
                 `Logged via My Fitness Tracker 🚀`;
    
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const clearHistory = () => {
    if(window.confirm("Are you sure you want to delete all logs? This cannot be undone.")) {
      localStorage.removeItem('workoutHistory');
      setHistory([]);
    }
  };

  return (
    <div className="p-6 pb-24 min-h-screen text-white">
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8 mt-4">
        <Link to="/" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition text-white">
            <ArrowLeft size={24} />
        </Link>
        
        <div className="flex-1">
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-gray-400 text-xs">Your fitness journey</p>
        </div>

        {history.length > 0 && (
            <button 
                onClick={clearHistory}
                className="bg-red-500/10 text-red-500 p-3 rounded-full hover:bg-red-500/20 transition"
                title="Clear All"
            >
                <Trash2 size={20} />
            </button>
        )}
      </div>

      {/* --- THE LIST --- */}
      <div className="space-y-4">
        {history.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <Dumbbell size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No workouts logged yet.</p>
                <Link to="/add-workout" className="text-green-500 text-sm mt-2 block font-bold">Log one now</Link>
            </div>
        ) : (
            history.map((workout) => (
                <div key={workout.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg">
                    {/* Top Row: Exercise Name & Date */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white capitalize leading-tight max-w-[70%]">
                            {workout.exercise}
                        </h3>
                        <div className="flex items-center text-[10px] text-gray-400 gap-1 bg-black/20 px-2 py-1 rounded-lg">
                            <Calendar size={10} />
                            <span>{workout.date}</span>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Sets</span>
                            <span className="text-lg font-mono font-bold text-green-400">{workout.sets}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Reps</span>
                            <span className="text-lg font-mono font-bold text-blue-400">{workout.reps}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Weight</span>
                            <span className="text-lg font-mono font-bold text-orange-400">
                                {workout.weight || 0}<span className="text-xs ml-0.5">kg</span>
                            </span>
                        </div>
                        
                        {/* Right Side: Time & Share */}
                        <div className="flex flex-col ml-auto items-end gap-2">
                             <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Clock size={10} />
                                {workout.time}
                             </div>
                             <button 
                                onClick={() => shareWorkout(workout)}
                                className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full hover:bg-green-500 hover:text-white transition-all text-xs font-bold"
                             >
                                <Share2 size={14} />
                                Share
                             </button>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default History;
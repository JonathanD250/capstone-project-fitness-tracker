import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import { Calendar, Clock, Dumbbell, Trash2, ArrowLeft } from 'lucide-react'; // <--- Import ArrowLeft

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    setHistory(savedWorkouts);
  }, []);

  const clearHistory = () => {
    if(confirm("Are you sure you want to delete all logs?")) {
      localStorage.removeItem('workoutHistory');
      setHistory([]);
    }
  };

  return (
    <div className="p-6 pb-24 min-h-screen">
      
      {/* --- HEADER WITH BACK ARROW --- */}
      <div className="flex items-center gap-4 mb-8 mt-4">
        {/* Back Button */}
        <Link to="/" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition text-white">
            <ArrowLeft size={24} />
        </Link>
        
        <div className="flex-1">
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-gray-400 text-xs">Your fitness journey</p>
        </div>

        {/* Clear Button (Only shows if history exists) */}
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
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white capitalize">
                            {workout.exercise}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400 gap-1 bg-black/20 px-2 py-1 rounded-lg">
                            <Calendar size={12} />
                            <span>{workout.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Sets</span>
                            <span className="text-lg font-mono font-bold text-green-400">{workout.sets}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Reps</span>
                            <span className="text-lg font-mono font-bold text-blue-400">{workout.reps}</span>
                        </div>
                        <div className="flex flex-col ml-auto text-right">
                             <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12} />
                                {workout.time}
                             </div>
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
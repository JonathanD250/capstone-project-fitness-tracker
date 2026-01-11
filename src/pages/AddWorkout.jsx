import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader } from 'lucide-react';
import { fetchExercises } from '../services/wger';

const AddWorkout = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [exerciseId, setExerciseId] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      const rawData = await fetchExercises();

      // 1. First, attach the correct name to every item
      const processedData = rawData.map(ex => ({
        ...ex,
        finalName: getExerciseName(ex) 
      }));

      // 2. Filter out duplicates based on that name
      const uniqueExercises = [];
      const seenNames = new Set();

      processedData.forEach(ex => {
        // If we haven't seen this name before, add it to our list
        if (!seenNames.has(ex.finalName)) {
          seenNames.add(ex.finalName);
          uniqueExercises.push(ex);
        }
      });

      setExercises(uniqueExercises);
      setLoading(false);
    };
    loadExercises();
  }, []);

  // --- THE FINAL NAME FINDER ---
  const getExerciseName = (ex) => {
    // 1. Try finding a direct name
    if (ex.name) return ex.name;

    // 2. Try finding the name inside the category (some endpoints hide it here)
    if (ex.category && ex.category.name) return `${ex.category.name} Exercise`;

    // 3. Last Resort: Fallback
    return `Exercise #${ex.id}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedExercise = exercises.find(ex => ex.id === parseInt(exerciseId));
    const finalName = selectedExercise ? getExerciseName(selectedExercise) : 'Unknown Exercise';

    const newWorkout = {
      id: Date.now(),
      exercise: finalName,
      sets,
      reps,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const existingHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    localStorage.setItem('workoutHistory', JSON.stringify([newWorkout, ...existingHistory]));
    
    navigate('/history');
  };

  return (
    <div className="p-6 pt-8 min-h-screen">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/10 p-2 rounded-full mr-4 hover:bg-white/20">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Log Workout</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-gray-400 text-sm ml-1">Select Exercise</label>
          
          {loading ? (
             <div className="flex items-center text-green-500 gap-2 p-4 bg-white/5 rounded-2xl">
                <Loader className="animate-spin" size={20} /> Loading list...
            </div>
          ) : (
            <select 
              className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-green-500 transition appearance-none"
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              required
            >
              {/* Inside your select map loop */}
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.finalName} {/* We can use this directly now! */}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="space-y-2 w-1/2">
            <label className="text-gray-400 text-sm ml-1">Sets</label>
            <input 
              type="number" 
              placeholder="0"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="space-y-2 w-1/2">
            <label className="text-gray-400 text-sm ml-1">Reps</label>
            <input 
              type="number" 
              placeholder="0"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-green-500"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-black font-bold py-4 rounded-2xl mt-8 flex items-center justify-center gap-2">
          <Save size={20} /> Save Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
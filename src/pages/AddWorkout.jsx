import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchExercises } from '../services/wger';
import { ArrowLeft, Plus, Dumbbell, Hash, Weight as WeightIcon, Search, Loader } from 'lucide-react';

const AddWorkout = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [exerciseId, setExerciseId] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchExercises();
        
        // --- LOGIC TO REMOVE DUPLICATES AND FIX NAMES ---
        const uniqueExercises = [];
        const seenNames = new Set();
        
        data.forEach(ex => {
          // Fallback name logic
          let name = ex.name;
          if (!name && ex.category && ex.category.name) {
            name = `${ex.category.name} Exercise`;
          }

          if (name && !seenNames.has(name.toLowerCase())) {
            seenNames.add(name.toLowerCase());
            uniqueExercises.push({ ...ex, finalName: name });
          }
        });

        setExercises(uniqueExercises);
      } catch (error) {
        console.error("Failed to load exercises", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Play sound feedback
    const audio = new Audio('/success.mp3');
    audio.play().catch(() => {});

    // Find the selected exercise to get its name
    const selected = exercises.find(ex => ex.id === parseInt(exerciseId));
    const finalName = selected ? selected.finalName : "Unknown Exercise";

    const newEntry = {
      id: Date.now(),
      exercise: finalName,
      sets,
      reps,
      weight,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    localStorage.setItem('workoutHistory', JSON.stringify([newEntry, ...history]));
    
    // Smooth transition
    setTimeout(() => navigate('/history'), 300);
  };

  const filteredExercises = exercises.filter(ex => 
    ex.finalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pt-8 min-h-screen text-white">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
        <ArrowLeft size={24} />
      </button>

      <h1 className="text-3xl font-bold mb-2">Log Workout</h1>
      <p className="text-gray-400 mb-8">Select an exercise and enter your stats</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-green-500">
            <Loader className="animate-spin mb-4" size={32} />
            <p>Fetching Exercises...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Exercise Search & Select */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
              <Search size={16}/> Find Exercise
            </label>
            <input 
              type="text" 
              placeholder="Start typing (e.g. Bench Press)..." 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-green-500 outline-none transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              required
              className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-green-500"
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
            >
              <option value="" className="bg-slate-900">Choose from results ({filteredExercises.length})</option>
              {filteredExercises.map(ex => (
                <option key={ex.id} value={ex.id} className="bg-slate-900">
                  {ex.finalName}
                </option>
              ))}
            </select>
            {filteredExercises.length === 0 && searchTerm && (
               <p className="text-red-400 text-xs mt-1 italic">No exercises matched your search.</p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center gap-1">
                <Hash size={12}/> Sets
              </label>
              <input 
                type="number" required value={sets} onChange={(e)=>setSets(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-center text-xl font-bold focus:border-green-500 transition" 
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center gap-1">
                <Dumbbell size={12}/> Reps
              </label>
              <input 
                type="number" required value={reps} onChange={(e)=>setReps(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-center text-xl font-bold focus:border-green-500 transition" 
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest flex items-center gap-1">
                <WeightIcon size={12}/> Weight
              </label>
              <input 
                type="number" required value={weight} onChange={(e)=>setWeight(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-center text-xl font-bold focus:border-green-500 transition" 
                placeholder="kg"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
          >
            <Plus size={22}/> Save Workout Entry
          </button>
        </form>
      )}
    </div>
  );
};

export default AddWorkout;
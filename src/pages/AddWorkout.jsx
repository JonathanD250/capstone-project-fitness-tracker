import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const AddWorkout = () => {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // We will add the "Save" logic later
    console.log({ exercise, reps, sets });
    navigate('/history'); // Redirect to history after saving
  };

  return (
    <div className="p-6 pt-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/10 p-2 rounded-full mr-4">
          <ArrowLeft className="text-white" size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Log Workout</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Exercise Name Input */}
        <div className="space-y-2">
          <label className="text-gray-400 text-sm ml-1">Exercise Name</label>
          <input 
            type="text" 
            placeholder="e.g. Bench Press"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
            required
          />
        </div>

        <div className="flex space-x-4">
          {/* Sets Input */}
          <div className="space-y-2 w-1/2">
            <label className="text-gray-400 text-sm ml-1">Sets</label>
            <input 
              type="number" 
              placeholder="0"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>

          {/* Reps Input */}
          <div className="space-y-2 w-1/2">
            <label className="text-gray-400 text-sm ml-1">Reps</label>
            <input 
              type="number" 
              placeholder="0"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-green-500 transition"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-8 transition"
        >
          <Save size={20} />
          Save Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
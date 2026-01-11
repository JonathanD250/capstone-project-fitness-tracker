import { useState, useEffect } from 'react';
import { Search, PlayCircle, ExternalLink, Loader, ArrowRight } from 'lucide-react';
import { fetchExercises } from '../services/wger'; // Re-using your API service!

const VideoLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises();
      
      // Filter out duplicates (using the same logic we built before)
      const seenNames = new Set();
      const uniqueExercises = [];
      
      data.forEach(ex => {
        // Find the best name
        let name = ex.name;
        if (!name && ex.category && ex.category.name) name = `${ex.category.name} Exercise`;
        if (!name) name = `Exercise ${ex.id}`;

        if (!seenNames.has(name)) {
          seenNames.add(name);
          // Add the clean name to the object so we can use it easily
          uniqueExercises.push({ ...ex, finalName: name });
        }
      });

      setExercises(uniqueExercises);
      setLoading(false);
    };
    loadExercises();
  }, []);

  // Filter list based on search
  const filteredExercises = exercises.filter(ex => 
    ex.finalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pb-24 min-h-screen">
      
      {/* Header */}
      <div className="mt-6 mb-6">
        <h1 className="text-3xl font-bold">Video Library</h1>
        <p className="text-gray-400 text-sm">Learn how to perform exercises</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
        </div>
        <input 
            type="text" 
            placeholder="Search exercises (e.g. Squat)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 transition"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-green-500">
            <Loader className="animate-spin mb-4" size={32} />
            <p>Loading library...</p>
        </div>
      ) : (
        <div className="space-y-4">
            {filteredExercises.map((ex) => (
                // Video Card
                <div key={ex.id} className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 transition-all duration-300">
                    <div className="flex justify-between items-center">
                        
                        {/* Left: Icon & Name */}
                        <div className="flex items-center gap-4">
                            <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                <PlayCircle size={24} fill="currentColor" className="text-red-500/50" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
                                    {ex.finalName}
                                </h3>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <span>Tutorial</span>
                                    <span>•</span>
                                    <span className="capitalize">{ex.category?.name || 'General'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Action Button */}
                        <a 
                            href={`https://www.youtube.com/results?search_query=how+to+do+${ex.finalName}+exercise+form`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/10 p-3 rounded-full hover:bg-white text-white hover:text-black transition-colors"
                        >
                            <ExternalLink size={20} />
                        </a>

                    </div>
                </div>
            ))}

            {filteredExercises.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    No exercises found matching "{searchTerm}"
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
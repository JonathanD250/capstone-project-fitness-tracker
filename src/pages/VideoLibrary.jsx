import { useState, useEffect } from 'react';
import { Search, PlayCircle, Loader, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { fetchExercises } from '../services/wger'; 

const VideoLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to track which descriptions are expanded
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises();
      
      const uniqueExercises = [];
      const seenNames = new Set();
      
      data.forEach(ex => {
        let name = ex.name;
        if (!name && ex.category && ex.category.name) name = `${ex.category.name} Exercise`;
        
        // Clean up the description (remove HTML tags)
        let cleanDesc = "No description available.";
        if (ex.description) {
            const doc = new DOMParser().parseFromString(ex.description, 'text/html');
            cleanDesc = doc.body.textContent || "";
        }

        if (name && !seenNames.has(name)) {
          seenNames.add(name);
          uniqueExercises.push({ 
              ...ex, 
              finalName: name,
              cleanDescription: cleanDesc,
              // Use API image if available, else random fitness placeholder
              // WGER sometimes provides an 'images' array or 'image' string
              thumbnail: ex.images && ex.images.length > 0 ? ex.images[0].image : `https://source.unsplash.com/800x600/?gym,fitness,${name.split(' ')[0]}` 
          });
        }
      });

      setExercises(uniqueExercises);
      setLoading(false);
    };
    loadExercises();
  }, []);

  const filteredExercises = exercises.filter(ex => 
    ex.finalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
      setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 pb-24 min-h-screen">
      
      {/* Header */}
      <div className="mt-6 mb-6">
        <h1 className="text-3xl font-bold text-white">Video Library</h1>
        <p className="text-gray-400 text-sm">Watch and learn correct form</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
        </div>
        <input 
            type="text" 
            placeholder="Find a workout..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-green-500 transition placeholder-gray-500"
        />
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-green-500">
            <Loader className="animate-spin mb-4" size={32} />
            <p>Loading library...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExercises.map((ex) => (
                <div key={ex.id} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-lg flex flex-col">
                    
                    {/* 1. VIDEO THUMBNAIL AREA */}
                    <a 
                        href={`https://www.youtube.com/results?search_query=how+to+do+${ex.finalName}+exercise+form`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative h-48 w-full group cursor-pointer block bg-black"
                    >
                        {/* The Image */}
                        <img 
                            src={ex.thumbnail} 
                            // Fallback if unsplash fails
                            onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'}}
                            alt={ex.finalName} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 group-hover:scale-110 transition-transform">
                                <PlayCircle size={40} className="text-white fill-white/20" />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                            {ex.category?.name || 'Workout'}
                        </div>
                    </a>

                    {/* 2. DESCRIPTION & DETAILS */}
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white capitalize leading-tight">
                                {ex.finalName}
                            </h3>
                            {/* Icon to indicate extra images if available */}
                            {ex.images && ex.images.length > 1 && (
                                <ImageIcon size={16} className="text-gray-500" />
                            )}
                        </div>

                        {/* Collapsible Description */}
                        <div className="text-gray-400 text-sm mb-4 relative">
                            <p className={`leading-relaxed ${expandedId === ex.id ? '' : 'line-clamp-2'}`}>
                                {ex.cleanDescription}
                            </p>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                            <button 
                                onClick={() => toggleExpand(ex.id)}
                                className="text-xs font-bold text-green-400 flex items-center gap-1 hover:text-green-300 transition"
                            >
                                {expandedId === ex.id ? (
                                    <>Show Less <ChevronUp size={14}/></>
                                ) : (
                                    <>Read Description <ChevronDown size={14}/></>
                                )}
                            </button>

                            <a 
                                href={`https://www.youtube.com/results?search_query=how+to+do+${ex.finalName}+exercise+form`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition"
                            >
                                Watch Video
                            </a>
                        </div>
                    </div>

                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
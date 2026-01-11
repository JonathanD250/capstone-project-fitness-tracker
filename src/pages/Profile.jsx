import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Settings, Bell, Shield, LogOut, 
  Edit2, Droplets, Flame, Moon, Cloud, Heart, X, PlayCircle, ExternalLink 
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 

  // --- PERSONALIZED STATE ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userProfile');
    return savedUser ? JSON.parse(savedUser) : {
      name: "Kweku Darko", 
      email: "kwekud@gmail.com",   
      phone: "+233241645357",     
      age: "26",
      weight: "78",
      height: "180",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kweku" 
    };
  });

  // Function to handle saving changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      age: formData.get('age'),
      weight: formData.get('weight'),
      height: formData.get('height'),
    };

    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser)); // Save to storage
    setActiveModal(null); // Close modal
  };

  const eduContent = {
    water: {
      title: "Hydration 101",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
      color: "text-blue-500",
      description: "Water is the fuel your body needs. It regulates body temperature, keeps joints lubricated, and helps deliver nutrients to cells.",
      tips: ["Drink a glass right after waking up.", "Carry a reusable bottle everywhere.", "Eat water-rich foods like cucumber and watermelon."],
      videoQuery: "benefits of drinking water animation"
    },
    calories: {
      title: "Understanding Calories",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      color: "text-orange-500",
      description: "Calories are simply a measure of energy. Quality matters more than quantity! Focus on nutrient-dense foods to fuel your workouts.",
      tips: ["Prioritize protein for muscle repair.", "Don't fear healthy fats like avocado.", "Track to learn, not to obsess."],
      videoQuery: "what are calories explained"
    },
    sleep: {
      title: "The Power of Sleep",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=800&q=80",
      color: "text-indigo-500",
      description: "Sleep is when your muscles repair and your brain processes memories. Poor sleep can hinder fat loss and muscle growth.",
      tips: ["Stick to a consistent bedtime.", "Avoid screens 1 hour before bed.", "Keep your room cool and dark."],
      videoQuery: "science of sleep for athletes"
    },
    heart: {
      title: "Heart Health & Cardio",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      color: "text-red-500",
      description: "Your resting heart rate is a great indicator of fitness. A lower rate usually means your heart is more efficient at pumping blood.",
      tips: ["Aim for 150 mins of moderate cardio per week.", "Include HIIT for heart efficiency.", "Manage stress to lower BPM."],
      videoQuery: "understanding heart rate zones"
    }
  };

  const renderModalContent = () => {
    if (eduContent[activeModal]) {
      const content = eduContent[activeModal];
      return (
        <div className="space-y-4">
           <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 relative shadow-md">
              <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <h3 className="text-2xl font-bold text-white">{content.title}</h3>
              </div>
           </div>
           
           <p className="text-gray-600 text-sm leading-relaxed">{content.description}</p>
           
           <div className={`bg-gray-50 p-4 rounded-xl border-l-4 ${content.color.replace('text', 'border')}`}>
              <h4 className={`font-bold text-sm mb-2 ${content.color}`}>Pro Tips:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                 {content.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
           </div>

           <a 
              href={`https://www.youtube.com/results?search_query=${content.videoQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg"
           >
              <PlayCircle size={18} /> Watch Tutorial
           </a>
        </div>
      );
    }

    switch(activeModal) {
      case 'edit':
        return (
          // WRAP IN FORM TO HANDLE SUBMIT
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-black">Edit Profile</h3>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Personal Info</label>
                <input name="name" type="text" defaultValue={user.name} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Full Name" required/>
                <input name="email" type="email" defaultValue={user.email} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Email" required/>
                <input name="phone" type="tel" defaultValue={user.phone} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Phone" required/>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Body Stats</label>
                <div className="flex gap-2">
                    <div className="w-1/3">
                        <input name="age" type="number" defaultValue={user.age} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Age" />
                        <span className="text-[10px] text-gray-400 ml-1">Age</span>
                    </div>
                    <div className="w-1/3">
                        <input name="weight" type="number" defaultValue={user.weight} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Kg" />
                        <span className="text-[10px] text-gray-400 ml-1">Weight (kg)</span>
                    </div>
                    <div className="w-1/3">
                        <input name="height" type="number" defaultValue={user.height} className="w-full p-3 border rounded-xl text-black bg-gray-50" placeholder="Cm" />
                        <span className="text-[10px] text-gray-400 ml-1">Height (cm)</span>
                    </div>
                </div>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-4 hover:bg-green-600 transition">
                Save Changes
            </button>
          </form>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-black">Notifications</h3>
            {['Workout Reminders', 'Weekly Progress', 'New Features', 'Email Updates'].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-700">{item}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-500"/>
              </div>
            ))}
            <button className="w-full bg-gray-200 text-black py-3 rounded-xl font-bold mt-4" onClick={() => setActiveModal(null)}>Done</button>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-black">Privacy Policy</h3>
            <div className="h-40 overflow-y-auto text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
              <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data...</p>
              <p className="mt-2">1. Data Collection: We collect health data to improve tracking...</p>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-4" onClick={() => setActiveModal(null)}>I Understand</button>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-black">App Settings</h3>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Dark Mode</span>
              <span className="text-green-500 font-bold">On</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-700">Units</span>
              <span className="text-gray-500">Metric (kg/cm)</span>
            </div>
             <button className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-bold mt-4 flex items-center justify-center gap-2">
               <LogOut size={18} /> Sign Out
             </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 pb-24 min-h-screen relative font-sans">
      
      {/* 1. Header with Back Button & SETTINGS DROPDOWN */}
      <div className="flex justify-between items-center mt-6 mb-4 relative z-50">
        <button onClick={() => navigate(-1)} className="text-white hover:opacity-80 transition">
             <ArrowLeft size={32} />
        </button>
        
        <div className="relative">
             <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`bg-white/10 p-2 rounded-full hover:bg-white/20 transition ${isDropdownOpen ? 'bg-white/30' : ''}`}
             >
                <div className="w-6 h-6 flex items-center justify-center">
                     <Settings size={20} className="text-white" />
                </div>
             </button>

             {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {[
                        { id: 'edit', label: 'Edit Profile', icon: <Edit2 size={16} /> },
                        { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
                        { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={16} /> },
                        { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => {
                                setActiveModal(item.id);
                                setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-5 py-4 text-white hover:bg-white/10 flex items-center gap-3 border-b border-white/5 last:border-0"
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
             )}
        </div>
      </div>

      {/* 2. User Profile Info */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="relative mb-3">
             <div className="w-28 h-28 rounded-full border-2 border-white p-1 overflow-hidden">
                <img src={user.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
             </div>
             {/* Edit Button also opens modal now */}
             <button 
                onClick={() => setActiveModal('edit')}
                className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-black text-black hover:scale-110 transition cursor-pointer"
             >
                <Edit2 size={14} />
             </button>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
        <p className="text-gray-300 text-sm font-light">{user.email}</p>
        <p className="text-gray-300 text-sm font-light">{user.phone}</p>
        
        {/* PHYSICAL STATS DISPLAY */}
        <div className="flex gap-4 mt-4">
             <div className="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm">
                 <span className="block font-bold text-white">{user.age}</span>
                 <span className="text-[10px] text-gray-400 uppercase">Age</span>
             </div>
             <div className="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm">
                 <span className="block font-bold text-white">{user.weight}kg</span>
                 <span className="text-[10px] text-gray-400 uppercase">Weight</span>
             </div>
             <div className="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm">
                 <span className="block font-bold text-white">{user.height}cm</span>
                 <span className="text-[10px] text-gray-400 uppercase">Height</span>
             </div>
        </div>
      </div>

      {/* 3. The Interactive Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
          
          {/* CARD 1: WATER (Clickable) */}
          <button 
             onClick={() => setActiveModal('water')}
             className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between h-40 text-left hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group"
          >
             <div className="flex items-center gap-2 mb-2">
                 <Droplets className="text-blue-400 group-hover:text-blue-300 transition-colors" size={20} fill="currentColor" />
                 <span className="text-white font-medium">Water</span>
                 <ExternalLink size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
             </div>
             <div>
                 <p className="text-2xl font-bold text-white">5.2 Liters</p>
                 <p className="text-gray-400 text-xs">Per Day</p>
             </div>
             <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div className="bg-blue-400 w-[80%] h-full rounded-full"></div>
             </div>
          </button>

          {/* CARD 2: CALORIES (Clickable) */}
          <button 
             onClick={() => setActiveModal('calories')}
             className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between h-40 relative overflow-hidden text-left hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group"
          >
             <div className="flex items-center gap-2 z-10">
                 <Flame className="text-orange-500 group-hover:text-orange-300 transition-colors" size={20} fill="currentColor" />
                 <span className="text-white font-medium">Calories</span>
                 <ExternalLink size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
             </div>
             <div className="absolute bottom-3 right-3 w-20 h-20 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                     <circle cx="40" cy="40" r="34" stroke="gray" strokeWidth="6" fill="transparent" strokeOpacity="0.3" />
                     <circle cx="40" cy="40" r="34" stroke="#22c55e" strokeWidth="6" fill="transparent" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * 0.25} strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] leading-tight">
                     <span className="font-bold text-white text-sm">10124</span>
                     <span className="text-gray-400">K Cal</span>
                 </div>
             </div>
          </button>

          {/* CARD 3: SLEEP (Clickable) */}
          <button 
             onClick={() => setActiveModal('sleep')}
             className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between h-44 relative text-left hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group"
          >
             <div className="flex items-center gap-2 z-10">
                 <Moon className="text-white group-hover:text-indigo-300 transition-colors" size={20} fill="currentColor" />
                 <span className="text-white font-medium">Sleep</span>
                 <ExternalLink size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
             </div>
             <div className="absolute bottom-4 right-4">
                 <div className="relative w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <Moon className="text-yellow-400 absolute top-2 right-4" size={20} fill="currentColor" />
                    <Cloud className="text-indigo-300 absolute bottom-3 left-2" size={24} fill="currentColor" />
                 </div>
             </div>
             <div className="z-10 mt-auto">
                 <p className="text-2xl font-bold text-white">8 Hours</p>
                 <p className="text-gray-400 text-xs">Per Day</p>
             </div>
          </button>

          {/* CARD 4: HEART (Clickable) */}
          <button 
             onClick={() => setActiveModal('heart')}
             className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 flex flex-col justify-between h-44 text-left hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer group"
          >
             <div className="flex items-center gap-2">
                 <Heart className="text-red-500 group-hover:text-red-300 transition-colors" size={20} fill="currentColor" />
                 <span className="text-white font-medium">Heart</span>
                 <ExternalLink size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
             </div>
             <div className="w-full h-12 flex items-center my-2">
                <svg viewBox="0 0 100 20" className="w-full h-full stroke-green-500 stroke-2 fill-none">
                    <path d="M0,10 L10,10 L15,0 L20,20 L25,10 L35,10 L40,0 L45,20 L50,10 L60,10 L65,5 L70,15 L75,10 L100,10" />
                </svg>
             </div>
             <div>
                 <p className="text-2xl font-bold text-white">72</p>
                 <p className="text-gray-400 text-xs">BPM</p>
             </div>
          </button>

      </div>

      {/* --- POPUP MODAL OVERLAY --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                <button 
                    onClick={() => setActiveModal(null)}
                    className="absolute top-4 right-4 p-2 bg-gray-100/50 backdrop-blur-md rounded-full hover:bg-gray-200 text-black transition z-10"
                >
                    <X size={20} />
                </button>
                {renderModalContent()}
            </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
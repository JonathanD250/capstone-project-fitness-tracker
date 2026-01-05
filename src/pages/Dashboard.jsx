import { Link } from 'react-router-dom';
import { MapPin, Clock, Flame, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">
          Hi <span className="text-green-500">Kweku</span>,
        </h1>
        <h2 className="text-2xl font-light italic text-gray-400">
          Welcome!
        </h2>
      </header>

      {/* Section: My Health */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-white">My Health</h3>
        
        {/* Weekly Stats Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/5 flex justify-between items-center">
            <div className="flex space-x-4">
                {/* Icons */}
                <div className="bg-white/10 p-2 rounded-full"><MapPin size={20} className="text-white"/></div>
                <div className="bg-white/10 p-2 rounded-full"><Clock size={20} className="text-white"/></div>
                <div className="bg-white/10 p-2 rounded-full"><Flame size={20} className="text-white"/></div>
            </div>
            
            {/* Add New Task Button - NOW A LINK */}
            <Link to="/add-workout" className="flex flex-col items-center justify-center text-xs text-white hover:opacity-80 transition">
                <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center mb-1">
                    <Plus size={24} strokeWidth={3} />
                </div>
                <span>Add Task</span>
            </Link>
        </div>
      </div>

      {/* Section: Active Task */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-white">Active Task</h3>
        
        {/* Running Card */}
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/5 shadow-lg overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h4 className="text-2xl font-bold mb-1">Running</h4>
                    <p className="text-xs text-gray-400 mb-6">3.8km • Outdoor • Walk</p>
                    
                    <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center">
                        <Flame size={16} className="text-white" />
                    </div>
                </div>

                {/* Circular Progress (Visual Mockup) */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-700 flex items-center justify-center border-t-yellow-500 border-r-yellow-500 rotate-45">
                        <div className="text-center -rotate-45">
                            <span className="block text-xs text-gray-400">Progress</span>
                            <span className="block text-sm font-bold">50%</span>
                        </div>
                    </div>
                    <div className="mt-2 bg-white px-3 py-1 rounded-full text-black text-xs font-bold">
                        Goal 8000
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Section: Previous Tasks */}
      <div>
         <h3 className="text-xl font-semibold mb-3 text-white">Previous Tasks</h3>
         
         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/5 flex items-center">
            <div className="w-12 h-12 rounded-full border-4 border-yellow-500 flex items-center justify-center text-xs font-bold mr-4">
                50%
            </div>
            <div>
                <p className="text-sm">12 tasks completed</p>
                <p className="text-xs text-gray-400">15/30</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
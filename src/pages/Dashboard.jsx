const Dashboard = () => {
  return (
    <div className="p-6">
      <header className="mt-8 mb-8">
        <h1 className="text-3xl font-bold">
          Hi <span className="text-green-500">Kweku</span>,
        </h1>
        <h2 className="text-2xl font-light italic text-gray-300">
          Welcome!
        </h2>
      </header>

      {/* Weekly Stats Widget */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Weekly Stats</h3>
          <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">+</button>
        </div>
        <div className="flex justify-between text-gray-300">
           {/* Placeholders for icons */}
           <span>🔥 Calories</span>
           <span>⏱️ Time</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
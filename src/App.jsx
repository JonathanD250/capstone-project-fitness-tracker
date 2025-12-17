import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24 font-sans relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-slate-900/90 z-0 pointer-events-none"></div>
      <div className="relative z-10 p-6">
        <header className="mt-8 mb-8">
          <h1 className="text-3xl font-bold">
          Hi <span className="text-green-500">Kweku</span>
          </h1>
          <h2 className="text-2xl font-light italic text-gray-300">
            Welcome!
          </h2>
        </header>
      <div clasName="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">My Health</h3>
        <p className="text-gray-300">Widgets coming soon...</p>
      </div>
      </div>
    </div>
  );
}

export default App;
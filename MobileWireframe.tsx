import { useState, useEffect } from 'react';
import { Home, Activity, BarChart3, User } from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { StatsScreen } from './screens/StatsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AppProvider, useApp } from './AppContext';

type Screen = 'home' | 'workout' | 'stats' | 'profile';

function MobileWireframeContent() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const { darkMode } = useApp();

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr}`;
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onStartWorkout={() => setActiveScreen('workout')} onViewStats={() => setActiveScreen('stats')} />;
      case 'workout':
        return <WorkoutScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onStartWorkout={() => setActiveScreen('workout')} onViewStats={() => setActiveScreen('stats')} />;
    }
  };

  return (
    <div className="relative">
      {/* Mobile device frame */}
      <div className={`w-[375px] h-[812px] rounded-[40px] shadow-2xl border-8 overflow-hidden flex flex-col transition-colors ${
        darkMode 
          ? 'bg-slate-900 border-slate-950' 
          : 'bg-white border-slate-800'
      }`}>
        {/* Status bar */}
        <div className={`h-11 flex items-center justify-between px-6 pt-2 flex-shrink-0 transition-colors ${
          darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
        }`}>
          <span>{formatTime(currentTime)}</span>
          <div className="flex gap-1">
            <div className={`w-4 h-3 border rounded-sm ${darkMode ? 'border-white' : 'border-slate-800'}`} />
            <div className={`w-4 h-3 border rounded-sm ${darkMode ? 'border-white' : 'border-slate-800'}`} />
            <div className={`w-4 h-3 border rounded-sm ${darkMode ? 'border-white' : 'border-slate-800'}`} />
          </div>
        </div>

        {/* Screen content */}
        <div className={`flex-1 overflow-y-auto transition-colors ${
          darkMode ? 'bg-slate-800' : 'bg-slate-50'
        }`}>
          {renderScreen()}
        </div>

        {/* Bottom navigation */}
        <div className={`h-20 border-t flex items-center justify-around px-4 pb-2 flex-shrink-0 transition-colors ${
          darkMode 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeScreen === 'home' 
                ? 'text-blue-600' 
                : darkMode ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            <Home className="size-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveScreen('workout')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeScreen === 'workout' 
                ? 'text-blue-600' 
                : darkMode ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            <Activity className="size-6" />
            <span className="text-xs">Workout</span>
          </button>
          <button
            onClick={() => setActiveScreen('stats')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeScreen === 'stats' 
                ? 'text-blue-600' 
                : darkMode ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="size-6" />
            <span className="text-xs">Stats</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeScreen === 'profile' 
                ? 'text-blue-600' 
                : darkMode ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            <User className="size-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Device notch */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 rounded-b-3xl ${
        darkMode ? 'bg-slate-950' : 'bg-slate-800'
      }`} />
    </div>
  );
}

export function MobileWireframe() {
  return (
    <AppProvider>
      <MobileWireframeContent />
    </AppProvider>
  );
}

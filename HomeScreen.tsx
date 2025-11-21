import { Bluetooth, Battery, Heart, Footprints, Flame, Droplet, WifiOff } from 'lucide-react';
import { useApp } from '../AppContext';
import { useState, useEffect } from 'react';

interface HomeScreenProps {
  onStartWorkout: () => void;
  onViewStats: () => void;
}

export function HomeScreen({ onStartWorkout, onViewStats }: HomeScreenProps) {
  const { isDeviceConnected, deviceBattery, darkMode } = useApp();
  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(8547);
  const [calories, setCalories] = useState(420);

  // Simulate real-time updates
  useEffect(() => {
    if (!isDeviceConnected) return;

    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(60, Math.min(100, prev + Math.floor(Math.random() * 7) - 3)));
      setSteps(prev => prev + Math.floor(Math.random() * 3));
      setCalories(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [isDeviceConnected]);

  return (
    <div className="p-6 space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={darkMode ? 'text-white' : 'text-slate-800'}>Good Morning, Athlete</h1>
        <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Here's your activity today</p>
      </div>

      {/* Device connection status */}
      <div className={`rounded-2xl p-4 border-2 transition-all ${
        isDeviceConnected 
          ? darkMode 
            ? 'bg-slate-700 border-slate-600' 
            : 'bg-white border-slate-200'
          : darkMode
            ? 'bg-orange-900 border-orange-700'
            : 'bg-orange-50 border-orange-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDeviceConnected 
                ? darkMode ? 'bg-blue-900' : 'bg-blue-100' 
                : darkMode ? 'bg-orange-900' : 'bg-orange-100'
            }`}>
              {isDeviceConnected ? (
                <Bluetooth className="size-6 text-blue-600" />
              ) : (
                <WifiOff className="size-6 text-orange-600" />
              )}
            </div>
            <div>
              <p className={darkMode ? 'text-white' : 'text-slate-800'}>SportBand Pro</p>
              <p className={isDeviceConnected ? 'text-green-600' : 'text-orange-600'}>
                {isDeviceConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
          {isDeviceConnected && (
            <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Battery className="size-5" />
              <span>{deviceBattery}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Real-time metrics */}
      <div>
        <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Real-Time Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate */}
          <div className={`rounded-2xl p-4 border-2 space-y-2 hover:shadow-lg transition-shadow ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-red-900' : 'bg-red-100'
            }`}>
              <Heart className="size-5 text-red-600" />
            </div>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Heart Rate</p>
            <p className={`animate-pulse ${darkMode ? 'text-white' : 'text-slate-800'}`}>{heartRate} bpm</p>
          </div>

          {/* Steps */}
          <div className={`rounded-2xl p-4 border-2 space-y-2 hover:shadow-lg transition-shadow ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <Footprints className="size-5 text-green-600" />
            </div>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Steps</p>
            <p className={darkMode ? 'text-white' : 'text-slate-800'}>{steps.toLocaleString()}</p>
          </div>

          {/* Calories */}
          <div className={`rounded-2xl p-4 border-2 space-y-2 hover:shadow-lg transition-shadow ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-orange-900' : 'bg-orange-100'
            }`}>
              <Flame className="size-5 text-orange-600" />
            </div>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Calories</p>
            <p className={darkMode ? 'text-white' : 'text-slate-800'}>{calories} kcal</p>
          </div>

          {/* Hydration */}
          <div className={`rounded-2xl p-4 border-2 space-y-2 hover:shadow-lg transition-shadow ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Droplet className="size-5 text-blue-600" />
            </div>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Hydration</p>
            <p className={darkMode ? 'text-white' : 'text-slate-800'}>1.2 L</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Quick Actions</h2>
        <div className="space-y-3">
          <button 
            onClick={onStartWorkout}
            className="w-full bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700 transition-colors active:scale-95"
          >
            Start New Workout
          </button>
          <button 
            onClick={onViewStats}
            className={`w-full rounded-xl p-4 border-2 transition-colors active:scale-95 ${
              darkMode 
                ? 'bg-slate-700 text-white border-slate-600 hover:bg-slate-600' 
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            View Weekly Summary
          </button>
        </div>
      </div>
    </div>
  );
}
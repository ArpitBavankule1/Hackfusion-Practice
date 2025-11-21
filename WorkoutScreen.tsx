import { Play, Pause, Square, Timer, Heart, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';

export function WorkoutScreen() {
  const { darkMode } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
        // Simulate metrics increase
        setHeartRate(prev => Math.min(180, prev + Math.floor(Math.random() * 3)));
        setDistance(prev => +(prev + 0.01).toFixed(2));
        setCalories(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setHeartRate(72);
    setDistance(0);
    setCalories(0);
  };

  const intensity = heartRate > 140 ? 'high' : heartRate > 120 ? 'medium' : 'low';
  const intensityPercentage = Math.min((heartRate / 180) * 100, 100);

  return (
    <div className="p-6 space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={darkMode ? 'text-white' : 'text-slate-800'}>Active Workout</h1>
        <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Track your performance in real-time</p>
      </div>

      {/* Large timer display */}
      <div className={`rounded-2xl p-8 border-2 text-center space-y-4 shadow-lg ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          darkMode ? 'bg-blue-900' : 'bg-blue-100'
        }`}>
          <Timer className="size-8 text-blue-600" />
        </div>
        <div>
          <div className={`${darkMode ? 'text-white' : 'text-slate-800'}`} style={{ fontSize: '48px', lineHeight: '1' }}>
            {formatTime(seconds)}
          </div>
          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Duration</p>
        </div>
      </div>

      {/* Live metrics during workout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Heart Rate Zone */}
        <div className={`rounded-2xl p-4 border-2 space-y-2 shadow-md ${
          darkMode ? 'bg-slate-700 border-red-900' : 'bg-white border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-red-600" />
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Heart Rate</p>
          </div>
          <p className={`animate-pulse ${darkMode ? 'text-white' : 'text-slate-800'}`}>{heartRate} bpm</p>
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            darkMode ? 'bg-slate-600' : 'bg-slate-100'
          }`}>
            <div 
              className="h-full bg-red-600 rounded-full transition-all duration-300" 
              style={{ width: `${(heartRate / 180) * 100}%` }}
            />
          </div>
          <p className={`capitalize ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{intensity} Zone</p>
        </div>

        {/* Intensity */}
        <div className={`rounded-2xl p-4 border-2 space-y-2 shadow-md ${
          darkMode ? 'bg-slate-700 border-orange-900' : 'bg-white border-orange-200'
        }`}>
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-orange-600" />
            <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Intensity</p>
          </div>
          <p className={`capitalize ${darkMode ? 'text-white' : 'text-slate-800'}`}>{intensity}</p>
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            darkMode ? 'bg-slate-600' : 'bg-slate-100'
          }`}>
            <div 
              className="h-full bg-orange-600 rounded-full transition-all duration-300" 
              style={{ width: `${intensityPercentage}%` }}
            />
          </div>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{Math.round(intensityPercentage)}%</p>
        </div>
      </div>

      {/* Current stats */}
      <div className={`rounded-2xl p-4 border-2 shadow-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Current Session</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Distance</span>
            <span className={darkMode ? 'text-white' : 'text-slate-800'}>{distance.toFixed(2)} km</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Calories Burned</span>
            <span className={darkMode ? 'text-white' : 'text-slate-800'}>{calories} kcal</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Avg Pace</span>
            <span className={darkMode ? 'text-white' : 'text-slate-800'}>
              {distance > 0 ? ((seconds / 60) / distance).toFixed(2) : '0.00'} min/km
            </span>
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 rounded-xl p-4 flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isActive
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="size-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="size-5" />
              {seconds > 0 ? 'Resume' : 'Start'}
            </>
          )}
        </button>
        <button 
          onClick={handleReset}
          className={`w-16 rounded-xl border-2 flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95 ${
            darkMode ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' : 'bg-white border-slate-200'
          }`}
        >
          <Square className={`size-5 ${darkMode ? 'text-white' : 'text-slate-800'}`} />
        </button>
      </div>
    </div>
  );
}
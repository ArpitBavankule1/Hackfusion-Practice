import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';

const weekHeartRateData = [
  { time: '0m', bpm: 72 },
  { time: '5m', bpm: 85 },
  { time: '10m', bpm: 120 },
  { time: '15m', bpm: 145 },
  { time: '20m', bpm: 138 },
  { time: '25m', bpm: 150 },
  { time: '30m', bpm: 95 },
];

const monthHeartRateData = [
  { time: 'W1', bpm: 78 },
  { time: 'W2', bpm: 92 },
  { time: 'W3', bpm: 105 },
  { time: 'W4', bpm: 118 },
];

const yearHeartRateData = [
  { time: 'Jan', bpm: 75 },
  { time: 'Feb', bpm: 82 },
  { time: 'Mar', bpm: 88 },
  { time: 'Apr', bpm: 95 },
  { time: 'May', bpm: 102 },
  { time: 'Jun', bpm: 108 },
  { time: 'Jul', bpm: 115 },
  { time: 'Aug', bpm: 120 },
  { time: 'Sep', bpm: 118 },
  { time: 'Oct', bpm: 125 },
  { time: 'Nov', bpm: 122 },
  { time: 'Dec', bpm: 128 },
];

const weeklyStepsData = [
  { day: 'Mon', steps: 8500 },
  { day: 'Tue', steps: 9200 },
  { day: 'Wed', steps: 7800 },
  { day: 'Thu', steps: 10500 },
  { day: 'Fri', steps: 8900 },
  { day: 'Sat', steps: 12000 },
  { day: 'Sun', steps: 6500 },
];

const monthlyStepsData = [
  { day: 'W1', steps: 62500 },
  { day: 'W2', steps: 58900 },
  { day: 'W3', steps: 71200 },
  { day: 'W4', steps: 65800 },
];

const yearlyStepsData = [
  { day: 'Jan', steps: 245000 },
  { day: 'Feb', steps: 268000 },
  { day: 'Mar', steps: 289000 },
  { day: 'Apr', steps: 312000 },
  { day: 'May', steps: 295000 },
  { day: 'Jun', steps: 325000 },
  { day: 'Jul', steps: 342000 },
  { day: 'Aug', steps: 338000 },
  { day: 'Sep', steps: 355000 },
  { day: 'Oct', steps: 368000 },
  { day: 'Nov', steps: 351000 },
  { day: 'Dec', steps: 375000 },
];

export function StatsScreen() {
  const { darkMode } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [currentWeek, setCurrentWeek] = useState(0);

  const getHeartRateData = () => {
    switch (selectedPeriod) {
      case 'week':
        return weekHeartRateData;
      case 'month':
        return monthHeartRateData;
      case 'year':
        return yearHeartRateData;
      default:
        return weekHeartRateData;
    }
  };

  const getStepsData = () => {
    switch (selectedPeriod) {
      case 'week':
        return weeklyStepsData;
      case 'month':
        return monthlyStepsData;
      case 'year':
        return yearlyStepsData;
      default:
        return weeklyStepsData;
    }
  };

  const getStatsForPeriod = () => {
    switch (selectedPeriod) {
      case 'week':
        return { workouts: 24, hours: 18.5, streak: '7d' };
      case 'month':
        return { workouts: 98, hours: 72.3, streak: '28d' };
      case 'year':
        return { workouts: 1152, hours: 842.5, streak: '365d' };
      default:
        return { workouts: 24, hours: 18.5, streak: '7d' };
    }
  };

  const stats = getStatsForPeriod();
  const heartRateData = getHeartRateData();
  const stepsData = getStepsData();

  return (
    <div className="p-6 space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={darkMode ? 'text-white' : 'text-slate-800'}>Analytics</h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Your performance insights</p>
        </div>
        <button className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:bg-slate-50 transition-colors ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <Calendar className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
        </button>
      </div>

      {/* Period selector */}
      <div className={`rounded-xl p-2 border-2 flex gap-2 shadow-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            selectedPeriod === 'week'
              ? 'bg-blue-600 text-white'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-600' 
                : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            selectedPeriod === 'month'
              ? 'bg-blue-600 text-white'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-600' 
                : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setSelectedPeriod('year')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            selectedPeriod === 'year'
              ? 'bg-blue-600 text-white'
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-600' 
                : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Year
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`rounded-xl p-3 border-2 text-center shadow-md hover:shadow-lg transition-shadow ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <p className={`mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Workouts</p>
          <p className={darkMode ? 'text-white' : 'text-slate-800'}>{stats.workouts}</p>
        </div>
        <div className={`rounded-xl p-3 border-2 text-center shadow-md hover:shadow-lg transition-shadow ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <p className={`mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hours</p>
          <p className={darkMode ? 'text-white' : 'text-slate-800'}>{stats.hours}</p>
        </div>
        <div className={`rounded-xl p-3 border-2 text-center shadow-md hover:shadow-lg transition-shadow ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <p className={`mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Streak</p>
          <p className={darkMode ? 'text-white' : 'text-slate-800'}>{stats.streak}</p>
        </div>
      </div>

      {/* Heart rate chart */}
      <div className={`rounded-2xl p-4 border-2 space-y-3 shadow-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={darkMode ? 'text-white' : 'text-slate-800'}>Heart Rate Trend</h2>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="size-4" />
            <span>+5%</span>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#e2e8f0'} />
              <XAxis dataKey="time" stroke={darkMode ? '#94a3b8' : '#64748b'} style={{ fontSize: '12px' }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} style={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="bpm" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className={`text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {selectedPeriod === 'week' ? 'Last workout session' : selectedPeriod === 'month' ? 'This month' : 'This year'}
        </p>
      </div>

      {/* Steps chart */}
      <div className={`rounded-2xl p-4 border-2 space-y-3 shadow-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={darkMode ? 'text-white' : 'text-slate-800'}>
            {selectedPeriod === 'week' ? 'Weekly' : selectedPeriod === 'month' ? 'Monthly' : 'Yearly'} Steps
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <ChevronLeft className={`size-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              disabled={currentWeek >= 0}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <ChevronRight className={`size-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stepsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#e2e8f0'} />
              <XAxis dataKey="day" stroke={darkMode ? '#94a3b8' : '#64748b'} style={{ fontSize: '12px' }} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} style={{ fontSize: '12px' }} />
              <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`flex justify-between items-center pt-2 border-t-2 ${
          darkMode ? 'border-slate-600' : 'border-slate-100'
        }`}>
          <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Daily Average</span>
          <span className={darkMode ? 'text-white' : 'text-slate-800'}>
            {selectedPeriod === 'week' ? '9,057' : selectedPeriod === 'month' ? '9,350' : '9,842'} steps
          </span>
        </div>
      </div>

      {/* Goals progress */}
      <div className={`rounded-2xl p-4 border-2 space-y-3 shadow-md ${
        darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
      }`}>
        <h2 className={darkMode ? 'text-white' : 'text-slate-800'}>
          {selectedPeriod === 'week' ? 'Weekly' : selectedPeriod === 'month' ? 'Monthly' : 'Yearly'} Goals
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Active Minutes</span>
              <span className={darkMode ? 'text-white' : 'text-slate-800'}>
                {selectedPeriod === 'week' ? '180/210' : selectedPeriod === 'month' ? '720/840' : '8640/10080'} min
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              darkMode ? 'bg-slate-600' : 'bg-slate-100'
            }`}>
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Calories Burned</span>
              <span className={darkMode ? 'text-white' : 'text-slate-800'}>
                {selectedPeriod === 'week' ? '2,840/3,000' : selectedPeriod === 'month' ? '11,360/12,000' : '136,320/144,000'} kcal
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              darkMode ? 'bg-slate-600' : 'bg-slate-100'
            }`}>
              <div className="h-full bg-orange-600 rounded-full transition-all duration-500" style={{ width: '94%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

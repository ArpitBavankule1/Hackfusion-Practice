import {
  ChevronRight,
  Bell,
  Moon,
  Bluetooth,
  Award,
  Target,
  HelpCircle,
  X,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';

type ModalType = 'notifications' | 'goals' | 'achievements' | 'device' | 'help' | 'edit' | null;

export function ProfileScreen() {
  const { darkMode, setDarkMode, notificationsEnabled, setNotificationsEnabled, isDeviceConnected, setIsDeviceConnected, deviceBattery } = useApp();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: 'Arpit Bavankule',
    email: 'arpitbavankule03@gmail.com',
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleSaveProfile = () => {
    setUserInfo(editedInfo);
    setActiveModal(null);
  };

  const handleToggleDevice = () => {
    setIsDeviceConnected(!isDeviceConnected);
  };

  return (
    <>
      <div className="p-6 space-y-6 pb-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className={darkMode ? 'text-white' : 'text-slate-800'}>Profile</h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Manage your account and devices</p>
        </div>

        {/* User info */}
        <div className={`rounded-2xl p-4 border-2 shadow-md hover:shadow-lg transition-shadow ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className={darkMode ? 'text-white' : 'text-slate-800'}>{userInfo.name}</p>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{userInfo.email}</p>
            </div>
            <button 
              onClick={() => {
                setEditedInfo(userInfo);
                setActiveModal('edit');
              }}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Stats summary */}
        <div className={`rounded-2xl p-4 border-2 shadow-md ${
          darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Monthly Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className={darkMode ? 'text-white' : 'text-slate-800'}>47</p>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Workouts</p>
            </div>
            <div className="space-y-1">
              <p className={darkMode ? 'text-white' : 'text-slate-800'}>32.5h</p>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Active Time</p>
            </div>
            <div className="space-y-1">
              <p className={darkMode ? 'text-white' : 'text-slate-800'}>285k</p>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Steps</p>
            </div>
          </div>
        </div>

        {/* Connected devices */}
        <div>
          <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Connected Devices</h2>
          <div className={`rounded-2xl border-2 overflow-hidden shadow-md ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'
          }`}>
            <button 
              onClick={() => setActiveModal('device')}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDeviceConnected 
                    ? darkMode ? 'bg-blue-900' : 'bg-blue-100'
                    : darkMode ? 'bg-slate-600' : 'bg-slate-100'
                }`}>
                  <Bluetooth className={`size-5 ${isDeviceConnected ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <div className="text-left">
                  <p className={darkMode ? 'text-white' : 'text-slate-800'}>SportBand Pro</p>
                  <p className={isDeviceConnected ? 'text-green-600' : darkMode ? 'text-slate-400' : 'text-slate-500'}>
                    {isDeviceConnected ? `Connected • ${deviceBattery}% battery` : 'Disconnected'}
                  </p>
                </div>
              </div>
              <ChevronRight className={`size-5 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        {/* Settings menu */}
        <div>
          <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Settings</h2>
          <div className={`rounded-2xl border-2 overflow-hidden divide-y-2 shadow-md ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 divide-slate-600' 
              : 'bg-white border-slate-200 divide-slate-200'
          }`}>
            <button 
              onClick={() => setActiveModal('notifications')}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className={darkMode ? 'text-white' : 'text-slate-800'}>Notifications</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setActiveModal('goals')}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Target className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className={darkMode ? 'text-white' : 'text-slate-800'}>Goals & Targets</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setActiveModal('achievements')}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className={darkMode ? 'text-white' : 'text-slate-800'}>Achievements</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className={darkMode ? 'text-white' : 'text-slate-800'}>Dark Mode</span>
              </div>
              <div 
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                  darkMode ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <div 
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                    darkMode ? 'left-6' : 'left-0.5'
                  }`}
                />
              </div>
            </button>

            <button 
              onClick={() => setActiveModal('help')}
              className={`w-full p-4 flex items-center justify-between transition-colors active:scale-[0.99] ${
                darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className={darkMode ? 'text-white' : 'text-slate-800'}>Help & Support</span>
              </div>
              <ChevronRight className="size-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Sign out */}
        <button 
          onClick={() => setShowSignOutConfirm(true)}
          className={`w-full text-red-600 rounded-xl p-4 border-2 transition-colors active:scale-95 ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 hover:bg-red-900 hover:border-red-800' 
              : 'bg-white border-slate-200 hover:bg-red-50'
          }`}
        >
          Sign Out
        </button>
      </div>

      {/* Modals */}
      {activeModal === 'edit' && (
        <Modal onClose={() => setActiveModal(null)} title="Edit Profile">
          <div className="space-y-4">
            <div>
              <label className={`mb-2 block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
              <input
                type="text"
                value={editedInfo.name}
                onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                className={`w-full p-3 border-2 rounded-lg focus:border-blue-600 focus:outline-none ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className={`mb-2 block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
              <input
                type="email"
                value={editedInfo.email}
                onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                className={`w-full p-3 border-2 rounded-lg focus:border-blue-600 focus:outline-none ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'border-slate-200'
                }`}
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'notifications' && (
        <Modal onClose={() => setActiveModal(null)} title="Notifications">
          <div className="space-y-4">
            <ToggleSetting
              label="Push Notifications"
              enabled={notificationsEnabled}
              onChange={setNotificationsEnabled}
            />
            <ToggleSetting label="Workout Reminders" enabled={true} onChange={() => {}} />
            <ToggleSetting label="Achievement Alerts" enabled={true} onChange={() => {}} />
            <ToggleSetting label="Weekly Reports" enabled={false} onChange={() => {}} />
          </div>
        </Modal>
      )}

      {activeModal === 'goals' && (
        <Modal onClose={() => setActiveModal(null)} title="Goals & Targets">
          <div className="space-y-4">
            <GoalSetting label="Daily Steps" value="10,000" />
            <GoalSetting label="Active Minutes" value="30 min" />
            <GoalSetting label="Weekly Workouts" value="5" />
            <GoalSetting label="Calories Burned" value="500 kcal" />
          </div>
        </Modal>
      )}

      {activeModal === 'achievements' && (
        <Modal onClose={() => setActiveModal(null)} title="Achievements">
          <div className="space-y-3">
            <Achievement name="First Workout" description="Complete your first workout" unlocked={true} />
            <Achievement name="Week Warrior" description="7-day workout streak" unlocked={true} />
            <Achievement name="Marathon Runner" description="Run 42 km total" unlocked={false} />
            <Achievement name="Century Club" description="100 total workouts" unlocked={false} />
          </div>
        </Modal>
      )}

      {activeModal === 'device' && (
        <Modal onClose={() => setActiveModal(null)} title="SportBand Pro">
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDeviceConnected 
                  ? darkMode ? 'bg-blue-900' : 'bg-blue-100'
                  : darkMode ? 'bg-slate-600' : 'bg-slate-100'
              }`}>
                <Bluetooth className={`size-10 ${isDeviceConnected ? 'text-blue-600' : 'text-slate-400'}`} />
              </div>
              <p className={`mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>SportBand Pro</p>
              <p className={`mb-4 ${isDeviceConnected ? 'text-green-600' : darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isDeviceConnected ? 'Connected' : 'Disconnected'}
              </p>
              {isDeviceConnected && (
                <div className={`rounded-lg p-4 space-y-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Battery</span>
                    <span className={darkMode ? 'text-white' : 'text-slate-800'}>{deviceBattery}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Firmware</span>
                    <span className={darkMode ? 'text-white' : 'text-slate-800'}>v2.1.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Last Sync</span>
                    <span className={darkMode ? 'text-white' : 'text-slate-800'}>Just now</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleToggleDevice}
              className={`w-full rounded-lg p-3 transition-colors ${
                isDeviceConnected
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isDeviceConnected ? 'Disconnect Device' : 'Connect Device'}
            </button>
          </div>
        </Modal>
      )}

      {activeModal === 'help' && (
        <Modal onClose={() => setActiveModal(null)} title="Help & Support">
          <div className="space-y-3">
            <HelpItem title="Getting Started Guide" />
            <HelpItem title="Troubleshooting" />
            <HelpItem title="Contact Support" />
            <HelpItem title="Privacy Policy" />
            <HelpItem title="Terms of Service" />
          </div>
        </Modal>
      )}

      {showSignOutConfirm && (
        <Modal onClose={() => setShowSignOutConfirm(false)} title="Sign Out">
          <div className="space-y-4">
            <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Are you sure you want to sign out?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className={`flex-1 rounded-lg p-3 transition-colors ${
                  darkMode 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutConfirm(false);
                  setActiveModal(null);
                  alert('Signed out successfully!');
                }}
                className="flex-1 bg-red-600 text-white rounded-lg p-3 hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  const { darkMode } = useApp();
  
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl w-full max-w-sm max-h-[600px] overflow-hidden shadow-2xl ${
        darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`p-4 border-b-2 flex items-center justify-between sticky top-0 ${
          darkMode 
            ? 'border-slate-700 bg-slate-800' 
            : 'border-slate-200 bg-white'
        }`}>
          <h2 className={darkMode ? 'text-white' : 'text-slate-800'}>{title}</h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
            }`}
          >
            <X className={`size-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[500px]">{children}</div>
      </div>
    </div>
  );
}

function ToggleSetting({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (value: boolean) => void }) {
  const { darkMode } = useApp();
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${
      darkMode ? 'bg-slate-700' : 'bg-slate-50'
    }`}>
      <span className={darkMode ? 'text-white' : 'text-slate-800'}>{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
          enabled ? 'bg-blue-600' : darkMode ? 'bg-slate-600' : 'bg-slate-300'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
            enabled ? 'left-6' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function GoalSetting({ label, value }: { label: string; value: string }) {
  const { darkMode } = useApp();
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${
      darkMode ? 'bg-slate-700' : 'bg-slate-50'
    }`}>
      <span className={darkMode ? 'text-white' : 'text-slate-800'}>{label}</span>
      <span className="text-blue-600">{value}</span>
    </div>
  );
}

function Achievement({ name, description, unlocked }: { name: string; description: string; unlocked: boolean }) {
  const { darkMode } = useApp();
  
  return (
    <div className={`p-4 rounded-lg border-2 ${
      unlocked 
        ? darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'
        : darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            unlocked ? 'bg-blue-600' : darkMode ? 'bg-slate-600' : 'bg-slate-300'
          }`}
        >
          {unlocked ? <Award className="size-6 text-white" /> : <Award className={`size-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />}
        </div>
        <div className="flex-1">
          <p className={unlocked ? darkMode ? 'text-white' : 'text-slate-800' : darkMode ? 'text-slate-400' : 'text-slate-500'}>{name}</p>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{description}</p>
        </div>
        {unlocked && <Check className="size-5 text-blue-600" />}
      </div>
    </div>
  );
}

function HelpItem({ title }: { title: string }) {
  const { darkMode } = useApp();
  
  return (
    <button className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${
      darkMode 
        ? 'bg-slate-700 hover:bg-slate-600' 
        : 'bg-slate-50 hover:bg-slate-100'
    }`}>
      <span className={darkMode ? 'text-white' : 'text-slate-800'}>{title}</span>
      <ChevronRight className="size-5 text-slate-400" />
    </button>
  );
}
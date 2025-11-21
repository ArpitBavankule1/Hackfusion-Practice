import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  isDeviceConnected: boolean;
  setIsDeviceConnected: (value: boolean) => void;
  deviceBattery: number;
  setDeviceBattery: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeviceConnected, setIsDeviceConnected] = useState(true);
  const [deviceBattery, setDeviceBattery] = useState(85);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        notificationsEnabled,
        setNotificationsEnabled,
        isDeviceConnected,
        setIsDeviceConnected,
        deviceBattery,
        setDeviceBattery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}


import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import AiDiagnosisTab from './screens/tabs/AiDiagnosisTab';
import ServicesTab from './screens/tabs/ServicesTab';
import AppointmentsTab from './screens/tabs/AppointmentsTab';
import PlansTab from './screens/tabs/PlansTab';
import SupportTab from './screens/tabs/SupportTab';

export enum AuthState {
  SPLASH,
  LOGIN,
  OTP,
  REGISTER,
  AUTHENTICATED,
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SPLASH);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    // Simulate checking for internet connection and initial auth state
    const timer = setTimeout(() => setAuthState(AuthState.LOGIN), 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (authState) {
      case AuthState.SPLASH:
        return <SplashScreen />;
      case AuthState.LOGIN:
        return <LoginScreen setAuthState={setAuthState} setPhoneNumber={setPhoneNumber} />;
      case AuthState.OTP:
        return <OtpScreen setAuthState={setAuthState} phoneNumber={phoneNumber} />;
      case AuthState.REGISTER:
        return <RegisterScreen setAuthState={setAuthState} phoneNumber={phoneNumber} />;
      case AuthState.AUTHENTICATED:
        return (
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Navigate to="/diagnose" replace />} />
              <Route path="diagnose" element={<AiDiagnosisTab />} />
              <Route path="services" element={<ServicesTab />} />
              <Route path="appointments" element={<AppointmentsTab />} />
              <Route path="plans" element={<PlansTab />} />
              <Route path="support" element={<SupportTab />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        );
      default:
        return <LoginScreen setAuthState={setAuthState} setPhoneNumber={setPhoneNumber} />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-sm h-[800px] max-h-[90vh] bg-white dark:bg-[#333333] shadow-2xl rounded-3xl overflow-hidden">
        <HashRouter>
          {renderContent()}
        </HashRouter>
      </div>
    </div>
  );
};

export default App;

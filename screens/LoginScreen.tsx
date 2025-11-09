
import React, { useState } from 'react';
import type { ScreenProps } from '../types';
import { AuthState } from '../App';
import { sendOtp } from '../services/supabaseService';
import Spinner from '../components/Spinner';

interface LoginScreenProps extends ScreenProps {
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setAuthState, setPhoneNumber }) => {
    const [number, setNumber] = useState('+98');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        const phoneRegex = /^\+989\d{9}$/;
        if (!phoneRegex.test(number)) {
            setError('Please enter a valid number (e.g., +989123456789)');
            return;
        }
        setError('');
        setIsLoading(true);

        const result = await sendOtp(number);
        setIsLoading(false);
        if (result.success) {
            setPhoneNumber(number);
            setAuthState(AuthState.OTP);
        } else {
            setError('Failed to send verification code. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-8 text-gray-800 dark:text-gray-200">
            <div className="flex-grow flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-[#33CC66] mb-2">Welcome Back!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Enter your mobile to continue</p>
                
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                    <input
                        id="phone"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="+989123456789"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#33CC66] focus:outline-none transition"
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                
                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-[#33CC66] text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center disabled:bg-gray-400"
                >
                    {isLoading ? <Spinner /> : 'Send Verification Code'}
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;

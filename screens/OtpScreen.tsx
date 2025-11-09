
import React, { useState, useRef, useEffect } from 'react';
import type { ScreenProps } from '../types';
import { AuthState } from '../App';
import { verifyOtp } from '../services/supabaseService';
import Spinner from '../components/Spinner';
import { ChevronLeftIcon } from '../components/Icons';

interface OtpScreenProps extends ScreenProps {
    phoneNumber: string;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ setAuthState, phoneNumber }) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }
        setError('');
        setIsLoading(true);

        const result = await verifyOtp(phoneNumber, code);
        setIsLoading(false);
        if (result.success) {
            setAuthState(result.isNewUser ? AuthState.REGISTER : AuthState.AUTHENTICATED);
        } else {
            setError('Invalid code. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-8 text-gray-800 dark:text-gray-200">
            <button onClick={() => setAuthState(AuthState.LOGIN)} className="absolute top-6 left-6 text-gray-600 dark:text-gray-400">
              <ChevronLeftIcon />
            </button>
            <div className="flex-grow flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-[#33CC66] mb-2">Enter Code</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">We sent a verification code to {phoneNumber}</p>
                
                <div className="flex justify-center space-x-2 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputsRef.current[index] = el}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-14 text-center text-2xl font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#33CC66] focus:outline-none transition"
                            disabled={isLoading}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                
                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full bg-[#33CC66] text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center disabled:bg-gray-400"
                >
                    {isLoading ? <Spinner /> : 'Verify'}
                </button>
            </div>
        </div>
    );
};

export default OtpScreen;

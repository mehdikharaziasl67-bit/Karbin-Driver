
import React, { useState } from 'react';
import type { ScreenProps } from '../types';
import { AuthState } from '../App';
import { registerUser } from '../services/supabaseService';
import Spinner from '../components/Spinner';

interface RegisterScreenProps extends ScreenProps {
    phoneNumber: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ setAuthState, phoneNumber }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        nationalId: '',
        carModel: '',
        plateNumber: '',
        productionYear: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await registerUser({ phoneNumber, ...formData });
        setIsLoading(false);
        if (result.success) {
            setAuthState(AuthState.AUTHENTICATED);
        } else {
            // Handle registration error
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-8 text-gray-800 dark:text-gray-200 overflow-y-auto">
            <h1 className="text-3xl font-bold text-[#33CC66] mb-2">Create Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Let's get you set up.</p>

            <form onSubmit={handleRegister} className="space-y-4">
                <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} disabled={isLoading} />
                <Input name="nationalId" label="National ID" value={formData.nationalId} onChange={handleChange} disabled={isLoading} />
                <Input name="carModel" label="Car Model" value={formData.carModel} onChange={handleChange} disabled={isLoading} />
                <Input name="plateNumber" label="Plate Number" value={formData.plateNumber} onChange={handleChange} disabled={isLoading} />
                <Input name="productionYear" label="Production Year" type="number" value={formData.productionYear} onChange={handleChange} disabled={isLoading} />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#33CC66] text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center disabled:bg-gray-400 mt-6"
                >
                    {isLoading ? <Spinner /> : 'Complete Registration'}
                </button>
            </form>
        </div>
    );
};

interface InputProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ name, label, value, onChange, type = 'text', disabled }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            disabled={disabled}
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#33CC66] focus:outline-none transition"
        />
    </div>
);

export default RegisterScreen;

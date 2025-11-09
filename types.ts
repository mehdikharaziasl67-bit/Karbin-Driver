
import type React from 'react';
import { AuthState } from './App';

export interface ScreenProps {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export interface UserProfile {
  fullName: string;
  nationalId: string;
  carModel: string;
  plateNumber: string;
  productionYear: string;
}

export interface ServiceTask {
    id: string;
    title: string;
    status: 'completed' | 'pending' | 'upcoming';
    date: string;
}

export interface Appointment {
    id: string;
    provider: string;
    service: string;
    date: string;
    time: string;
    status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Plan {
    id: string;
    name: string;
    price: string;
    features: string[];
    isCurrent: boolean;
}

export interface SupportMessage {
    id: string;
    text: string;
    sender: 'user' | 'support';
    timestamp: string;
}

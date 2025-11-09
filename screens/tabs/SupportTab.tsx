
import React, { useState } from 'react';
import type { SupportMessage } from '../../types';
import { PaperAirplaneIcon, PhotoIcon } from '../../components/Icons';

const mockMessages: SupportMessage[] = [
    { id: '1', text: 'Hello! How can I help you today?', sender: 'support', timestamp: '10:00 AM' },
    { id: '2', text: 'Hi, I\'m having an issue with booking an appointment.', sender: 'user', timestamp: '10:01 AM' },
    { id: '3', text: 'I see. Can you please provide more details about the error you are seeing?', sender: 'support', timestamp: '10:02 AM' },
];

const MessageBubble: React.FC<{ message: SupportMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${isUser ? 'bg-[#33CC66] text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 text-right opacity-70">{message.timestamp}</p>
            </div>
        </div>
    );
};

const SupportTab: React.FC = () => {
    const [messages, setMessages] = useState<SupportMessage[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            const userMessage: SupportMessage = {
                id: String(Date.now()),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, userMessage]);
            setNewMessage('');
            
            // Simulate support reply
            setTimeout(() => {
                const supportReply: SupportMessage = {
                    id: String(Date.now() + 1),
                    text: 'Thank you for your message. An agent will be with you shortly.',
                    sender: 'support',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, supportReply]);
            }, 1500);
        }
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-4 text-[#33CC66]">Support Chat</h1>
            <div className="flex-grow space-y-4 overflow-y-auto p-2">
                {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            </div>
            <div className="mt-4 flex items-center space-x-2 p-2 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700">
                <button className="p-2 text-gray-500 hover:text-[#33CC66] transition">
                    <PhotoIcon />
                </button>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-grow bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200"
                />
                <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-[#33CC66] text-white rounded-full disabled:bg-gray-400 transition"
                >
                    <PaperAirplaneIcon />
                </button>
            </div>
        </div>
    );
};

export default SupportTab;

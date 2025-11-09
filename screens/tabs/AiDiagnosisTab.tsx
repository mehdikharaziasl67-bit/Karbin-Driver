
import React, { useState, useRef } from 'react';
import { diagnoseProblem } from '../../services/geminiService';
import Spinner from '../../components/Spinner';
import { PhotoIcon, MicrophoneIcon, PaperAirplaneIcon } from '../../components/Icons';

const AiDiagnosisTab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ file: File; preview: string; base64: string; mimeType: string } | null>(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({
          file,
          preview: URL.createObjectURL(file),
          base64: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim() && !image) {
      return;
    }
    setIsLoading(true);
    setResponse('');
    const result = await diagnoseProblem(prompt, image ? { base64: image.base64, mimeType: image.mimeType } : undefined);
    setResponse(result);
    setIsLoading(false);
  };

  const formatResponse = (text: string) => {
      const parts = text.split('\n').map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <h2 key={index} className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2">{part.slice(2, -2)}</h2>;
        }
        if (part.match(/^\d+\./)) {
            return <li key={index} className="ml-5 list-decimal">{part.substring(part.indexOf(' ') + 1)}</li>
        }
        return <p key={index} className="mb-2">{part}</p>
      });
      return <div>{parts}</div>;
  };

  return (
    <div className="p-4 h-full flex flex-col text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-[#33CC66]">AI Diagnosis</h1>
      <div className="flex-grow overflow-y-auto mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Karbin is thinking...</p>
            </div>
          </div>
        )}
        {response && !isLoading && (
          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {formatResponse(response)}
          </div>
        )}
        {!response && !isLoading && (
             <div className="flex justify-center items-center h-full text-center text-gray-500 dark:text-gray-400">
                <p>Describe your car's issue or upload a photo to get started.</p>
            </div>
        )}
      </div>

      {image && (
        <div className="mb-4 relative w-24 h-24">
          <img src={image.preview} alt="Upload preview" className="rounded-lg w-full h-full object-cover" />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            X
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
        <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-[#33CC66] transition">
          <PhotoIcon />
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button className="p-2 text-gray-500 hover:text-[#33CC66] transition">
          <MicrophoneIcon />
        </button>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g., my car is making a clicking sound"
          className="flex-grow bg-transparent focus:outline-none text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || (!prompt.trim() && !image)}
          className="p-2 bg-[#33CC66] text-white rounded-full disabled:bg-gray-400 transition"
        >
          <PaperAirplaneIcon />
        </button>
      </div>
    </div>
  );
};

export default AiDiagnosisTab;

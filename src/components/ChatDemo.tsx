import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatDemoProps {
  language: 'en' | 'es';
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const text = {
  en: {
    welcome: "Hi! I'm Andes, your AI running coach. What's your main goal?",
    placeholder: 'Type your goal...',
    response: (goal: string) => `Great! I'll adapt your training plan to help you achieve "${goal}".`,
  },
  es: {
    welcome: '¡Hola! Soy Andes, tu entrenador de running con IA. ¿Cuál es tu objetivo?',
    placeholder: 'Escribe tu objetivo...',
    response: (goal: string) => `¡Genial! Adaptaré tu plan para lograr "${goal}".`,
  },
};

const ChatDemo: React.FC<ChatDemoProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: text[language].welcome },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const reply = text[language].response(trimmed);
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }, { sender: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="h-60 overflow-y-auto flex flex-col space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-800 self-start' : 'bg-purple-600 text-white self-end'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l-md p-2 text-sm"
          placeholder={text[language].placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
        />
        <button
          onClick={send}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-r-md flex items-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatDemo;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import BotDemoOptions from './BotDemoOptions';
import { motion, AnimatePresence } from 'framer-motion';
import { chatTranslations, DemoStage } from '../translations/chatDemo';



const InteractiveBotDemo: React.FC = () => {
  const location = useLocation();
  const language = location.pathname.startsWith('/es') ? 'es' : 'en';
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; isTyping?: boolean }[]>([]);
  const [currentStage, setCurrentStage] = useState<DemoStage>('start');
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const { title, subtitle, script } = chatTranslations[language];

  useEffect(() => {
    // Start with the bot's first message in the current language
    setMessages([{ sender: 'bot', text: script.start.bot }]);
  }, [language]);

  useEffect(() => {
    // Only scroll the chat container, not the whole page
    if (messagesContainerRef.current && chatEndRef.current) {
      const container = messagesContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const height = container.clientHeight;
      const maxScrollTop = scrollHeight - height;
      
      container.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleOptionSelect = (payload: string, text: string) => {
    setOptionsDisabled(true);
    // Add user message
    const userMessage = { sender: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);

    const nextStage = payload as DemoStage;

    // Simulate bot thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: '', isTyping: true }]);
      
      // Show bot response
      setTimeout(() => {
        const botResponse = { sender: 'bot' as const, text: script[nextStage].bot };
        setMessages(prev => prev.slice(0, -1).concat(botResponse)); // Replace typing indicator
        setCurrentStage(nextStage);
        if (script[nextStage].options.length > 0) {
          setOptionsDisabled(false);
        }
      }, 1200);
    }, 500);
  };

  return (
    <div className="mt-12 md:mt-20 max-w-2xl mx-auto" data-component-name="InteractiveBotDemo">
      <h3 className="text-2xl font-bold text-center text-white mb-2">{title}</h3>
      <p className="text-center text-gray-400 mb-6">{subtitle}</p>
      
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 h-96 flex flex-col">
        <div 
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900/60"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <ChatMessage key={index} sender={message.sender} text={message.text} isTyping={message.isTyping} />
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>

        {script[currentStage].options.length > 0 && (
          <div className="mt-4">
            <BotDemoOptions 
              options={script[currentStage].options} 
              onSelect={handleOptionSelect}
              disabled={optionsDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveBotDemo;

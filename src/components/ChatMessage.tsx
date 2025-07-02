import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  sender: 'bot' | 'user';
  text: string;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, isTyping }) => {
  const isBot = sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/images/logo-icon.png" alt="Andes Bot" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm md:max-w-md lg:max-w-lg ${
          isBot
            ? 'rounded-bl-none bg-gray-700 text-white'
            : 'rounded-br-none bg-violet-600 text-white'
        }`}>
        {isTyping ? (
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          </div>
        ) : (
          text
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;

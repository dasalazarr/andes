import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface BotDemoOptionsProps {
  options: { text: string; payload: string }[];
  onSelect: (payload: string, text: string) => void;
  disabled: boolean;
}

const BotDemoOptions: React.FC<BotDemoOptionsProps> = ({ options, onSelect, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-wrap justify-center gap-2 pt-2">
      {options.map((option) => (
        <Button
          key={option.payload}
          variant="outline"
          size="sm"
          className="border-[#25d366] text-[#25d366] bg-transparent hover:bg-[#25d366] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 transition-all duration-200"
          onClick={() => onSelect(option.payload, option.text)}
          disabled={disabled}>
          {option.text}
        </Button>
      ))}
    </motion.div>
  );
};

export default BotDemoOptions;

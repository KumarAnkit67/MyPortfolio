import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChatbotAI } from '../utils/chatbotAI';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hi! I\'m Ankit\'s AI assistant. How can I help you today?',
      suggestions: ['Tell me about skills', 'Show me projects', 'Contact info']
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
    setTimeout(() => {
      const response = ChatbotAI.generateResponse(userMessage);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: response.text,
          suggestions: response.suggestions
        },
      ]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? {} : { y: [0, -10, 0] }}
        transition={isOpen ? {} : { duration: 2, repeat: Infinity }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-100 h-[600px] rounded-2xl bg-gray-900 dark:bg-gray-900 light:bg-white border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-cyan-500 to-purple-600">
              <h3 className="text-white !text-white">Chat with Ankit's Assistant</h3>
              <p className="text-cyan-100 text-sm !text-cyan-100">Typically replies instantly</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.type === 'bot' && msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-6">
                      {msg.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(suggestion)}
                          className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/50 hover:bg-cyan-500/30 hover:border-cyan-500/70 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

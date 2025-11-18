import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className={`fixed top-8 right-8 z-50 p-4 rounded-full backdrop-blur-sm border transition-colors ${
        isDark 
          ? 'bg-gray-800/80 border-cyan-500/30 hover:border-cyan-500' 
          : 'bg-white/80 border-purple-500/30 hover:border-purple-500'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-cyan-400" />
        ) : (
          <Moon className="w-6 h-6 text-purple-600" />
        )}
      </motion.div>
    </motion.button>
  );
}

import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ChatBot } from './components/ChatBot';

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-gradient-to-b light:from-blue-50 light:to-purple-50 text-white overflow-x-hidden">
      <CustomCursor />
      <ThemeToggle />
      <ChatBot />
      
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      
      <footer className="py-8 text-center text-gray-400 dark:text-gray-400 light:text-gray-600 border-t border-gray-800 dark:border-gray-800 light:border-gray-200">
        <p>© 2025 Ankit Kumar. Built with React, Motion & Tailwind CSS.</p>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

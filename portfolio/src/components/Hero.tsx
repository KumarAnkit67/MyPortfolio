import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { Button } from './ui/button';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/10" />
      
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-block text-cyan-400 tracking-widest mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚡ WELCOME TO MY PORTFOLIO ⚡
          </motion.span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="block text-gray-300 mb-2">Hi, I'm</span>
          <h1 className="hero-name light-mode-name bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Ankit Kumar
          </h1>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="hero-title text-gray-300 mb-8"
        >
          Full-Stack Developer & React Native Engineer
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-cyan-300/80 max-w-2xl mx-auto mb-12"
        >
          Building seamless digital experiences with full-stack power.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 group relative overflow-hidden"
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
          
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6"
          >
            Get In Touch
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400/60" />
        </motion.div>
      </motion.div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
    </section>
  );
}

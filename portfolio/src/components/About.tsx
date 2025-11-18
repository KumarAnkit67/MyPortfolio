import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Code, Rocket, Zap } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Frontend Expert',
    description: 'Building modern, responsive UIs with React, Next.js, and Angular',
  },
  {
    icon: Rocket,
    title: 'Backend Mastery',
    description: 'Scalable APIs with Node.js, MongoDB, and PostgreSQL',
  },
  {
    icon: Zap,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps with React Native',
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDM0LCAyMTEsIDIzOCwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30"
        style={{ y }}
      />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            About Me
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            I am a passionate <span className="text-cyan-400">Full-Stack Developer</span> with expertise in building 
            scalable backend APIs, modern frontend applications, and complete solutions. I specialize in React.js, 
            Next.js, Node.js, MongoDB, PostgreSQL, Angular, and Python. I'm also experienced in React Native mobile 
            app development, delivering seamless digital experiences across platforms.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          style={{ opacity }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all group"
            >
              <motion.div
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <h3 className="text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

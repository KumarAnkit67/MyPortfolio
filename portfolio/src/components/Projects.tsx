import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const projects = [
  {
    title: 'Full-Stack MERN Application',
    description: 'A comprehensive e-commerce platform with real-time features, payment integration, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'React Native Mobile App',
    description: 'Cross-platform mobile application for task management with offline support and push notifications.',
    tech: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Modern Portfolio Website',
    description: 'Interactive portfolio with 3D animations, smooth transitions, and custom cursor effects.',
    tech: ['Next.js', 'Three.js', 'Motion', 'Tailwind'],
    gradient: 'from-green-500 to-teal-600',
  },
  {
    title: 'Next.js + PostgreSQL Dashboard',
    description: 'Analytics dashboard with real-time data visualization, charts, and comprehensive reporting.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Recharts'],
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Python Automation & API',
    description: 'Automated workflow system with REST API, data processing, and scheduled tasks.',
    tech: ['Python', 'FastAPI', 'Celery', 'Redis'],
    gradient: 'from-indigo-500 to-purple-600',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section id="projects" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"
        style={{ y: backgroundY, opacity }}
      />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work showcasing full-stack development expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`} />
              
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient}`} />
                
                <motion.div
                  className="mb-6 h-40 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <span className="relative z-10 text-gray-500">Project Preview</span>
                </motion.div>

                <h3 className="text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 flex-1"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

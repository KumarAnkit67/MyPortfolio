import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const projects = [
  {
    title: 'Smart Health Tracker',
    description: 'Mobile solution for real-time health monitoring supporting 500+ active users with 99.9% uptime and push notifications for critical health readings.',
    tech: ['React Native', 'Firebase', 'Node.js', 'Push Notifications'],
    gradient: 'from-cyan-500 to-blue-600',
    year: '2025',
    icon: '🏥'
  },
  {
    title: 'EduConnect Platform',
    description: 'Web platform connecting tutors and students with secure authentication and subscription payments, supporting 10,000+ monthly active users.',
    tech: ['React.js', 'Next.js', 'Firebase', 'Node.js'],
    gradient: 'from-purple-500 to-pink-600',
    year: '2024',
    icon: '📚'
  },
  {
    title: 'GreenCart E-Commerce',
    description: 'Full-stack e-commerce platform for eco-friendly products with recommendation algorithms, contributing to 25% increase in sustainable purchases.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express'],
    gradient: 'from-green-500 to-teal-600',
    year: '2024',
    icon: '🌱'
  },
  {
    title: 'HabitLoop Tracker',
    description: 'Habit tracking app where users can create custom habits and maintain streaks with progress visualization and motivation features.',
    tech: ['React Native', 'Firebase', 'Node.js', 'Analytics'],
    gradient: 'from-orange-500 to-red-600',
    year: '2024',
    icon: '🔄'
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
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-2">{project.icon}</div>
                    <span className="text-gray-400 text-sm">{project.year}</span>
                  </div>
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

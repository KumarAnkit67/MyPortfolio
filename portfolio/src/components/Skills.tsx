import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiPostgresql, SiAngular, SiPython, SiOpenai } from 'react-icons/si';

const skills = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB', description: 'Modern UI development' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', description: 'Full-stack React framework' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', description: 'Backend & APIs' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', description: 'NoSQL database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', description: 'Relational database' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031', description: 'Enterprise applications' },
  { name: 'Python', icon: SiPython, color: '#3776AB', description: 'Automation & APIs' },
  { name: 'Gen AI', icon: SiOpenai, color: '#00D4AA', description: 'AI & Machine Learning' },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build robust and scalable solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 360,
                transition: { duration: 0.6 },
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <skill.icon className="w-16 h-16" style={{ color: skill.color }} />
                </motion.div>
                
                <h3 className="text-white text-center mb-2">{skill.name}</h3>
                <p className="text-gray-400 text-center text-sm">{skill.description}</p>

                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

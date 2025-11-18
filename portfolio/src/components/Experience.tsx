import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Code, Rocket } from 'lucide-react';

const experiences = [
  {
    year: '2023 - Present',
    title: 'Senior Full-Stack Developer',
    company: 'Freelance',
    description: 'Building custom web and mobile applications for clients worldwide. Specializing in MERN stack and React Native.',
    icon: Rocket,
    color: 'cyan',
  },
  {
    year: '2022 - 2023',
    title: 'Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    description: 'Developed scalable web applications using React, Next.js, and Node.js. Implemented CI/CD pipelines and cloud infrastructure.',
    icon: Code,
    color: 'purple',
  },
  {
    year: '2021 - 2022',
    title: 'Software Development Intern',
    company: 'Innovation Labs',
    description: 'Worked on frontend development with React and Angular. Contributed to mobile app development with React Native.',
    icon: Briefcase,
    color: 'blue',
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section id="experience" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{ rotate, scale }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          style={{ rotate, scale }}
        />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            2 years of experience building web & mobile applications
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 flex items-center justify-center shadow-lg shadow-${exp.color}-500/50`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <exp.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-${exp.color}-400 px-3 py-1 rounded-full bg-${exp.color}-500/10 border border-${exp.color}-500/30 text-sm`}>
                      {exp.year}
                    </span>
                  </div>
                  
                  <h3 className="text-white mb-2">{exp.title}</h3>
                  <h4 className="text-cyan-400 mb-4">{exp.company}</h4>
                  <p className="text-gray-400">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-cyan-500/30"
        >
          <p className="text-cyan-300">
            Ready to bring your next project to life with cutting-edge technology and creative solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}

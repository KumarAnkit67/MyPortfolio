import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, id, className = '', speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.section>
  );
}

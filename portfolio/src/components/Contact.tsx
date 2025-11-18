import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { EmailService } from '../utils/emailService';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Percy1011', label: 'GitHub', color: 'hover:text-white' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ankit-kumar-45b102252', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: Mail, href: 'mailto:ankitanand843410@gmail.com', label: 'Email', color: 'hover:text-purple-400' },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await EmailService.sendContactEmail(formData);
      
      if (success) {
        toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback to mailto
        const mailtoLink = EmailService.createMailtoLink(formData);
        window.open(mailtoLink, '_blank');
        toast.info('Opening your email client. Please send the message from there.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try emailing me directly at ankitanand843410@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
          style={{ x: x1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
          style={{ x: x2 }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your next project to life? Let's discuss how I can help you build high-performance web and mobile applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="text-gray-300">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white dark:text-white light:text-gray-900 placeholder:text-gray-500"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-gray-300">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white dark:text-white light:text-gray-900 placeholder:text-gray-500"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="space-y-2"
              >
                <label htmlFor="message" className="text-gray-300">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white dark:text-white light:text-gray-900 placeholder:text-gray-500 resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-gray-400">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <a href="mailto:ankitanand843410@gmail.com" className="hover:text-cyan-400 transition-colors">
                    ankitanand843410@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Noida, Uttar Pradesh</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-gray-300 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-white mb-3">Let's Create Together</h4>
              <p className="text-gray-400">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you need a full-stack developer, React Native expert, or have questions about my work, 
                I typically respond within 24 hours!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

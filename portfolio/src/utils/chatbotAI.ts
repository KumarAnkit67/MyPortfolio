import { portfolioData } from '../data/portfolioData';

interface ChatResponse {
  text: string;
  suggestions?: string[];
}

export class ChatbotAI {
  private static responses = {
    greetings: [
      "Hello! I'm Ankit's AI assistant. How can I help you learn more about his work?",
      "Hi there! I'm here to answer questions about Ankit's skills and experience."
    ],
    
    skills: [
      `Ankit specializes in: ${portfolioData.skills.join(', ')}. Which technology interests you most?`,
      "Ankit is proficient in full-stack development with React, Node.js, and modern databases."
    ],
    
    experience: [
      `Ankit is currently working as a ${portfolioData.experience[0].role} at ${portfolioData.experience[0].company}.`,
      "He has experience developing scalable web applications using modern technologies."
    ],
    
    projects: [
      "Ankit has worked on various projects including e-commerce platforms and mobile apps.",
      `Recent projects include: ${portfolioData.projects.map(p => p.name).join(', ')}.`
    ],
    
    contact: [
      "You can reach Ankit through the contact form on this website or connect via LinkedIn.",
      "For project inquiries, use the contact section below."
    ]
  };

  static generateResponse(message: string): ChatResponse {
    const msg = message.toLowerCase();
    
    if (this.matchesPattern(msg, ['hello', 'hi', 'hey'])) {
      return { text: this.getRandomResponse('greetings') };
    }
    
    if (this.matchesPattern(msg, ['skill', 'technology', 'tech'])) {
      return { 
        text: this.getRandomResponse('skills'),
        suggestions: ['Tell me about React', 'What about AI/ML?']
      };
    }
    
    if (this.matchesPattern(msg, ['experience', 'work', 'job'])) {
      return { text: this.getRandomResponse('experience') };
    }
    
    if (this.matchesPattern(msg, ['project', 'portfolio'])) {
      return { text: this.getRandomResponse('projects') };
    }
    
    if (this.matchesPattern(msg, ['contact', 'reach', 'hire'])) {
      return { text: this.getRandomResponse('contact') };
    }
    
    return { 
      text: "I'd be happy to help! Ask me about Ankit's skills, experience, or projects.",
      suggestions: ['Skills & Technologies', 'Work Experience', 'Recent Projects']
    };
  }
  
  private static matchesPattern(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }
  
  private static getRandomResponse(category: keyof typeof this.responses): string {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
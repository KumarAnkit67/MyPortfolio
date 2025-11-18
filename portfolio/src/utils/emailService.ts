interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private static FORMSPREE_URL = 'https://formspree.io/f/xrbjbobe'; // Replace with your Formspree form ID
  
  static async sendContactEmail(data: ContactFormData): Promise<boolean> {
    try {
      // Create a hidden form to submit data
      const form = document.createElement('form');
      form.action = this.FORMSPREE_URL;
      form.method = 'POST';
      form.style.display = 'none';
      
      // Add form fields
      const fields = {
        name: data.name,
        email: data.email,
        message: data.message,
        _replyto: data.email,
        _subject: `Portfolio Contact: Message from ${data.name}`,
        _next: window.location.origin // Redirect back to current page
      };
      
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }
  
  // Alternative: Simple mailto fallback
  static createMailtoLink(data: ContactFormData): string {
    const subject = encodeURIComponent(`Portfolio Contact: Message from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    return `mailto:ankitanand843410@gmail.com?subject=${subject}&body=${body}`;
  }
}
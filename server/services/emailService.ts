// Email Service using SendGrid
import sgMail from '@sendgrid/mail';

interface EmailTemplate {
  to_email: string;
  to_name: string;
  from_name: string;
  from_email?: string;
  subject: string;
  message: string;
  [key: string]: any;
}

export class EmailService {
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = !!process.env.SENDGRID_API_KEY;
    if (this.isConfigured) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    }
  }

  async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.log('📧 Email Service (Demo Mode):');
        console.log('  To:', template.to_email);
        console.log('  Subject:', template.subject);
        console.log('  Content:', template.message);
        console.log('  Status: ✅ Demo Email (SendGrid not configured)\n');
        return true;
      }

      const msg = {
        to: template.to_email,
        from: template.from_email || template.to_email, // Use sender's email since it's verified
        subject: template.subject,
        text: template.message,
        html: `<p>${template.message.replace(/\n/g, '<br>')}</p>`
      };

      const result = await sgMail.send(msg);
      
      console.log('📧 Real Email Sent Successfully:');
      console.log('  To:', template.to_email);
      console.log('  From:', msg.from);
      console.log('  Subject:', template.subject);
      console.log('  SendGrid Response:', result[0].statusCode);
      console.log('  Status: ✅ Delivered via SendGrid\n');
      
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      console.error('Error details:', error.response?.body || error.message);
      return false;
    }
  }

  async sendFollowUpEmail(params: {
    hiringManagerEmail: string;
    hiringManagerName: string;
    applicantName: string;
    position: string;
    company: string;
    customMessage?: string;
  }): Promise<boolean> {
    const template: EmailTemplate = {
      to_email: params.hiringManagerEmail,
      to_name: params.hiringManagerName,
      from_name: params.applicantName,
      subject: `Following up on my application for ${params.position}`,
      message: params.customMessage || `
Dear ${params.hiringManagerName},

I hope this email finds you well. I wanted to follow up on my application for the ${params.position} role at ${params.company}.

I am very excited about the opportunity to contribute to your team and would welcome the chance to discuss how my skills and experience align with your needs.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
${params.applicantName}
      `.trim()
    };

    return this.sendEmail(template);
  }

  async sendThankYouEmail(params: {
    hiringManagerEmail: string;
    hiringManagerName: string;
    applicantName: string;
    position: string;
    company: string;
    interviewDate: string;
    customMessage?: string;
  }): Promise<boolean> {
    const template: EmailTemplate = {
      to_email: params.hiringManagerEmail,
      to_name: params.hiringManagerName,
      from_name: params.applicantName,
      subject: `Thank you for the interview - ${params.position}`,
      message: params.customMessage || `
Dear ${params.hiringManagerName},

Thank you for taking the time to interview me for the ${params.position} role at ${params.company} on ${params.interviewDate}.

I enjoyed our conversation and learning more about the team and the exciting projects ahead. Our discussion reinforced my enthusiasm for the role and my desire to contribute to ${params.company}.

If you need any additional information from me, please don't hesitate to reach out. I look forward to the next steps in the process.

Best regards,
${params.applicantName}
      `.trim()
    };

    return this.sendEmail(template);
  }

  async sendNetworkingEmail(params: {
    contactEmail: string;
    contactName: string;
    applicantName: string;
    company: string;
    referralSource?: string;
    customMessage?: string;
  }): Promise<boolean> {
    const template: EmailTemplate = {
      to_email: params.contactEmail,
      to_name: params.contactName,
      from_name: params.applicantName,
      subject: `Introduction and career opportunities at ${params.company}`,
      message: params.customMessage || `
Dear ${params.contactName},

${params.referralSource ? `I was referred to you by ${params.referralSource}` : 'I found your profile on LinkedIn'} and noticed your role at ${params.company}.

I'm a software engineer with expertise in full-stack development and I'm very interested in opportunities at ${params.company}. I would love to learn more about your experience there and discuss potential openings that might be a good fit.

Would you be available for a brief 15-20 minute call in the coming weeks? I'd be happy to work around your schedule.

Thank you for your time, and I look forward to connecting.

Best regards,
${params.applicantName}
      `.trim()
    };

    return this.sendEmail(template);
  }

  generateEmailTemplate(type: 'followup' | 'thankyou' | 'networking', variables: Record<string, string>): string {
    const templates = {
      followup: `Dear {hiringManager},

I hope this email finds you well. I wanted to follow up on my application for the {position} role at {company}.

I am very excited about the opportunity to contribute to your team and would welcome the chance to discuss how my skills and experience align with your needs.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
{applicantName}`,

      thankyou: `Dear {hiringManager},

Thank you for taking the time to interview me for the {position} role at {company} on {interviewDate}.

I enjoyed our conversation and learning more about the team and the exciting projects ahead. Our discussion reinforced my enthusiasm for the role and my desire to contribute to {company}.

If you need any additional information from me, please don't hesitate to reach out. I look forward to the next steps in the process.

Best regards,
{applicantName}`,

      networking: `Dear {contactName},

I found your profile on LinkedIn and noticed your role at {company}.

I'm a software engineer with expertise in full-stack development and I'm very interested in opportunities at {company}. I would love to learn more about your experience there and discuss potential openings that might be a good fit.

Would you be available for a brief 15-20 minute call in the coming weeks? I'd be happy to work around your schedule.

Thank you for your time, and I look forward to connecting.

Best regards,
{applicantName}`
    };

    let template = templates[type];
    
    // Replace variables in template
    Object.entries(variables).forEach(([key, value]) => {
      template = template.replace(new RegExp(`{${key}}`, 'g'), value);
    });

    return template;
  }
}

export const emailService = new EmailService();

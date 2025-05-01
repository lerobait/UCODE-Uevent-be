import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface CommentReplyProps {
  name: string;
  content: string;
  link: string;
}

export const CommentReply = ({ name, content, link }: CommentReplyProps) => {
  return (
    <Html>
      <Head />
      <Preview>Someone replied to your comment</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Text style={logo}>Uevent</Text>
          </Section>
          <Section style={contentContainer}>
            <Heading style={title}>New Reply to Your Comment</Heading>
            <Text style={greeting}>Hey {name},</Text>
            <Text style={paragraph}>Someone has replied to your comment:</Text>
            <Section style={replyBlock}>
              <Text style={replyContentStyle}>
                <span style={quoteStyle}>"</span>
                {content}
              </Text>
            </Section>
            <Section style={btnContainer}>
              <Link style={button} href={link}>
                View the full thread
              </Link>
            </Section>
          </Section>
          <Hr style={hr} />
          <Text style={footerText}>
            © {new Date().getFullYear()} Uevent. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CommentReply;

const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '30px 0',
};

const container = {
  margin: '0 auto',
  width: '100%',
  maxWidth: '550px',
};

const headerContainer = {
  backgroundColor: '#ffffff',
  borderRadius: '8px 8px 0 0',
  padding: '20px 0',
  textAlign: 'center' as const,
  borderBottom: '1px solid #e2e8f0',
};

const logo = {
  color: '#6366f1',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
};

const contentContainer = {
  backgroundColor: '#ffffff',
  padding: '32px',
};

const title = {
  color: '#0f172a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const greeting = {
  color: '#0f172a',
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const replyBlock = {
  backgroundColor: '#fefce8',
  padding: '16px 20px',
  borderRadius: '6px',
  margin: '16px 0 24px',
  border: '1px solid #fde68a',
  position: 'relative' as const,
};

const replyContentStyle = {
  fontSize: '16px',
  fontStyle: 'italic',
  color: '#854d0e',
  lineHeight: '24px',
  margin: '0',
  position: 'relative' as const,
  paddingLeft: '16px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
  width: '100%', // Ensure container takes full width
};

const button = {
  backgroundColor: '#6366f1',
  borderRadius: '9999px', // Fully rounded corners
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '500',
  width: 'calc(100% - 48px)', // Full width minus padding
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0 16px',
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const quoteStyle = {
  position: 'absolute' as const,
  left: '0',
  top: '0',
  color: '#ca8a04',
  fontSize: '18px',
  fontWeight: 'bold',
};

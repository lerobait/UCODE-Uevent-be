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

interface CompanyNewsProps {
  name: string;
  companyName: string;
  newsTitle: string;
  link: string;
}

export const CompanyNews = ({
  name,
  companyName,
  newsTitle,
  link,
}: CompanyNewsProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {companyName} published a new update: {newsTitle}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Text style={logo}>Uevent</Text>
          </Section>
          <Section style={contentContainer}>
            <Heading style={title}>Company News</Heading>
            <Text style={greeting}>Hello, {name} 👋</Text>
            <Text style={paragraph}>
              <strong style={strongText}>{companyName}</strong> has published a
              new announcement that might interest you:
            </Text>
            <Section style={newsBlock}>
              <Text style={newsTitleStyle}>{newsTitle}</Text>
              <Text style={newsDate}>
                Published on {formatDate(new Date())}
              </Text>
              <Section style={btnContainer}>
                <Link style={button} href={link}>
                  Read full announcement
                </Link>
              </Section>
            </Section>
            <Text style={paragraph}>
              Stay up to date with the latest news and announcements from{' '}
              {companyName} and other companies on our platform.
            </Text>
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

export default CompanyNews;

// Helper function to format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

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
  borderRadius: '0 0 8px 8px',
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

const strongText = {
  fontWeight: '600',
  color: '#0f172a',
};

const newsBlock = {
  backgroundColor: '#f5f3ff',
  padding: '20px',
  borderRadius: '6px',
  margin: '24px 0',
  border: '1px solid #ddd6fe',
  position: 'relative' as const,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const newsTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#4f46e5',
  margin: '0 0 12px',
};

const newsDate = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0 0 16px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '16px 0 0 0',
  width: '100%', // Ensure container takes full width
};

const button = {
  backgroundColor: '#4f46e5',
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

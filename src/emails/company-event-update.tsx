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

interface EventUpdateTemplateProps {
  name: string;
  eventTitle: string;
  companyName: string;
  link: string;
}

export const CompanyEventUpdate = ({
  name,
  eventTitle,
  companyName,
  link,
}: EventUpdateTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {companyName} updated the event: {eventTitle}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Text style={logo}>Uevent</Text>
          </Section>
          <Section style={contentContainer}>
            <Heading style={title}>Event Update</Heading>
            <Text style={greeting}>Hi {name},</Text>
            <Text style={paragraph}>
              <strong style={strongText}>{companyName}</strong> has made updates
              to an event you're following:
            </Text>
            <Section style={eventBlock}>
              <Text style={eventTitleStyle}>{eventTitle}</Text>
              <Text style={updateMessage}>
                The event details have been modified. Click below to see what's
                changed.
              </Text>
              <Section style={btnContainer}>
                <Link style={button} href={link}>
                  View updated event
                </Link>
              </Section>
            </Section>
            <Text style={paragraph}>
              Stay informed about any further changes to this event by keeping
              notifications enabled.
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

export default CompanyEventUpdate;

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

const eventBlock = {
  backgroundColor: '#fffbeb',
  padding: '20px',
  borderRadius: '6px',
  margin: '24px 0',
  border: '1px solid #fef3c7',
  position: 'relative' as const,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const eventTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#b45309',
  margin: '0 0 16px',
};

const updateMessage = {
  fontSize: '14px',
  color: '#92400e',
  margin: '0 0 16px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '16px 0 0 0',
  width: '100%', // Ensure container takes full width
};

const button = {
  backgroundColor: '#d97706',
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

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface CompanyEventCancelledProps {
  name: string;
  companyName: string;
  eventTitle: string;
}

export const CompanyEventDelete = ({
  name,
  companyName,
  eventTitle,
}: CompanyEventCancelledProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {companyName} cancelled the event: {eventTitle}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Text style={logo}>Uevent</Text>
          </Section>
          <Section style={contentContainer}>
            <Heading style={title}>Event Cancelled</Heading>
            <Text style={greeting}>Hello {name},</Text>
            <Text style={paragraph}>
              We regret to inform you that{' '}
              <strong style={strongText}>{companyName}</strong> has cancelled
              the following event:
            </Text>
            <Section style={eventBlock}>
              <Text style={eventTitleStyle}>{eventTitle}</Text>
              <Text style={cancelBadge}>Cancelled</Text>
            </Section>
            <Text style={paragraph}>
              We understand this might be disappointing. Any payments you've
              made will be automatically refunded within 5-7 business days.
            </Text>
            <Text style={paragraph}>
              Stay tuned for future events from {companyName} and other
              organizers on our platform.
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

export default CompanyEventDelete;

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
  backgroundColor: '#fef2f2',
  padding: '20px',
  borderRadius: '6px',
  margin: '24px 0',
  border: '1px solid #fecaca',
  position: 'relative' as const,
};

const eventTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#b91c1c',
  margin: '0 0 8px',
};

const cancelBadge = {
  position: 'absolute' as const,
  top: '20px',
  right: '20px',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '500',
  padding: '4px 12px',
  borderRadius: '9999px',
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

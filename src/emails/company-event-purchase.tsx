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

interface ComapnyEventPurchaseProps {
  name: string;
  eventTitle: string;
  price: number;
  eventStartDate: string;
  eventEndDate: string;
  link: string;
}

export const CompanyEventPurchase = ({
  name,
  eventTitle,
  price,
  eventStartDate,
  eventEndDate,
  link,
}: ComapnyEventPurchaseProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your ticket for "{eventTitle}" has been successfully purchased!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Text style={logo}>Uevent</Text>
          </Section>
          <Section style={successBanner}>
            <Text style={successIcon}>✓</Text>
            <Text style={successText}>Payment Successful</Text>
          </Section>
          <Section style={contentContainer}>
            <Heading style={title}>Your Ticket is Confirmed</Heading>
            <Text style={greeting}>Hi {name},</Text>
            <Text style={paragraph}>
              Thank you for your purchase! Your ticket for{' '}
              <strong style={strongText}>{eventTitle}</strong> has been
              confirmed.
            </Text>

            <Section style={eventBlock}>
              <Text style={eventTitleStyle}>{eventTitle}</Text>
              <Section style={detailRow}>
                <Text style={detailLabel}>Date:</Text>
                <Text style={detailValue}>
                  {eventStartDate} - {eventEndDate}
                </Text>
              </Section>
              <Section style={detailRow}>
                <Text style={detailLabel}>Price:</Text>
                <Text style={detailValue}>${price.toFixed(2)}</Text>
              </Section>
              <Section style={detailRow}>
                <Text style={detailLabel}>Status:</Text>
                <Text style={detailValue}>
                  <span style={confirmedBadge}>Confirmed</span>
                </Text>
              </Section>
            </Section>

            <Section style={btnContainer}>
              <Link style={button} href={link}>
                View Event Details
              </Link>
            </Section>

            <Text style={paragraph}>
              We look forward to seeing you at the event! Add this event to your
              calendar to make sure you don't miss it.
            </Text>

            <Section style={noteBlock}>
              <Text style={noteText}>
                <strong style={strongText}>Note:</strong> This ticket serves as
                your official receipt. You may be asked to show this email at
                the event entrance.
              </Text>
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

export default CompanyEventPurchase;

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

const successBanner = {
  backgroundColor: '#ecfdf5',
  padding: '16px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #d1fae5',
};

const successIcon = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  lineHeight: '32px',
  textAlign: 'center' as const,
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const successText = {
  color: '#047857',
  fontSize: '16px',
  fontWeight: '500',
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
  backgroundColor: '#f0fdfa',
  padding: '20px',
  borderRadius: '6px',
  margin: '24px 0',
  border: '1px solid #99f6e4',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const eventTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#047857',
  margin: '0 0 16px',
};

const detailRow = {
  display: 'flex' as const,
  margin: '8px 0',
};

const detailLabel = {
  width: '80px',
  color: '#64748b',
  fontSize: '14px',
  margin: '0',
};

const detailValue = {
  flex: '1',
  color: '#0f172a',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const confirmedBadge = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '500',
  padding: '4px 12px',
  borderRadius: '9999px',
  display: 'inline-block',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
  width: '100%', // Ensure container takes full width
};

const button = {
  backgroundColor: '#10b981',
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

const noteBlock = {
  backgroundColor: '#f8fafc',
  borderRadius: '6px',
  padding: '16px',
  margin: '24px 0 0',
  border: '1px solid #e2e8f0',
};

const noteText = {
  color: '#334155',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
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

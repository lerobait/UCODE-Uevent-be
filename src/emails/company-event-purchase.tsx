import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

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
          <Heading style={heading}>Hi {name},</Heading>
          <Text style={text}>
            Your purchase was successful! You've secured your spot for{' '}
            <b style={bold}>{eventTitle}</b>.
          </Text>

          <Section style={eventBlock}>
            <Text style={eventTitleStyle}>{eventTitle}</Text>
            <Text style={eventDate}>
              {eventStartDate} - {eventEndDate}
            </Text>
            <Text style={eventPrice}>Price: ${price}</Text>
          </Section>

          <Section style={btnContainer}>
            <Link style={button} href={link}>
              View Event Details
            </Link>
          </Section>

          <Text style={text}>
            We look forward to seeing you at the event! You can find all the
            details by clicking the link above.
          </Text>
          <Text style={paragraph}>
            Best,
            <br />
            The Uevent Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CompanyEventPurchase;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  padding: '40px 32px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  maxWidth: '600px',
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '16px',
};

const text = {
  fontSize: '16px',
  color: '#4b5563',
  lineHeight: '24px',
  marginBottom: '16px',
};

const bold = {
  color: '#111827',
};

const eventBlock = {
  backgroundColor: '#ecfdf5',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '20px',
  marginBottom: '24px',
};

const eventTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#047857',
  marginBottom: '8px',
};

const eventDate = {
  fontSize: '14px',
  color: '#047857',
  marginBottom: '4px',
};

const eventPrice = {
  fontSize: '14px',
  color: '#047857',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#10b981',
  color: '#ffffff',
  padding: '14px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

export const SAMPLE_RESPONSE = {
  "from": "powder",
  "hasCode": true,
  "text": "I'm creating a subscription renewal email template with details about the plan using React Email components. This template will be responsive and include key information to encourage renewal.",
  "emailTemplateName": "SubscriptionRenewalTemplate",
  "code": `
import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Img,
} from '@react-email/components';

const SubscriptionRenewalEmail = ({ name, planName, expiryDate, price }) => (
  <Html>
    <Head />
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Img
          src="https://example.com/logo.png"
          alt="Company Logo"
          width="150"
          height="50"
          style={logoStyle}
        />
        <Section style={sectionStyle}>
          <Text style={headerStyle}>Your Subscription is Expiring Soon</Text>
          <Text style={textStyle}>
            Hello {name},
          </Text>
          <Text style={textStyle}>
            Your {planName} subscription is set to expire on {expiryDate}. Don't miss out on our great features and renew today!
          </Text>
          <Hr style={hrStyle} />
          <Text style={subheaderStyle}>Plan Details:</Text>
          <Text style={textStyle}>
            • Plan: {planName}<br />
            • Price: $65/month<br />
            • Expiry Date: {expiryDate}
          </Text>
          <Button pX={20} pY={12} style={buttonStyle} href="https://example.com/renew">
            Renew Now
          </Button>
          <Text style={textStyle}>
            By renewing, you'll continue to enjoy all the benefits of your {planName} subscription without interruption.
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            If you have any questions, please don't hesitate to contact our support team.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const bodyStyle = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const containerStyle = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '100%',
  maxWidth: '600px',
};

const sectionStyle = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '5px',
  border: '1px solid #e6ebf1',
};

const logoStyle = {
  margin: '0 auto 32px',
  display: 'block',
};

const headerStyle = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  textAlign: 'center',
};

const subheaderStyle = {
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const textStyle = {
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#484848',
};

const buttonStyle = {
  backgroundColor: '#5469d4',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
};

const hrStyle = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footerStyle = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#9ca299',
  textAlign: 'center',
};

export default SubscriptionRenewalEmail;
`,
  "codeBreakdown": [
    "The template uses React Email components for structure and styling.",
    "A responsive layout is implemented with a max-width container and mobile-friendly styles.",
    "The email includes a logo, personalized greeting, subscription details, and a clear call-to-action button.",
    "Inline styles are used for maximum email client compatibility.",
    "The design is clean and professional, with a clear hierarchy of information.",
    "Dynamic content is included using props for easy customization (name, planName, expiryDate, price).",
    "A footer with support information is added for additional assistance."
  ],
  "summary": "This React Email template provides a professional and engaging subscription renewal email. It's designed to be responsive, informative, and action-oriented, encouraging users to renew their subscription promptly."
}
export const SAMPLE_CODE = `import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const StripeWelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src="https://cdn.iconscout.com/icon/free/png-512/free-stripe-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-3030362.png"
            width="49"
            height="21"
            alt="Stripe"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Thanks for submitting your account information. You're now ready to
            make live transactions with Stripe!
          </Text>
          <Text style={paragraph}>
            You can view your payments and a variety of other information about
            your account right from your dashboard.
          </Text>
          <Button style={button} href="https://dashboard.stripe.com/login">
            View your Stripe Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            If you haven't finished your integration, you might find our{" "}
            <Link style={anchor} href="https://stripe.com/docs">
              docs
            </Link>{" "}
            handy.
          </Text>
          <Text style={paragraph}>
            Once you're ready to start accepting payments, you'll just need to
            use your live{" "}
            <Link
              style={anchor}
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              API keys
            </Link>{" "}
            instead of your test API keys. Your account can simultaneously be
            used for both test and live requests, so you can continue testing
            while accepting live payments. Check out our{" "}
            <Link style={anchor} href="https://stripe.com/docs/dashboard">
              tutorial about account basics
            </Link>
            .
          </Text>
          <Text style={paragraph}>
            Finally, we've put together a{" "}
            <Link
              style={anchor}
              href="https://stripe.com/docs/checklist/website"
            >
              quick checklist
            </Link>{" "}
            to ensure your website conforms to card network standards.
          </Text>
          <Text style={paragraph}>
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our{" "}
            <Link style={anchor} href="https://support.stripe.com/">
              support site
            </Link>
            .
          </Text>
          <Text style={paragraph}>— The Stripe team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StripeWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
`

export const SAMPLE_EMAIL_HTML = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Security Alert: Multiple Failed Login Attempts Detected
    <div>
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
      ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏ ‌​‍‎‏
    </div>
  </div>
  <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:580px;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
            <p
              style="font-size:24px;line-height:24px;margin:0 auto;font-weight:bold;color:#1a1a1a;text-align:center;padding:20px 0">
              Chakravyu Labs
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding:24px;background-color:#ffffff;border:1px solid #eee;border-radius:5px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:16px;line-height:24px;margin:16px 0;color:#333">
                      Hello,
                    </p>
                    <p
                      style="font-size:16px;line-height:24px;margin:16px 0;color:#333">
                      We&#x27;ve detected multiple unsuccessful login attempts
                      to your Chakravyu Labs account. As a security measure,
                      we&#x27;re reaching out to ensure you&#x27;re aware of
                      this activity.
                    </p>
                    <p
                      style="font-size:16px;line-height:24px;margin:16px 0;color:#333">
                      <strong>Details:</strong><br />• Multiple failed login
                      attempts detected<br />• Time:
                      <!-- -->Thu, 30 Jan 2025 12:12:28 GMT<br />• Location:
                      Various IP addresses
                    </p>
                    <p
                      style="font-size:16px;line-height:24px;margin:16px 0;color:#333">
                      If this wasn&#x27;t you, we recommend resetting your
                      password immediately to secure your account.
                    </p>
                    <a
                      href="https://chakravyulabs.com/reset-password"
                      style="line-height:100%;text-decoration:none;display:block;max-width:200px;mso-padding-alt:0px;background-color:#2563eb;border-radius:4px;color:#fff;font-size:16px;text-align:center;padding:12px 20px 12px 20px;margin:20px auto"
                      target="_blank"><span><!--[if mso
                          ]><i
                            style="mso-font-width:500%;mso-text-raise:18"
                            hidden
                            >&#8202;&#8202;</i
                          ><!
                        [endif]--></span><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Reset
                        Password</span><span><!--[if mso
                          ]><i style="mso-font-width:500%" hidden
                            >&#8202;&#8202;&#8203;</i
                          ><!
                        [endif]--></span></a>
                    <p
                      style="font-size:16px;line-height:24px;margin:16px 0;color:#333">
                      <strong>Security Tips:</strong><br />• Use a strong,
                      unique password<br />• Enable two-factor
                      authentication<br />•
                      Never share your login credentials
                    </p>
                    <hr
                      style="width:100%;border:none;border-top:1px solid #eaeaea;margin:20px 0" />
                    <p
                      style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">
                      If you did not request this email, please contact our
                      support team immediately at<!-- -->
                      <a
                        href="mailto:security@chakravyulabs.com"
                        style="color:#067df7;text-decoration-line:none"
                        target="_blank">security@chakravyulabs.com</a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">
              ©
              <!-- -->2025<!-- -->
              Chakravyu Labs. All rights reserved.<br />This is an automated
              message, please do not reply directly to this email.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
    `

export const SAMPLE_CLAUDE_API_RESPONSE = {
  "id": "msg_01JzYnRoCYuBp8Y7RHydbzyF", "type": "message", "role": "assistant", "model": "claude-3-5-sonnet-20241022", "content": [{
    "type": "text", "text": "<Powder>\n\
  <PowderTitle>\n\
    Exciting Product Update: New Features Launch Email\n\
  </PowderTitle>\n\
  <PowderStart>\n\
    Crafting an engaging email template to announce the latest product features and drive user engagement.\n\
  </PowderStart>\n\
  <PowderEmailTemplateName>\n\
    Product Feature Update Template\n\
  </PowderEmailTemplateName>\n\
  <PowderAction>\n\
    ```tsx\n\
    import {\n\
      Html,\n\
      Head,\n\
      Preview,\n\
      Body,\n\
      Container,\n\
      Section,\n\
      Text,\n\
      Button,\n\
      Hr,\n\
      Img,\n\
    } from \"@react-email/components\";\n\
    import * as React from \"react\";\n\
\n\
    const main = {\n\
      backgroundColor: \"#f4f4f4\",\n\
      fontFamily: \"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif\",\n\
    } as React.CSSProperties;\n\
\n\
    const container = {\n\
      maxWidth: \"600px\",\n\
      margin: \"0 auto\",\n\
      backgroundColor: \"#ffffff\",\n\
      borderRadius: \"8px\",\n\
      boxShadow: \"0 4px 6px rgba(0,0,0,0.1)\",\n\
    } as React.CSSProperties;\n\
\n\
    const header = {\n\
      backgroundColor: \"#2C5282\",\n\
      color: \"#ffffff\",\n\
      padding: \"20px\",\n\
      textAlign: \"center\" as const,\n\
      borderTopLeftRadius: \"8px\",\n\
      borderTopRightRadius: \"8px\",\n\
    } as React.CSSProperties;\n\
\n\
    const sectionStyle = {\n\
      padding: \"20px\",\n\
    } as React.CSSProperties;\n\
\n\
    const textStyle = {\n\
      color: \"#333333\",\n\
      lineHeight: \"1.6\",\n\
      fontSize: \"16px\",\n\
    } as React.CSSProperties;\n\
\n\
    const buttonStyle = {\n\
      backgroundColor: \"#3182CE\",\n\
      color: \"#ffffff\",\n\
      padding: \"12px 24px\",\n\
      borderRadius: \"5px\",\n\
      textDecoration: \"none\",\n\
      display: \"inline-block\",\n\
      fontWeight: \"bold\",\n\
      margin: \"20px 0\",\n\
    } as React.CSSProperties;\n\
\n\
    const featureList = {\n\
      backgroundColor: \"#F7FAFC\",\n\
      padding: \"15px\",\n\
      borderRadius: \"5px\",\n\
      marginBottom: \"20px\",\n\
    } as React.CSSProperties;\n\
\n\
    export default function ProductUpdateEmail() {\n\
      return (\n\
        <Html>\n\
          <Head />\n\
          <Preview>Discover Our Newest Features â€“ Elevate Your Experience!</Preview>\n\
          <Body style={main}>\n\
            <Container style={container}>\n\
              <Section style={header}>\n\
                <Text style={{\n\
                  margin: \"0\",\n\
                  fontSize: \"24px\",\n\
                  fontWeight: \"bold\",\n\
                }}>\n\
                  Exciting Product Updates\n\
                </Text>\n\
              </Section>\n\
              \n\
              <Section style={sectionStyle}>\n\
                <Text style={textStyle}>\n\
                  Hello Valued User,\n\
                </Text>\n\
                \n\
                <Text style={textStyle}>\n\
                  We're thrilled to announce our latest feature release that will transform your experience!\n\
                </Text>\n\
                \n\
                <Section style={featureList}>\n\
                  <Text style={{...textStyle, fontWeight: \"bold\", marginBottom: \"10px\"}}>\n\
                    What's New:\n\
                  </Text>\n\
                  <Text style={textStyle}>\n\
                    â€¢ Enhanced Performance Optimization\n\
                    â€¢ Streamlined User Interface\n\
                    â€¢ Advanced Analytics Dashboard\n\
                    â€¢ One-Click Integrations\n\
                  </Text>\n\
                </Section>\n\
                \n\
                <Text style={textStyle}>\n\
                  These updates are designed to make your workflow smoother, faster, and more intuitive than ever before.\n\
                </Text>\n\
                \n\
                <Button href=\"https://yourplatform.com/features\" style={buttonStyle}>\n\
                  Explore New Features\n\
                </Button>\n\
                \n\
                <Hr />\n\
                \n\
                <Text style={{...textStyle, fontSize: \"14px\", color: \"#718096\"}}>\n\
                  Not interested in updates? <a href=\"#\" style={{color: \"#3182CE\"}}>Manage Email Preferences</a>\n\
                </Text>\n\
              </Section>\n\
            </Container>\n\
          </Body>\n\
        </Html>\n\
      );\n\
    }\n\
    ```\n\
  </PowderAction>\n\
  <PowderCodeBreakdown>\n\
    [\n\
      \"Created responsive email layout\",\n\
      \"Added clear feature highlights section\",\n\
      \"Implemented compelling call-to-action button\",\n\
      \"Included email preference management link\"\n\
    ]\n\
  </PowderCodeBreakdown>\n\
  <PowderFinish>\n\
    A dynamic and informative email template that effectively communicates product updates and encourages user engagement.\n\
  </PowderFinish>\n\
</Powder>"
  }], "stop_reason": "end_turn", "stop_sequence": null, "usage": { "input_tokens": 766, "cache_creation_input_tokens": 0, "cache_read_input_tokens": 0, "output_tokens": 1132 }
}



export const SAMPLE_JSON_RES = {
  "title": "Exclusive Discount Offer Email",
  "description": "Creating a limited-time discount email template for engaged subscribers.",
  "emailTemplateName": "DiscountOfferEmail",
  "code": "import { Html, Head, Body, Container, Text, Button } from '@react-email/components';\nimport * as React from 'react';\n\nconst styles = { body: { backgroundColor: '#fff', fontFamily: 'Arial' }, button: { backgroundColor: '#FF5733', padding: '12px', borderRadius: '5px', color: '#fff', textAlign: 'center', textDecoration: 'none' } };\n\nexport default function DiscountEmail() {\n  return (\n    <Html>\n      <Head />\n      <Body style={styles.body}>\n        <Container>\n          <Text>Get 20% Off - Limited Time Only!</Text>\n          <Button href='https://example.com/deal' style={styles.button}>Claim Offer</Button>\n        </Container>\n      </Body>\n    </Html>\n  );\n}",
  "codeBreakdown": [
    "Added a structured HTML email template",
    "Used inline styles for better email client compatibility",
    "Designed a strong CTA button to drive conversions"
  ],
  "conclusion": "This email effectively drives urgency and engagement for a limited-time discount offer."
}

import { z } from "zod";

export const chatIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid Chat Id" })

export const llmResponseSchema = z.object({
  hasCode: z.boolean(),
  preface: z.string(),
  emailTemplateName: z.string(),
  code: z.string(),
  codeBreakdown: z.array(z.string()),
  summary: z.string(),
}).partial();


export const ResponseKeysType = z.enum(["preface", "emailTemplateName", "code", "codeBreakdown", "summary"]);
export type LLMResponseType = z.infer<typeof llmResponseSchema>;

export type PowderMessageType = LLMResponseType & {
  from: "powder";
  text?: string;
  codeLink?: string;
  isGenerated?: boolean;
  chatId?: string;
};

export type UserMessageType = {
  from: "user";
  text: string;
  createdAt: Date;
};

export type ChatType = (UserMessageType | PowderMessageType)[];

export const SAMPLE_CONV: ChatType = [
  { from: "user", text: "Hey, can you generate a welcome email template for my users?", createdAt: new Date("2024-03-02T10:00:00Z") },

  {
    from: "powder",
    preface: "Sure! Here’s a professional welcome email template:",
    emailTemplateName: "Welcome Email",
    hasCode: true,
    code: `
        <html>
          <body>
            <h1>Welcome to Our Service!</h1>
            <p>We're excited to have you onboard.</p>
            <p>Click <a href="#">here</a> to get started.</p>
          </body>
        </html>
      `,
    codeBreakdown: [
      "The `<h1>` tag contains the email heading.",
      "The `<p>` tags include the welcome message.",
      "A clickable `<a>` link for user engagement."
    ],
    summary: "This template provides a warm welcome with a call-to-action link.",
    codeLink: "https://example.com/welcome-email",
    isGenerated: true
  },

  { from: "user", text: "Looks good! But can you make it more minimal?", createdAt: new Date("2024-03-02T10:02:00Z") },

  {
    from: "powder",
    preface: "Absolutely! Here’s a minimal version:",
    emailTemplateName: "Minimal Welcome Email",
    hasCode: true,
    code: `
        <html>
          <body>
            <h1>Welcome!</h1>
            <p>We’re glad you’re here.</p>
          </body>
        </html>
      `,
    codeBreakdown: [
      "Simplified heading to just 'Welcome!'.",
      "Short and direct message."
    ],
    summary: "A concise welcome email with minimal text.",
    isGenerated: true
  },
  { from: "user", text: "Thanks! This one looks perfect.", createdAt: new Date("2024-03-02T10:05:00Z") },
  {
    from: "powder",
    preface: "I am glad you liked it",
    hasCode: false,
  },
];

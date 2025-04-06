# Powder

Powder is an AI-powered tool that generates **production-ready React Email templates** using **TailwindCSS** with **persuasive email copywriting**. It is designed to streamline the process of creating **mobile-responsive, visually appealing, and high-converting** email templates without manual coding.

![Powder's Chat Page](https://cdn.ashokasec.com/powder-demo.png)

## Features

- 🚀 **React Email Components** – Uses `Html`, `Head`, `Body`, `Container`, `Text`, `Button`, etc.
- 🎨 **TailwindCSS Styling** – Ensures clean, responsive, and maintainable email designs.
- ✍️ **Inline Persuasive Copy** – AI-generated, context-aware email content embedded directly within JSX.
- 📱 **Mobile-First Design** – Optimized layouts for seamless email viewing on any device.
- ✅ **TypeScript-Only** – Enforces type safety and best coding practices.
- ⚡ **Instant Email Generation** – No need for separate content writing or styling.

## Engineering Overview

#### **Tech Stack**:
- __Next.Js__ - **Frontend & Backend**
- **LLM APIs:**
  - **OpenAI 4o-mini** – Used to generate concise titles from the first user prompt.
  - **Anthropic** and **Gemini API** – Handles core email generation.
- **MongoDB** - Database
- **Vercel's `ai` SDK** - to interact with LLM APIs.
- **ShadcnUI** - for UI components.

A separate blog will detail the engineering challenges faced, what was learned, and how they were tackled.

## Prompt

You can get or update the system here at [`EMAIL_GENERATION_PROMPT`](https://github.com/ashokasec/powder/blob/main/src/lib/ai/prompts.ts).

## Usage

Powder generates email templates based on a simple command input. If the request is vague, it may ask follow-up questions to gather more context.

**Example Inputs**:
- `email for product launch`
- `email inviting users to beta test`
- `email for discount offer`

**Output**:
- Proper use of React Email components.
- Mobile-first, responsive design with TailwindCSS.
- Persuasive, benefit-driven copy directly embedded in JSX.
- Compliance with email best practices.

**You will receive**:
- React Email JSX code if you want to integrate it into your codebase.
- Rendered HTML code if needed for direct usage.

## Contributing

If you're interested in contributing or providing feedback, feel free to [reach out](https://x.com/ashokasec). Open-source contributions may be considered based on demand.

## License

TBD – Not yet open-sourced.

import { geist_sans } from "@/lib/fonts";
import React from "react";

const PROMPTS = [
  "Password reset email with a clean layout",
  "Simple welcome email with a bold header",
  "Shipping confirmation email with tracking details",
  "Subscription renewal email with details about the plan",
  "Limited-time sale email with a countdown timer",
  "Order cancellation email with a refund summary and support contact",
  "Thank-you email after signup with a CTA to explore features",
];

const SamplePrompts = () => {
  return (
    <ul
      className="flex flex-wrap justify-center px-2.5 pb-4 pt-2 space-x-2.5 space-y-2.5"
      style={geist_sans.style}
    >
      <li></li>
      {PROMPTS.map((prompt, idx) => (
        <li
          key={idx}
          className="text-[13px] border border-white/5 text-gray-300 font-medium leading-none p-1.5 rounded-md hover:bg-gray-300/5 hover:border-white/10 cursor-pointer transition-all"
        >
          {prompt}
        </li>
      ))}
    </ul>
  );
};

export default SamplePrompts;

import Logo from "@/components/application-layout/logo";
import { Button } from "@/components/ui/button";
import TextGradient from "@/components/ui/text-gradient";
import { geist_sans } from "@/lib/misc/fonts";
import Link from "next/link";

const PROMPTS = [
  "Password reset email with a clean layout",
  "Simple welcome email with a bold header",
  "Shipping confirmation email with tracking details",
  "Subscription renewal email with details about the plan",
  "Limited-time sale email with a countdown timer",
  "Order cancellation email with a refund summary and support contact",
  "Thank-you email after signup with a CTA to explore features",
];

const page = () => {
  return (
    <>
      {/* <div className="absolute h-screen w-full top-0 left-0 bg-[url('/images/background.png')] -z-10 blur"></div> */}
      <div className="flex flex-col justify-between h-screen max-w-screen-lg mx-auto w-full ">
        <header className=" w-full mx-auto h-16 flex items-center justify-between px-4">
          <Logo />
          <nav>
            <ul>
              <li></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              style={geist_sans.style}
              className="border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link
                href="https://github.com/ashokasec/uncover.1"
                className="text-sm tracking-wide font-normal"
              >
                Github
              </Link>
            </Button>
            {/* <ThemeChanger /> */}
          </div>
        </header>
        <main className="h-fit w-full flex items-center flex-col leading-none container">
          <TextGradient className=" from-blue-200 via-blue-100 to-blue-50 px-4 text-center">
            <h1
              className="text-[2.5rem] font-bold leading-tight"
              style={geist_sans.style}
            >
              Prompts to React Email Template
            </h1>
          </TextGradient>
          <h3
            style={geist_sans.style}
            className="mt-3 text-base text-gray-400 px-4"
          ></h3>
          <div className="relative">
            <div className="my-10 mx-auto max-w-[60%] scale-105">
              {/* <ChatInput /> */}
            </div>
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
          </div>
        </main>
        <div></div>
      </div>
    </>
  );
};

export default page;

import { geist_sans } from "@/lib/misc/fonts";
import Markdown from "markdown-to-jsx";
import { Button } from "./ui/button";
import React from "react";
import { AIResponseStatus } from "@/lib/types/chat";
import { AnimatedShinyText } from "./ui/shiny-text";

const CustomAfterCode = ({
  msgId,
  setCodeMsgId,
}: {
  msgId: string;
  setCodeMsgId: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="border p-2 rounded-md flex items-center justify-between">
    <span>Updating</span>
    <div className="space-x-2">
      <Button
        onClick={() => {
          console.log(msgId);
          setCodeMsgId(msgId);
        }}
      >
        Code
      </Button>
      <Button>Preview</Button>
    </div>
  </div>
);

const CodeWithCustomComponent = ({
  children,
  className,
  msgId,
  setCodeMsgId,
}: {
  children: React.ReactNode;
  className?: string;
  msgId: string;
  setCodeMsgId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isInline = !className?.includes("language-");
  if (!isInline) return <h1 className={className}>{children}</h1>;

  return (
    <>
      <CustomAfterCode msgId={msgId} setCodeMsgId={setCodeMsgId} />
    </>
  );
};

export const UserChatBubble = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="aspect-square size-7 bg-blue-600 text-white text-sm leading-none rounded-full grid place-items-center select-none mr-3">
        S
      </div>
      <div className="text-base leading-relaxed space-y-2 text-gray-300 rounded-br-none max-w-[95%]">
        <p
          style={geist_sans.style}
          className="text-gray-300 text-[15px] mt-0.5"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export const PowderChatBubble = ({
  content,
  msgId,
  setCodeMsgId,
}: {
  content: string;
  msgId: string;
  setCodeMsgId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="text-base leading-relaxed flex">
      <div className="aspect-square h-7 min-w-7 rounded-full overflow-hidden grid place-items-center select-none mr-3 mt-1 shadow-lg shadow-black">
        <img
          src="/images/powder.gif"
          className="bg-blend-multiply saturate-200 mix-blend-soft-light hue-rotate-[165deg] aspect-square invert  size-6"
        />
      </div>
      <Markdown
        className="powder-response text-[15px] [&>*:first-child]:mt-2"
        style={geist_sans.style}
        options={{
          overrides: {
            pre: {
              component: ({ children }: { children: React.ReactNode }) => (
                <CodeWithCustomComponent
                  msgId={msgId}
                  setCodeMsgId={setCodeMsgId}
                >
                  {children}
                </CodeWithCustomComponent>
              ),
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
export const PowderThinking = ({ status }: { status: AIResponseStatus }) => {
  return (
    status === "submitted" && (
      <div className="text-base leading-relaxed flex px-4">
        <div className="aspect-square h-7 min-w-7 rounded-full overflow-hidden grid place-items-center select-none mr-3 mt-1 shadow-lg shadow-black">
          <img
            src="/images/powder.gif"
            className="bg-blend-multiply saturate-200 mix-blend-soft-light hue-rotate-[165deg] aspect-square invert  size-6"
          />
        </div>
        <AnimatedShinyText className="inline-flex mx-0 mt-1 text-[15px] tracking-wide items-center justify-center py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span style={geist_sans.style}>✨ Thinking...</span>
        </AnimatedShinyText>
      </div>
    )
  );
};

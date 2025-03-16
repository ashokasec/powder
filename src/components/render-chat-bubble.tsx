import { geist_sans } from "@/lib/misc/fonts";
import { Code } from "lucide-react";
import { Button } from "./ui/button";
import { AssistantResponseType } from "@/lib/types/chat";

export const UserChatBubble = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="aspect-square size-7 bg-blue-600 text-white text-sm leading-none rounded-full grid place-items-center select-none mr-3">
        S
      </div>
      <div className="text-base leading-relaxed space-y-2 text-gray-300 rounded-br-none max-w-[95%]">
        <p
          style={geist_sans.style}
          className="text-gray-300 tracking-wide text-[15px] mt-0.5"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export const PowderChatBubble = ({
  response,
}: {
  response: AssistantResponseType;
}) => {
  return (
    <div className="text-base leading-relaxed space-y-2 rounded-xl rounded-bl-none border-border/50 flex">
      <div className="aspect-square h-7 min-w-7 rounded-full overflow-hidden grid place-items-center select-none mr-3 mt-1 shadow-lg shadow-black">
        <img
          src="/images/powder.gif"
          className="bg-blend-multiply saturate-200 mix-blend-soft-light hue-rotate-[165deg] aspect-square invert  size-6"
        />
      </div>
      <div className="space-y-5 text-[15px] tracking-wide">
        {response.text && (
          <p style={geist_sans.style} className="text-gray-300 !mt-0">
            {response.text}
          </p>
        )}
        {response.hasCode && response.hasCode === true && (
          <>
            {response.emailTemplateName &&
            response.emailTemplateName.length > 0 ? (
              <div className="py-1">
                <div className="leading-none flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center">
                    <Code className="h-4 mr-2" />
                    <span className="text-sm" style={geist_sans.style}>
                      {response.emailTemplateName}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      style={geist_sans.style}
                      className="font-medium"
                      variant="default"
                    >
                      Code
                    </Button>
                    <Button
                      size="sm"
                      style={geist_sans.style}
                      className="font-medium"
                      variant="secondary"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            <ul
              className="list-disc ml-4 space-y-1 text-gray-300"
              style={geist_sans.style}
            >
              {response.codeBreakdown &&
                response.codeBreakdown.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            {response.summary && (
              <p style={geist_sans.style} className="text-gray-300">
                {response.summary}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

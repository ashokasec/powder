import { bricolage, geist_sans } from "@/lib/misc/fonts";
import { PowderMessageType } from "@/lib/types/chat";
import { Atom, Code } from "lucide-react";
import { Button } from "./ui/button";
import { APP_NAME } from "@/lib/constants/app";

export const UserChatBubble = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-end">
      <div className="text-base leading-relaxed space-y-2 bg-[#28282bdb] text-gray-300 border rounded-xl rounded-br-none border-border/50 pt-2 pb-2.5 px-4 max-w-[95%]">
        <p style={geist_sans.style} className="text-gray-300">
          {text}
        </p>
      </div>
    </div>
  );
};

export const PowderChatBubble = ({
  response,
}: {
  response: PowderMessageType;
}) => {
  return (
    <div className="text-base leading-relaxed space-y-2 rounded-xl rounded-bl-none border-border/50 pt-4 pb-2.5 px-2 max-w-[95%]">
      <div
        style={bricolage.style}
        className="font-semibold text-gray-500 flex items-center leading-none"
      >
        <Atom className="size-4 mr-1" />
        <span className="pt-[1px]">{APP_NAME}</span>
      </div>
      <div className="space-y-3">
        {response.preface && (
          <p style={geist_sans.style} className="text-gray-300">
            {response.preface}
          </p>
        )}
        {response.hasCode && response.hasCode === true && (
          <>
            {response.emailTemplateName &&
            response.emailTemplateName.length > 0 ? (
              <div className="py-1">
                <div className="leading-none flex items-center justify-between p-2 rounded-md border">
                  <div className="flex items-center">
                    <Code className="h-4 mr-2" />
                    <span className="text-sm" style={geist_sans.style}>
                      {response.emailTemplateName}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    style={geist_sans.style}
                    className="font-medium"
                    variant="secondary"
                  >
                    Code
                  </Button>
                </div>
              </div>
            ) : null}
            <ul
              className="list-disc ml-4 text-base space-y-1 text-gray-300"
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

import { HistoryPanelTrigger } from "@/components/application-layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AutosizeTextarea } from "@/components/ui/resizable-textarea";
import { geist_sans } from "@/lib/fonts";
import { ConversationType } from "@/types/chat";
import ChatPlayground from "./chat";

export const ConversationPlayground = ({
  conversation,
}: {
  conversation: ConversationType;
}) => {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col justify-between bg-[#070808]/20 !border-l-0">
      <div className="grid grid-cols-[4rem_auto]">
        <div className="mt-4 flex justify-center w-full min-w-[3rem]">
          <HistoryPanelTrigger />
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent border-l-0">
          <ChatPlayground conversation={conversation} />
        </ScrollArea>
      </div>
      <div className="relative h-0">
        <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
          <div className="px-12 border-t py-4">
            <AutosizeTextarea
              placeholder="Describe your email..."
              maxHeight={248}
              autoFocus
              style={geist_sans.style}
              className="border text-[15.5px] border-border leading-relaxed bg-[#1a1a1c] text-gray-300"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

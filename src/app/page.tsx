import { NewChatInput } from "@/components/chat-input";
import { geist_sans } from "@/lib/misc/fonts";
import { Flame } from "lucide-react";

const page = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen max-w-screen-lg min-h-screen mx-auto w-full ">
        <main className="h-fit w-full flex items-center flex-col leading-none container relative bottom-10">
          <button className="rounded-full bg-white/[0.1] p-3 mb-6">
            <Flame size={24} strokeWidth={1.75} />
          </button>
          <h1
            className="text-4xl font-semibold leading-tight mb-12"
            style={geist_sans.style}
          >
            Create React Email Templates with AI
          </h1>
          <NewChatInput />
        </main>
        <div></div>
      </div>
    </>
  );
};

export default page;

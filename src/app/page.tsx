import AppSidebar from "@/components/application-layout/sidebar";
import NewChatInput from "@/components/new-chat-input";
import { auth } from "@/lib/auth/auth";

const page = async () => {
  const session = await auth();
  return (
    <>
      {!session ? null : <AppSidebar />}
      <div className="flex flex-col justify-center items-center h-screen max-w-screen-lg min-h-screen max-h-screen overflow-hidden mx-auto w-full">
        <main className="w-full grid grid-rows-2 container">
          <NewChatInput session={session} />
        </main>
      </div>
    </>
  );
};

export default page;

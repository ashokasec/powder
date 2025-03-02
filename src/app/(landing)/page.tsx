import Prompter from "./_components/prompter";
import Navbar from "@/components/application-layout/navbar";
import Header from "./_components/header";
import SamplePrompts from "./_components/sample-prompts";

const page = () => {
  return (
    <>
      {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,62,198,0.3),rgba(255,255,255,0))]"></div> */}
      <div className="flex flex-col justify-between h-screen max-w-screen-lg mx-auto w-full ">
        <Navbar />
        <main className="h-fit w-full flex items-center flex-col leading-none container">
          <Header />
          <div className="relative">
            <div className="my-10">
              <Prompter />
            </div>
            <SamplePrompts />
          </div>
        </main>
        <div></div>
      </div>
    </>
  );
};

export default page;

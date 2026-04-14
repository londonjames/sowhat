import InputArea from "@/components/InputArea";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 pt-20 pb-16">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
          What&rsquo;s the So What?
        </h1>
        <p className="mt-4 text-lg text-gray md:text-xl">
          Paste a document. Find out if your <span className="font-semibold">point</span> lands.
        </p>
      </div>
      <div className="mt-10 w-full max-w-lg">
        <InputArea />
      </div>
    </div>
  );
}

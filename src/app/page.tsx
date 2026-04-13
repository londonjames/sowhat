import InputArea from "@/components/InputArea";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <main className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            What&rsquo;s the So What?
          </h1>
          <p className="mt-4 text-lg text-gray">
            Paste a document. Find out if your point lands.
          </p>
        </div>
        <InputArea />
      </main>
    </div>
  );
}

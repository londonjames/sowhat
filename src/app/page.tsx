import Image from "next/image";
import InputArea from "@/components/InputArea";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 pt-16 pb-16">
      <div className="w-full max-w-2xl text-center">
        {/* Headline */}
        <h1
          className="text-3xl font-medium italic tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#1a5a8a" }}
        >
          Does your document convey a Clear So What?
        </h1>
        <p className="mt-4 text-xl text-gray md:text-2xl">
          Is its <span className="font-bold">intent</span> clear? Does it{" "}
          <span className="font-bold">deliver</span>? Is there a{" "}
          <span className="font-bold">narrative</span>?
        </p>

        {/* Stamp scale — 3 stamps with a line */}
        <div className="mt-8 w-full max-w-lg mx-auto">
          {/* Stamps row */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col items-center">
              <Image
                src="/stamps/lost.png"
                alt="Lost"
                width={160}
                height={80}
                className="h-auto w-[140px]"
              />
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/stamps/getting-there.png"
                alt="Getting There"
                width={160}
                height={80}
                className="h-auto w-[140px]"
              />
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/stamps/crystal-clear.png"
                alt="Crystal Clear"
                width={160}
                height={80}
                className="h-auto w-[140px]"
              />
            </div>
          </div>

          {/* Scale line with ticks */}
          <div className="relative mt-2" style={{ height: 16 }}>
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black" />
            <div className="relative flex h-full justify-between">
              {[0, 1, 2, 3, 4, 5, 6].map((n) => {
                const isAnchor = n === 0 || n === 3 || n === 6;
                return (
                  <div key={n} className="flex items-start justify-center" style={{ width: 1 }}>
                    <div
                      className={`bg-black ${isAnchor ? "h-4 w-px" : "h-2.5 w-px"}`}
                      style={{ marginTop: isAnchor ? 0 : 3 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Labels */}
          <div className="mt-1 flex justify-between">
            <span
              className="text-lg font-bold italic"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#8b3a3a" }}
            >
              Lost
            </span>
            <span
              className="text-lg font-bold italic"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#1a5a8a" }}
            >
              Getting There
            </span>
            <span
              className="text-lg font-bold italic"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#1a6b35" }}
            >
              Crystal Clear
            </span>
          </div>
        </div>

        {/* Input */}
        <div className="mt-8">
          <p className="text-lg text-foreground md:text-xl">
            Paste your document below, or upload a file.
          </p>
        </div>
      </div>
      <div className="mt-6 w-full max-w-lg">
        <InputArea />
      </div>
    </div>
  );
}

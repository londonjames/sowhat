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

        {/* Stamp scale */}
        <div className="mt-8 w-full">
          {/* Stamps row — 3 images at positions 1, 4, 7 on a 7-point scale */}
          <div className="flex items-end">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div key={n} className="flex min-w-0 flex-1 justify-center overflow-visible">
                {n === 1 ? (
                  <Image
                    src="/stamps/lost.png"
                    alt="Lost"
                    width={200}
                    height={100}
                    className="h-auto w-[170px] max-w-none shrink-0"
                  />
                ) : n === 4 ? (
                  <Image
                    src="/stamps/getting-there.png"
                    alt="Getting There"
                    width={200}
                    height={100}
                    className="h-auto w-[170px] max-w-none shrink-0"
                  />
                ) : n === 7 ? (
                  <Image
                    src="/stamps/crystal-clear.png"
                    alt="Crystal Clear"
                    width={200}
                    height={100}
                    className="h-auto w-[170px] max-w-none shrink-0"
                  />
                ) : (
                  <div className="h-[70px]" />
                )}
              </div>
            ))}
          </div>

          {/* Line + 7 ticks */}
          <div className="relative mt-1" style={{ height: 16 }}>
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black" />
            <div className="relative flex h-full">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                const isAnchor = n === 1 || n === 4 || n === 7;
                return (
                  <div key={n} className="flex min-w-0 flex-1 items-start justify-center">
                    <div
                      className={`bg-black ${isAnchor ? "h-4 w-px" : "h-2.5 w-px"}`}
                      style={{ marginTop: isAnchor ? 0 : 3 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Labels — only on anchors */}
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div key={n} className="flex min-w-0 flex-1 flex-col items-center overflow-visible">
                {n === 1 ? (
                  <>
                    <span className="text-sm font-medium text-black">1</span>
                    <span
                      className="mt-0.5 text-lg font-bold italic"
                      style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#8b3a3a" }}
                    >
                      Lost
                    </span>
                  </>
                ) : n === 4 ? (
                  <>
                    <span className="text-sm font-medium text-black">4</span>
                    <span
                      className="mt-0.5 text-lg font-bold italic"
                      style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#1a5a8a" }}
                    >
                      Getting There
                    </span>
                  </>
                ) : n === 7 ? (
                  <>
                    <span className="text-sm font-medium text-black">7</span>
                    <span
                      className="mt-0.5 text-lg font-bold italic"
                      style={{ fontFamily: "var(--font-garamond), Georgia, serif", color: "#1a6b35" }}
                    >
                      Crystal Clear
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-gray-light">{n}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mt-6">
          <p className="text-base text-gray">
            Paste your document below, or add a file.
          </p>
        </div>
      </div>
      <div className="mt-4 w-full max-w-lg">
        <InputArea />
      </div>
    </div>
  );
}

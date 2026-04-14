interface MirrorSectionProps {
  lead: string;
  bullets: string[];
}

export default function MirrorSection({ lead, bullets }: MirrorSectionProps) {
  return (
    <div>
      <h2
        className="text-xl uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-inter), sans-serif", color: "#1a5a8a" }}
      >
        The Main So What Your Doc Conveys
      </h2>
      <p className="mt-4 text-xl font-semibold leading-snug text-foreground">
        {lead}
      </p>
      {bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-3 text-xl leading-relaxed text-gray"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-light" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

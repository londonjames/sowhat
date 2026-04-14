interface MirrorSectionProps {
  lead: string;
  bullets: string[];
}

export default function MirrorSection({ lead, bullets }: MirrorSectionProps) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-[0.2em] text-gray-light md:text-base">
        The Main So What That Comes Through
      </h2>
      <p
        className="mt-4 text-2xl font-semibold leading-snug text-foreground"
        style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
      >
        {lead}
      </p>
      {bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-3 text-lg leading-relaxed text-gray"
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

interface MirrorSectionProps {
  lead: string;
  bullets: string[];
}

export default function MirrorSection({ lead, bullets }: MirrorSectionProps) {
  return (
    <div>
      <h2 className="text-xs font-medium tracking-[0.2em] text-gray-light uppercase">
        The Main So What That Comes Through
      </h2>
      <p className="mt-4 text-lg font-semibold leading-relaxed text-foreground">
        {lead}
      </p>
      {bullets.length > 0 && (
        <ul className="mt-3 space-y-2">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-base leading-relaxed text-foreground/80"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-light" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

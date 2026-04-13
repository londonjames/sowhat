interface MirrorSectionProps {
  text: string;
}

export default function MirrorSection({ text }: MirrorSectionProps) {
  return (
    <div className="rounded-xl bg-surface border border-gray-border p-8">
      <h2 className="text-xs font-medium tracking-widest text-gray-light uppercase">
        What Comes Through
      </h2>
      <p className="mt-4 text-xl italic leading-relaxed text-foreground">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

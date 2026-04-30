import { sources } from "@/lib/data/sources";

export default function SourceTag({ id }: { id: keyof typeof sources }) {
  const s = sources[id];
  if (!s) return null;
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full bg-ice/60 px-2.5 py-0.5 text-[11px] font-medium text-deep hover:bg-ice"
      title={`Fuente: ${s.title} — consultada el ${s.fetchedAt}`}
    >
      <span aria-hidden="true">↗</span>
      Fuente
    </a>
  );
}

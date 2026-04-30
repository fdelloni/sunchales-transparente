type Props = {
  value: string;
  label: string;
  hint?: string;
  verified?: boolean;
};

export default function StatCard({ value, label, hint, verified }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-serif text-3xl font-bold text-navy">{value}</span>
        {verified !== undefined && (
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest ${
              verified ? "text-emerald-600" : "text-amber-600"
            }`}
            title={verified ? "Dato verificado contra fuente oficial" : "Estructura ejemplificadora pendiente de oficialización"}
          >
            {verified ? "Verificado" : "Pendiente"}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-teal">{label}</div>
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 42, suffix: "+", label: "Comunidades beneficiadas" },
  { value: 5800, suffix: "+", label: "Personas capacitadas" },
  { value: 27, suffix: "", label: "Proyectos ejecutados" },
  { value: 12500, suffix: "+", label: "Árboles sembrados" },
  { value: 18, suffix: "", label: "Alianzas estratégicas" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1600;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
}

export function Impact() {
  return (
    <section id="impacto" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-3">
            <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-primary">
              05 — Impacto
            </span>
            <div className="mt-4 h-px w-16 bg-foreground" />
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-foreground">
              Cifras que hablan por nuestras{" "}
              <span className="italic text-secondary">comunidades</span>.
            </h2>
          </div>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 flex flex-col gap-3 ${i === 1 ? "bg-primary text-primary-foreground" : i === 3 ? "bg-gradient-gold text-foreground" : "bg-background"}`}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-70">
                0{i + 1}
              </span>
              <dd className="font-display font-black text-5xl lg:text-6xl tracking-[-0.04em] leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="text-sm font-semibold leading-snug mt-auto">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

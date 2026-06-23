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
    <section id="impacto" className="py-24 bg-gradient-brand text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Nuestro impacto
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold">
            Cifras que hablan por nuestras comunidades
          </h2>
        </div>

        <dl className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl sm:text-5xl font-extrabold">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <p className="mt-2 text-sm text-white/85">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const LAYERS = [
  {
    position: "left-[-8%] top-[-8rem] h-[32rem] w-[32rem]",
    color: "oklch(0.6 0.22 265)",
    animate: "animate-aurora-a",
  },
  {
    position: "right-[-10%] top-[-4rem] h-[30rem] w-[30rem]",
    color: "oklch(0.65 0.21 300)",
    animate: "animate-aurora-b",
  },
  {
    position: "left-[30%] top-[2rem] h-[26rem] w-[26rem]",
    color: "oklch(0.72 0.16 220)",
    animate: "animate-aurora-c",
  },
];

export function HeroField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {LAYERS.map((layer, index) => (
        <div
          key={index}
          className={`absolute rounded-full opacity-45 blur-2xl motion-reduce:animate-none ${layer.position} ${layer.animate}`}
          style={{
            background: `radial-gradient(closest-side, ${layer.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

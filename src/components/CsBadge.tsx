export function CsBadge({ size = 44 }: { size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 28%, #FBF8F1, #F4F0E6 70%)",
        boxShadow: "0 0 0 1.8px #C7A24C, 0 4px 10px rgba(14,42,30,0.12)"
      }}
    >
      <span
        className="font-sans font-bold"
        style={{
          fontSize: size * 0.4,
          letterSpacing: "-0.02em",
          background: "linear-gradient(150deg,#E8CC81,#C7A24C 55%,#9C7A2A)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        CS
      </span>
    </div>
  );
}

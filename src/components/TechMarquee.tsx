"use client";

type TechMarqueeProps = {
  label: string;
  items: string[];
};

/**
 * Faixa horizontal com tecnologias em uso (scroll infinito).
 */
export function TechMarquee({ label, items }: TechMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className="tech-marquee-wrap">
      <p className="tech-marquee-label">{label}</p>
      <div className="tech-marquee">
        <div className="tech-marquee__track">
          {track.map((item, index) => (
            <span key={`${item}-${index}`} className="tech-marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

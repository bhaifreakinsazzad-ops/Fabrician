import { motion } from 'framer-motion';

interface ChapterProps {
  number: string;          // "01", "02"…
  label: string;           // "World Entrance"
  title?: React.ReactNode; // headline
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Editorial chapter marker — used across the storefront to give a
 * fashion-magazine rhythm. Big numeral, refined kerning.
 */
export function Chapter({
  number,
  label,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
  className = '',
}: ChapterProps) {
  const ink = tone === 'dark' ? '#F8F2E8' : '#202432';
  const muted = tone === 'dark' ? 'rgba(248,242,232,0.55)' : '#69707D';
  const gold = '#C7A36A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : ''} ${className}`}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="font-display italic font-light leading-none"
          style={{
            fontSize: 'clamp(2.25rem,4.2vw,3.25rem)',
            color: gold,
            letterSpacing: '-0.02em',
          }}
        >
          {number}
        </span>
        <span
          className="h-px w-9"
          style={{ backgroundColor: tone === 'dark' ? 'rgba(199,163,106,0.45)' : 'rgba(199,163,106,0.55)' }}
        />
        <span
          className="text-[10px] font-bold uppercase"
          style={{ color: gold, letterSpacing: '0.22em' }}
        >
          {label}
        </span>
      </div>

      {title && (
        <h2
          className="font-display font-semibold leading-[1.04] mb-3"
          style={{
            fontSize: 'clamp(1.85rem,4.2vw,2.85rem)',
            color: ink,
            letterSpacing: '-0.022em',
            maxWidth: '20ch',
          }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className="text-base leading-relaxed"
          style={{ color: muted, maxWidth: '46ch' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Editorial pull-quote: large italic serif statement.
 */
export function EditorialQuote({
  children,
  attribution,
  tone = 'light',
}: {
  children: React.ReactNode;
  attribution?: string;
  tone?: 'light' | 'dark';
}) {
  const ink = tone === 'dark' ? '#F8F2E8' : '#202432';
  const muted = tone === 'dark' ? 'rgba(248,242,232,0.45)' : '#9CA3AF';
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative pl-6"
    >
      <span
        className="absolute left-0 top-0 font-display italic"
        style={{ color: '#C7A36A', fontSize: '3rem', lineHeight: 1, letterSpacing: '-0.05em' }}
      >
        “
      </span>
      <p
        className="font-display italic font-light leading-[1.2]"
        style={{
          fontSize: 'clamp(1.4rem,2.6vw,2rem)',
          color: ink,
          letterSpacing: '-0.012em',
        }}
      >
        {children}
      </p>
      {attribution && (
        <footer
          className="mt-3 text-[10px] font-bold uppercase"
          style={{ color: muted, letterSpacing: '0.2em' }}
        >
          — {attribution}
        </footer>
      )}
    </motion.blockquote>
  );
}

/**
 * Hairline divider with an inline label, for rhythm separation.
 */
export function EditorialRule({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'dark' }) {
  const lineColor = tone === 'dark' ? 'rgba(199,163,106,0.30)' : 'rgba(199,163,106,0.40)';
  const labelColor = tone === 'dark' ? 'rgba(248,242,232,0.55)' : '#9CA3AF';
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
      {label && (
        <span
          className="text-[10px] font-bold uppercase whitespace-nowrap"
          style={{ color: labelColor, letterSpacing: '0.22em' }}
        >
          {label}
        </span>
      )}
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
    </div>
  );
}

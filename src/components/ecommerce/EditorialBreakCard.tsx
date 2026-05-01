import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EditorialBreakCardProps {
  number: string;
  label: string;
  title: string;
  italic?: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor?: string;
  textColor?: string;
  emoji?: string;
}

/**
 * Editorial card injected inside product grids — interrupts the rhythm
 * with a magazine-style mood moment instead of just product after product.
 */
export function EditorialBreakCard({
  number,
  label,
  title,
  italic,
  body,
  ctaLabel,
  ctaHref,
  bgColor = '#1E140A',
  textColor = '#F8F2E8',
  emoji,
}: EditorialBreakCardProps) {
  const isDark = textColor === '#F8F2E8' || textColor === '#FFFFFF';
  const muted = isDark ? 'rgba(248,242,232,0.6)' : '#69707D';
  const accent = isDark ? '#C7A36A' : '#B8924A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className="relative col-span-2 lg:col-span-2 rounded-[1.25rem] overflow-hidden border flex flex-col justify-between"
      style={{
        backgroundColor: bgColor,
        borderColor: isDark ? 'rgba(199,163,106,0.25)' : '#E8DED2',
        minHeight: 280,
        boxShadow: isDark ? '0 20px 60px -20px rgba(0,0,0,0.4)' : '0 8px 24px rgba(32,36,50,0.06)',
      }}
    >
      {/* Ambient glow if dark */}
      {isDark && (
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.4) 0%, transparent 70%)', transform: 'translate(35%,-35%)' }}
        />
      )}

      {/* Background emoji watermark */}
      {emoji && (
        <span
          className="absolute opacity-10 pointer-events-none"
          style={{
            fontSize: '11rem',
            right: '-1.5rem',
            bottom: '-2.5rem',
            lineHeight: 1,
          }}
        >
          {emoji}
        </span>
      )}

      <div className="relative z-10 p-6 lg:p-7">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-display italic font-light leading-none"
            style={{ fontSize: '1.5rem', color: accent, letterSpacing: '-0.02em' }}
          >
            {number}
          </span>
          <span className="h-px w-7" style={{ backgroundColor: isDark ? 'rgba(199,163,106,0.45)' : 'rgba(199,163,106,0.55)' }} />
          <span
            className="text-[10px] font-bold uppercase"
            style={{ color: accent, letterSpacing: '0.22em' }}
          >
            {label}
          </span>
        </div>

        <h3
          className="font-display font-semibold leading-[1.05] mb-2"
          style={{ fontSize: 'clamp(1.25rem,2vw,1.5rem)', color: textColor, letterSpacing: '-0.018em' }}
        >
          {title}
          {italic && (
            <>
              <br />
              <em className="italic font-light">{italic}</em>
            </>
          )}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: muted, maxWidth: '32ch' }}>
          {body}
        </p>
      </div>

      <div className="relative z-10 p-6 lg:p-7 pt-0">
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase transition-all hover:gap-2.5"
          style={{ color: accent, letterSpacing: '0.16em' }}
        >
          {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

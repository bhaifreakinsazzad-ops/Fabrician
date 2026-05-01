import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { WorldCard } from '@/components/ecommerce/WorldCard';
import { Chapter, EditorialQuote } from '@/components/editorial/Chapter';
import { worlds } from '@/data/worlds';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] },
});

// ── Mood groupings: which worlds belong to which collection ──
const MOOD_GROUPS: Array<{
  id: string;
  number: string;
  title: string;
  italic: string;
  description: string;
  slugs: string[];
}> = [
  {
    id: 'dream',
    number: '01',
    title: 'Dream',
    italic: 'soft, celestial, calm',
    description: 'Cloud-like palettes, moon-touched bedtime hush. For the quiet, restful hours.',
    slugs: ['cloud-dream', 'moon-dream', 'midnight-moon', 'celestial-night', 'cloud-rainbow'],
  },
  {
    id: 'wild',
    number: '02',
    title: 'Wander',
    italic: 'safari, animal, gentle adventure',
    description: 'Sun-warmed savannas, friendly animals, the curiosity of small explorers.',
    slugs: ['safari-calm', 'safari-friends', 'forest-safari', 'tiger-play', 'panda-bamboo', 'animal-parade', 'animal-play'],
  },
  {
    id: 'bloom',
    number: '03',
    title: 'Bloom',
    italic: 'botanical, garden, blossom',
    description: 'Cherry petals, leafy greens, blush florals — the gentle world of growing things.',
    slugs: ['bunny-garden', 'bunny-cuddle', 'cherry-bloom', 'flower-garden', 'botanical-calm', 'soft-blush'],
  },
  {
    id: 'timeless',
    number: '04',
    title: 'Timeless',
    italic: 'minimal, classic, refined',
    description: 'For parents who choose restraint — pieces that outlive trends and become heirlooms.',
    slugs: ['timeless-minimal', 'timeless-classic'],
  },
];

export default function WorldsPage() {
  const featured = worlds.filter((w) => w.featured);
  const spotlight = featured[0];

  return (
    <div style={{ backgroundColor: '#FCF8F3', minHeight: '100vh' }}>

      {/* ════════ §1 HERO — atlas intro ════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(199,163,106,0.22) 0%, transparent 50%),' +
            'radial-gradient(ellipse at 15% 80%, rgba(199,163,106,0.10) 0%, transparent 45%),' +
            '#1E140A',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[5%] right-[8%] w-96 h-96 rounded-full opacity-25 animate-blob"
            style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.30) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[5%] left-[4%] w-72 h-72 rounded-full opacity-15 animate-fabric-wave"
            style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.20) 0%, transparent 70%)', animationDelay: '4s' }}
          />
        </div>

        {/* Vertical signature label */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden xl:flex z-20" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: 'rgba(199,163,106,0.65)', letterSpacing: '0.4em' }}>
            Volume One · The Worlds Atlas
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="font-display italic font-light leading-none"
                  style={{ fontSize: '2.5rem', color: '#C7A36A', letterSpacing: '-0.02em' }}
                >
                  ✦
                </span>
                <span className="h-px w-10" style={{ backgroundColor: 'rgba(199,163,106,0.45)' }} />
                <span className="text-[10px] font-bold uppercase" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                  An Atlas of Moods
                </span>
              </div>

              <h1
                className="font-display font-semibold leading-[0.98] mb-6"
                style={{ fontSize: 'clamp(2.75rem,7vw,5.25rem)', color: '#F8F2E8', letterSpacing: '-0.03em' }}
              >
                Browse by{' '}
                <span className="font-display italic font-light">feeling.</span>
                <br />
                Not by{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #C7A36A 0%, #F0CE83 50%, #C7A36A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  category.
                </span>
              </h1>

              <p className="text-base leading-[1.7] mb-7 font-light" style={{ color: 'rgba(248,242,232,0.62)', maxWidth: '480px' }}>
                Every Fabrician design lives inside a curated world — a soft palette, a quiet story,
                a feeling. Choose the one that matches your little dreamer.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
                  style={{ backgroundColor: 'rgba(199,163,106,0.12)', border: '1px solid rgba(199,163,106,0.22)' }}
                >
                  <Compass className="w-3.5 h-3.5" style={{ color: '#C7A36A' }} />
                  <span style={{ color: 'rgba(248,242,232,0.70)' }}><strong style={{ color: '#C7A36A' }}>13</strong> curated worlds</span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
                  style={{ backgroundColor: 'rgba(199,163,106,0.12)', border: '1px solid rgba(199,163,106,0.22)' }}
                >
                  <span className="text-base">✦</span>
                  <span style={{ color: 'rgba(248,242,232,0.70)' }}><strong style={{ color: '#C7A36A' }}>4</strong> mood collections</span>
                </div>
              </div>
            </motion.div>

            {/* Spotlight world preview */}
            {spotlight && (
              <motion.div
                {...fadeUp(0.2)}
                className="hidden lg:block relative"
              >
                <Link to={`/worlds/${spotlight.slug}`}>
                  <div
                    className="relative rounded-[2rem] overflow-hidden border"
                    style={{
                      backgroundColor: spotlight.accent.bg,
                      borderColor: 'rgba(199,163,106,0.25)',
                      boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)',
                    }}
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] font-bold uppercase px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(20,27,44,0.7)', color: '#C7A36A', letterSpacing: '0.18em', backdropFilter: 'blur(6px)' }}>
                        Spotlight World
                      </span>
                    </div>
                    <div style={{ aspectRatio: '4/5' }} className="relative">
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: `radial-gradient(ellipse at center, ${spotlight.accent.secondary}55 0%, transparent 70%)` }}
                      >
                        <span className="text-[140px] leading-none opacity-90">{spotlight.emoji}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(20,27,44,0.85) 100%)' }}>
                        <p className="text-[10px] font-bold uppercase mb-1" style={{ color: '#C7A36A', letterSpacing: '0.18em' }}>{spotlight.label} World</p>
                        <h3 className="font-display font-semibold text-2xl mb-1" style={{ color: '#F8F2E8' }}>{spotlight.name}</h3>
                        <p className="text-xs italic" style={{ color: 'rgba(248,242,232,0.7)' }}>"{spotlight.tagline}"</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ════════ §2 STRIP — quick world index ════════ */}
      <section style={{ backgroundColor: '#F6F1EA', borderBottom: '1px solid #E8DED2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[10px] font-bold uppercase shrink-0" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
              Quick Index →
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(199,163,106,0.25)' }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {worlds.map((w) => (
              <a key={w.slug} href={`#${w.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer shrink-0"
                  style={{ backgroundColor: w.accent.chip, color: w.accent.chipText }}
                >
                  <span>{w.emoji}</span>
                  <span>{w.label}</span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ §3 EDITORIAL QUOTE ════════ */}
      <section style={{ padding: 'clamp(3rem,7vw,5rem) 0', backgroundColor: '#FCF8F3' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditorialQuote attribution="Curator's Note">
            A child's first wardrobe should not be sorted by size. It should be sorted by the
            world you want to wrap them in.
          </EditorialQuote>
        </div>
      </section>

      {/* ════════ §4 MOOD GROUPS ════════ */}
      {MOOD_GROUPS.map((group, gIdx) => {
        const groupWorlds = group.slugs
          .map((slug) => worlds.find((w) => w.slug === slug))
          .filter(Boolean) as typeof worlds;
        if (groupWorlds.length === 0) return null;

        return (
          <section
            key={group.id}
            className="fab-section"
            style={{ backgroundColor: gIdx % 2 === 0 ? '#FCF8F3' : '#FFFFFF' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
                <Chapter
                  number={group.number}
                  label={`The ${group.title} Worlds`}
                  title={<>{group.title}.<br/><em className="italic font-light">{group.italic}.</em></>}
                  subtitle={group.description}
                />

                {/* Palette preview swatches */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase mr-2" style={{ color: '#9CA3AF', letterSpacing: '0.22em' }}>
                    Palette
                  </span>
                  {groupWorlds.slice(0, 5).map((w) => (
                    <div
                      key={w.slug}
                      className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                      style={{ backgroundColor: w.accent.primary, borderColor: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                      title={w.name}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {groupWorlds.map((world, i) => (
                  <motion.div
                    key={world.id}
                    id={world.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.48, delay: i * 0.07 }}
                  >
                    <WorldCard world={world} variant={i === 0 ? 'featured' : 'default'} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ════════ §5 BOTTOM CTA ════════ */}
      <section className="pb-24 pt-8" style={{ backgroundColor: '#FCF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[2rem] overflow-hidden p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #141B2C 0%, #27324B 100%)', boxShadow: '0 30px 80px -30px rgba(20,27,44,0.5)' }}
          >
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(199,163,106,0.4) 0%, transparent 70%)', transform: 'translate(25%,-25%)' }}
            />
            <div className="relative z-10 max-w-md">
              <p className="text-[10px] font-bold uppercase mb-3" style={{ color: '#C7A36A', letterSpacing: '0.22em' }}>
                Can't choose a world?
              </p>
              <h3
                className="font-display font-semibold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: '#F8F2E8', letterSpacing: '-0.02em' }}
              >
                Browse the whole atlas.
                <br />
                <em className="italic font-light" style={{ color: '#C7A36A' }}>22 designs await.</em>
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(248,242,232,0.55)' }}>
                Or filter the full collection by category, age, or gift occasion.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #C7A36A 0%, #9E7E5D 100%)', color: '#1E140A', boxShadow: '0 4px 20px rgba(199,163,106,0.4)' }}
              >
                Shop all 22 designs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?collection=gift-picks"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all"
                style={{ color: '#F8F2E8', border: '1px solid rgba(199,163,106,0.35)' }}
              >
                Gift Sets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

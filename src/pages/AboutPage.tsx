import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Target, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GOLD      = '#C7A36A';
const GOLD_DEEP = '#9E7E5D';
const NAVY      = '#1E140A';

const values = [
  { icon: Heart,    title: 'Made with Love',    desc: "Every piece is crafted with care and attention to detail, because your baby deserves the best." },
  { icon: Users,    title: 'For Every Family',  desc: 'We believe beautiful baby clothing should be accessible to all families across Bangladesh.' },
  { icon: Target,   title: 'Quality First',     desc: "Only the finest organic and premium materials touch your baby's delicate skin." },
  { icon: Globe,    title: 'Locally Crafted',   desc: 'Proudly designed and made in Bangladesh, supporting local communities and artisans.' },
  { icon: Sparkles, title: 'Future Ready',      desc: "From AI-powered design tools to family matching collections, we're building the future of fashion." },
];

const milestones = [
  { year: '2025',  title: 'The Dream',  desc: 'Fabrician was born from a vision to create premium, accessible baby clothing for Bangladeshi families.' },
  { year: '2026',  title: 'Launch',     desc: 'Our first collection of organic baby bodysuits (0–12M) launches with free delivery nationwide.' },
  { year: '2026+', title: 'The Future', desc: "Expanding to full kids' clothing, adult fashion, and family matching collections with global reach." },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in-up">

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden py-16 lg:py-24"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(199,163,106,0.12) 0%, transparent 60%),' +
            '#FCF8F3',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: 'rgba(199,163,106,0.12)',
              border: '1px solid rgba(199,163,106,0.25)',
              color: GOLD_DEEP,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: GOLD }} />
            Our Story
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-semibold mb-6" style={{ color: NAVY }}>
            Fashion for{' '}
            <span className="fabrician-text-gradient">Every Age</span>
            <br />and{' '}
            <span className="fabrician-text-gradient">Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Fabrician is more than a clothing brand. We're building a future where every family member —
            from the tiniest newborn to grandparents — can express themselves through beautiful,
            comfortable, and sustainable fashion.
          </p>
        </div>
      </div>

      {/* ── Mission ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/col-cotton.jpg"
              alt="Fabrician Craftsmanship"
              className="rounded-3xl shadow-lg w-full"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Who we are</p>
            <h2 className="text-2xl lg:text-3xl font-display font-semibold mb-4" style={{ color: NAVY }}>
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We started Fabrician with a simple mission: to provide Bangladeshi families with premium,
              organic baby clothing that's soft, safe, and beautiful. Every stitch tells a story of care,
              every fabric choice reflects our commitment to quality, and every design is made with love.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              But we're not stopping at baby clothes. Our vision extends to kids, adults, and the magical
              world of family matching outfits — imagine a family photo where everyone is wearing
              coordinated, beautiful outfits from Fabrician.
            </p>
            <Link to="/shop">
              <Button
                className="rounded-xl gap-2 text-white"
                style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                  color: NAVY,
                }}
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="py-16 lg:py-24" style={{ backgroundColor: '#F6F1EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">What drives us</p>
            <h2 className="text-2xl lg:text-3xl font-display font-semibold" style={{ color: NAVY }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(199,163,106,0.12)' }}
                >
                  <value.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Roadmap / Milestones ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Timeline</p>
          <h2 className="text-2xl lg:text-3xl font-display font-semibold" style={{ color: NAVY }}>
            Our Journey
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-0">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                    color: NAVY,
                  }}
                >
                  {m.year}
                </div>
                {idx < milestones.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2"
                    style={{ backgroundColor: 'rgba(199,163,106,0.25)', minHeight: '40px' }}
                  />
                )}
              </div>
              <div className="pb-10">
                <h3 className="font-display font-semibold text-lg">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

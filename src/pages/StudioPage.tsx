import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, ArrowLeft, Save,
  Check, Shirt, Baby, Palette, Type,
  ImagePlus, Bell, ShoppingBag, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useStudio } from '@/store/useStudio';
import { occasions, embroideryTypes } from '@/data/site';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const GOLD          = '#C9A86C';
const GOLD_DEEP     = '#8A6B3A';
const NAVY          = '#1E140A';   /* warm near-black from logo palette */
const NAVY_MID      = '#2A1A0A';   /* deeper warm dark */

const GARMENT_OPTIONS = [
  { id: 'bodysuit',  label: 'Bodysuit',  emoji: '👶', description: 'Classic snap-bottom' },
  { id: 'onesie',   label: 'Onesie',    emoji: '🐣', description: 'Long-sleeve comfort' },
  { id: 'romper',   label: 'Romper',    emoji: '🌸', description: 'One-piece playsuit' },
  { id: 'sleeper',  label: 'Sleeper',   emoji: '🌙', description: 'Footed nightwear' },
  { id: 'gift-set', label: 'Gift Set',  emoji: '🎁', description: 'Curated ensemble' },
];

const AGE_OPTIONS = ['0–3 Months', '3–6 Months', '6–9 Months', '9–12 Months'];
const COLOR_OPTIONS = [
  { name: 'Ivory White',  hex: '#FAFAFA' },
  { name: 'Powder Blue',  hex: '#B8D4E3' },
  { name: 'Blush Pink',   hex: '#FFB3C6' },
  { name: 'Sage Green',   hex: '#A8C4A2' },
  { name: 'Lilac',        hex: '#C4B5FD' },
  { name: 'Lemon',        hex: '#FEF08A' },
  { name: 'Peach',        hex: '#FDBA74' },
  { name: 'Cream',        hex: '#FEF3C7' },
];

const MOOD_OPTIONS = [
  { id: 'minimal',  label: 'Minimal & Clean',    desc: 'Simple, timeless',    emoji: '🕊️' },
  { id: 'playful',  label: 'Playful & Fun',       desc: 'Bright, whimsical',   emoji: '🎨' },
  { id: 'elegant',  label: 'Elegant & Classic',   desc: 'Refined, delicate',   emoji: '✨' },
  { id: 'nature',   label: 'Nature Inspired',     desc: 'Botanical, earthy',   emoji: '🌿' },
];

const steps = [
  { icon: Shirt,      label: 'Style',    title: 'What are you dreaming of?' },
  { icon: Baby,       label: 'Baby',     title: 'Who is this for?' },
  { icon: Palette,    label: 'Mood',     title: 'What should it feel like?' },
  { icon: Type,       label: 'Personal', title: 'Make it theirs.' },
  { icon: ImagePlus,  label: 'Inspire',  title: 'Show us what inspires you.' },
  { icon: Sparkles,   label: 'Concept',  title: "Here's what we imagined together." },
];

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// Shared style helpers for selected / unselected interactive elements
const selectedCard = {
  backgroundColor: 'rgba(199,163,106,0.18)',
  borderColor: 'rgba(199,163,106,0.70)',
  boxShadow: '0 0 16px rgba(199,163,106,0.25)',
} as const;

const selectedPill = {
  backgroundColor: 'rgba(199,163,106,0.18)',
  borderColor: GOLD,
  color: '#FFFFFF',
} as const;

export default function StudioPage() {
  const [phase, setPhase]               = useState<'landing' | 'flow' | 'done'>('landing');
  const [currentStep, setCurrentStep]   = useState(0);
  const [direction, setDirection]       = useState(1);
  const [designData, setDesignData]     = useState({
    goal:             '',
    garmentType:      '',
    ageRange:         '',
    colorPreference:  [] as string[],
    fabricPreference: '',
    styleMood:        '',
    occasion:         '',
    customText:       '',
    embroideryType:   '',
    specialNotes:     '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addSubmission = useStudio((s) => s.addSubmission);

  const goNext = () => {
    if (currentStep < steps.length - 1) { setDirection(1);  setCurrentStep((s) => s + 1); }
  };
  const goPrev = () => {
    if (currentStep > 0)                 { setDirection(-1); setCurrentStep((s) => s - 1); }
  };
  const toggleColor = (name: string) => {
    setDesignData((d) => ({
      ...d,
      colorPreference: d.colorPreference.includes(name)
        ? d.colorPreference.filter((c) => c !== name)
        : [...d.colorPreference, name],
    }));
  };

  const handleSubmit = () => {
    addSubmission(
      {
        goal:             designData.garmentType || designData.goal,
        ageRange:         designData.ageRange,
        size:             designData.ageRange,
        colorPreference:  designData.colorPreference,
        fabricPreference: designData.fabricPreference,
        styleMood:        designData.styleMood,
        occasion:         designData.occasion,
        personalization:  { customText: designData.customText, embroideryType: designData.embroideryType },
        specialNotes:     designData.specialNotes,
      },
      []
    );
    setPhase('done');
    toast.success('Design concept saved!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 4));
  };

  // ── DONE STATE ────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div className="min-h-screen studio-surface flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full text-center"
        >
          {/* Success glow */}
          <div className="relative inline-flex mb-8">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ backgroundColor: 'rgba(199,163,106,0.30)' }}
            />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(199,163,106,0.25) 0%, rgba(158,126,93,0.25) 100%)',
                border: '1px solid rgba(199,163,106,0.35)',
              }}
            >
              <Check className="w-10 h-10" style={{ color: GOLD }} />
            </div>
          </div>

          <p className="text-[10px] font-bold uppercase mb-3" style={{ color: GOLD, letterSpacing: '0.32em' }}>
            ✦ Atelier Proposal № {Math.floor(Math.random() * 9000) + 1000} ✦
          </p>
          <h1 className="font-display font-semibold text-white mb-4 leading-[1.05]" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', letterSpacing: '-0.022em' }}>
            Your concept is{' '}
            <em className="italic font-light" style={{ color: GOLD }}>saved.</em>
          </h1>
          <p className="text-white/60 mb-7 leading-[1.7] text-sm font-light max-w-md mx-auto">
            Beautiful. The Fabrician Atelier has filed your vision. When Studio opens
            for live custom orders, you will be among the first to know.
          </p>

          <div
            className="p-4 rounded-2xl mb-8 text-left"
            style={{
              backgroundColor: 'rgba(199,163,106,0.08)',
              border: '1px solid rgba(199,163,106,0.22)',
            }}
          >
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,242,232,0.75)' }}>
                <span className="font-semibold" style={{ color: GOLD }}>✦ Trial Preview</span> — Custom ordering is opening later.
                Your concept is saved for early review when Studio launches fully.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10">
              <Link to="/account">
                <Save className="mr-2 w-4 h-4" />
                View My Designs
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-2xl font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`, color: NAVY }}
            >
              <Link to="/shop">
                <ShoppingBag className="mr-2 w-4 h-4" />
                Shop Ready-Made
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── LANDING STATE ─────────────────────────────────────────────
  if (phase === 'landing') {
    return (
      <div className="min-h-screen studio-surface relative overflow-hidden flex items-center">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full blur-3xl animate-blob"
            style={{ backgroundColor: 'rgba(199,163,106,0.15)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full blur-3xl animate-blob"
            style={{ backgroundColor: 'rgba(199,163,106,0.10)', animationDelay: '4s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-blob"
            style={{ backgroundColor: 'rgba(184,146,74,0.08)', animationDelay: '8s' }}
          />
        </div>

        {/* Vertical edge label — atelier signature */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden xl:flex z-20" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: 'rgba(199,163,106,0.55)', letterSpacing: '0.4em' }}>
            Maison Fabrician · Atelier · Trial Preview
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Editorial chapter mark */}
            <div className="flex items-center justify-center gap-3 mb-7">
              <span
                className="font-display italic font-light leading-none"
                style={{ fontSize: '2.25rem', color: GOLD, letterSpacing: '-0.02em' }}
              >
                ✦
              </span>
              <span className="h-px w-12" style={{ backgroundColor: 'rgba(199,163,106,0.45)' }} />
              <span className="text-[10px] font-bold uppercase" style={{ color: GOLD, letterSpacing: '0.32em' }}>
                The Concept Atelier
              </span>
              <span className="h-px w-12" style={{ backgroundColor: 'rgba(199,163,106,0.45)' }} />
              <span
                className="font-display italic font-light leading-none"
                style={{ fontSize: '2.25rem', color: GOLD, letterSpacing: '-0.02em' }}
              >
                ✦
              </span>
            </div>

            {/* Trial badge — calm sparkle */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ border: '1px solid rgba(199,163,106,0.35)', backgroundColor: 'rgba(199,163,106,0.10)' }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: GOLD }}>
                ✦ Trial Preview · Private Atelier
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-semibold text-white leading-[0.96] mb-6" style={{ fontSize: 'clamp(3rem,7.5vw,6rem)', letterSpacing: '-0.03em' }}>
              Fabrician{' '}
              <span className="italic font-light gold-foil">
                Studio.
              </span>
              <br />
              <span className="font-display italic font-light text-white/70" style={{ fontSize: '0.55em' }}>
                A private concept atelier.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-12 leading-[1.7] font-light">
              Your imagination, our craft. Six gentle steps — your inspirations, palette, preferences,
              a private concept summary. The future foundation of Fabrician custom orders.
            </p>

            {/* 3-step preview */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-12 max-w-3xl mx-auto">
              {[
                { num: '01', icon: Shirt,    label: 'Describe',   desc: 'Tell us your vision' },
                { num: '02', icon: Palette,  label: 'Customize',  desc: 'Style, palette, name' },
                { num: '03', icon: Sparkles, label: 'Preview',    desc: 'See your concept' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-4 sm:gap-0 sm:flex-1">
                  <div className="flex flex-col items-center gap-2 sm:px-6 mx-auto">
                    <p className="text-[10px] font-bold uppercase" style={{ color: GOLD, letterSpacing: '0.22em' }}>
                      {item.num}
                    </p>
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.10] flex items-center justify-center" style={{ backdropFilter: 'blur(8px)' }}>
                      <item.icon className="w-5 h-5 text-white/70" />
                    </div>
                    <p className="text-sm font-display font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/45 hidden sm:block">{item.desc}</p>
                  </div>
                  {i < 2 && <div className="hidden sm:block w-px h-8" style={{ backgroundColor: 'rgba(199,163,106,0.25)' }} />}
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => setPhase('flow')}
              className="btn-magnetic rounded-full font-bold px-12 text-base h-auto py-4"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                color: NAVY,
                boxShadow: '0 6px 28px rgba(199,163,106,0.45)',
                letterSpacing: '0.04em',
              }}
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Begin a Concept
            </Button>

            <p className="text-white/25 text-xs mt-6 italic font-light">
              Free to explore · No commitment · Not yet a live ordering system
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── FLOW STATE ────────────────────────────────────────────────
  return (
    <div className="min-h-screen studio-surface">
      {/* Top bar */}
      <div className="border-b border-white/8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setPhase('landing')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-medium text-white">Fabrician Studio ✦</span>
          </button>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{ border: '1px solid rgba(199,163,106,0.30)', backgroundColor: 'rgba(199,163,106,0.10)' }}
          >
            <Sparkles className="w-3 h-3" style={{ color: GOLD }} />
            <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GOLD }}>✦ Trial</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Step dots progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent   = idx === currentStep;
            return (
              <div key={idx} className="flex items-center">
                <button
                  onClick={() => { if (idx < currentStep) { setDirection(-1); setCurrentStep(idx); } }}
                  className={cn(
                    'relative flex flex-col items-center gap-1.5 transition-all duration-300',
                    idx <= currentStep ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={
                      isCompleted
                        ? { background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`, borderColor: GOLD, boxShadow: '0 2px 10px rgba(199,163,106,0.35)' }
                        : isCurrent
                          ? { backgroundColor: 'rgba(199,163,106,0.20)', borderColor: GOLD, boxShadow: '0 0 16px rgba(199,163,106,0.30)' }
                          : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)' }
                    }
                  >
                    {isCompleted
                      ? <Check className="w-3.5 h-3.5 text-white" />
                      : <step.icon
                          className="w-3.5 h-3.5"
                          style={{ color: isCurrent ? GOLD : 'rgba(255,255,255,0.30)' }}
                        />
                    }
                  </div>
                  <span
                    className="text-[9px] font-medium uppercase tracking-wider hidden sm:block"
                    style={{ color: isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.30)' }}
                  >
                    {step.label}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className="w-8 sm:w-14 h-px mx-1 sm:mx-2 transition-all duration-500"
                    style={{ backgroundColor: isCompleted ? 'rgba(199,163,106,0.50)' : 'rgba(255,255,255,0.10)' }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm mb-6 min-h-[420px] flex flex-col">
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-1.5">
                {steps[currentStep].title}
              </h2>
              <p className="text-white/40 text-sm mb-8">Step {currentStep + 1} of {steps.length}</p>

              <div className="flex-1">

                {/* STEP 0 — Garment type */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {GARMENT_OPTIONS.map((opt) => {
                        const active = designData.garmentType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setDesignData((d) => ({ ...d, garmentType: opt.id, goal: opt.label }))}
                            className="p-4 rounded-2xl border text-left transition-all duration-200"
                            style={active ? selectedCard : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}
                            onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.30)'; } }}
                            onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; } }}
                          >
                            <span className="text-2xl block mb-2">{opt.emoji}</span>
                            <p className="text-sm font-semibold text-white">{opt.label}</p>
                            <p className="text-[11px] text-white/40">{opt.description}</p>
                          </button>
                        );
                      })}
                    </div>
                    <div className="pt-2">
                      <Textarea
                        placeholder="Or describe freely... e.g. A pastel onesie with tiny stars for a naming ceremony"
                        value={designData.goal}
                        onChange={(e) => setDesignData((d) => ({ ...d, goal: e.target.value }))}
                        rows={3}
                        className="rounded-2xl bg-white/5 border-white/15 text-white placeholder:text-white/25 resize-none"
                        style={{ outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 1 — Baby details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-white/70 mb-3">Their age right now</p>
                      <div className="flex flex-wrap gap-2">
                        {AGE_OPTIONS.map((age) => {
                          const active = designData.ageRange === age;
                          return (
                            <button
                              key={age}
                              onClick={() => setDesignData((d) => ({ ...d, ageRange: age }))}
                              className="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200"
                              style={active ? selectedPill : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.60)' }}
                            >
                              {age}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70 mb-3">The colors that feel right</p>
                      <div className="flex flex-wrap gap-3">
                        {COLOR_OPTIONS.map((col) => {
                          const active = designData.colorPreference.includes(col.name);
                          return (
                            <button
                              key={col.name}
                              onClick={() => toggleColor(col.name)}
                              title={col.name}
                              className="w-10 h-10 rounded-full transition-all duration-200"
                              style={{
                                backgroundColor: col.hex,
                                border: active ? `3px solid ${GOLD}` : '3px solid rgba(255,255,255,0.20)',
                                transform: active ? 'scale(1.15)' : 'scale(1)',
                                boxShadow: active ? `0 0 14px rgba(199,163,106,0.40)` : 'none',
                              }}
                            />
                          );
                        })}
                      </div>
                      {designData.colorPreference.length > 0 && (
                        <p className="text-xs text-white/40 mt-2">Selected: {designData.colorPreference.join(', ')}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 2 — Style mood */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {MOOD_OPTIONS.map((mood) => {
                        const active = designData.styleMood === mood.id;
                        return (
                          <button
                            key={mood.id}
                            onClick={() => setDesignData((d) => ({ ...d, styleMood: mood.id }))}
                            className="p-5 rounded-2xl border text-left transition-all duration-200"
                            style={active ? selectedCard : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}
                            onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.30)'; } }}
                            onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; } }}
                          >
                            <span className="text-3xl block mb-3">{mood.emoji}</span>
                            <p className="text-sm font-semibold text-white leading-tight">{mood.label}</p>
                            <p className="text-[11px] text-white/40 mt-1">{mood.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70 mb-3">Occasion</p>
                      <div className="flex flex-wrap gap-2">
                        {occasions.map((occ) => {
                          const active = designData.occasion === occ;
                          return (
                            <button
                              key={occ}
                              onClick={() => setDesignData((d) => ({ ...d, occasion: occ }))}
                              className="px-3 py-1.5 rounded-xl border text-xs font-medium transition-all"
                              style={active ? selectedPill : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
                            >
                              {occ}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 — Personalize */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-white/70 mb-2 block">A name, word, or symbol to embroider</label>
                      <Input
                        placeholder="e.g. Ayaan, Baby Zara, ❤️ 2026..."
                        value={designData.customText}
                        onChange={(e) => setDesignData((d) => ({ ...d, customText: e.target.value }))}
                        className="rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/25"
                      />
                      {designData.customText && (
                        <p className="mt-3 text-center font-display text-2xl text-white/80 italic border border-white/10 rounded-xl py-4 bg-white/5">
                          {designData.customText}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 mb-2 block">Embroidery Style</label>
                      <div className="flex flex-wrap gap-2">
                        {embroideryTypes.map((t) => {
                          const active = designData.embroideryType === t;
                          return (
                            <button
                              key={t}
                              onClick={() => setDesignData((d) => ({ ...d, embroideryType: t }))}
                              className="px-3 py-1.5 rounded-xl border text-xs font-medium transition-all"
                              style={active ? selectedPill : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/70 mb-2 block">Special Notes</label>
                      <Textarea
                        placeholder="Any other details, fabric requests, or specific design elements..."
                        value={designData.specialNotes}
                        onChange={(e) => setDesignData((d) => ({ ...d, specialNotes: e.target.value }))}
                        rows={3}
                        className="rounded-xl bg-white/5 border-white/15 text-white placeholder:text-white/25 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4 — Upload references */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl transition-all cursor-pointer p-8 text-center mb-4"
                      style={{
                        border: '2px dashed rgba(199,163,106,0.35)',
                        backgroundColor: 'rgba(199,163,106,0.06)',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(199,163,106,0.60)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(199,163,106,0.10)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(199,163,106,0.35)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(199,163,106,0.06)'; }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: 'rgba(199,163,106,0.15)' }}
                      >
                        <ImagePlus className="w-6 h-6" style={{ color: GOLD }} />
                      </div>
                      <p className="font-medium text-sm mb-1 text-white">Drop reference images here</p>
                      <p className="text-xs text-muted-foreground">Up to 4 images · JPG, PNG, WEBP</p>
                      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedFiles.map((file, i) => (
                          <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-muted">
                            <img src={URL.createObjectURL(file)} alt={`ref-${i}`} className="w-full h-full object-cover" />
                            <button
                              onClick={(e) => { e.stopPropagation(); setUploadedFiles(f => f.filter((_, idx) => idx !== i)); }}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 5 — Dynamic Concept Card (assembled from user choices) */}
                {currentStep === 5 && (() => {
                  const garment = GARMENT_OPTIONS.find(g => g.id === designData.garmentType);
                  const mood = MOOD_OPTIONS.find(m => m.id === designData.styleMood);
                  const colorHexes = COLOR_OPTIONS.filter(c => designData.colorPreference.includes(c.name));
                  return (
                    <div className="space-y-5">
                      {/* The dynamic concept card */}
                      <div className="relative">
                        <div
                          className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none"
                          style={{ background: `radial-gradient(ellipse, ${GOLD}55 0%, transparent 70%)` }}
                        />
                        <div
                          className="relative rounded-3xl overflow-hidden p-7"
                          style={{
                            background: `linear-gradient(135deg, ${NAVY_MID} 0%, ${NAVY} 100%)`,
                            border: '1px solid rgba(199,163,106,0.35)',
                            boxShadow: '0 30px 60px -20px rgba(2,5,9,0.6)',
                          }}
                        >
                          {/* Atelier seal */}
                          <div className="flex items-center justify-between mb-5">
                            <span
                              className="text-[10px] font-bold uppercase"
                              style={{ color: GOLD, letterSpacing: '0.32em' }}
                            >
                              ✦ Fabrician Atelier
                            </span>
                            <span
                              className="text-[10px] font-bold uppercase"
                              style={{ color: 'rgba(248,242,232,0.45)', letterSpacing: '0.22em' }}
                            >
                              Concept № {Math.floor(Math.random() * 9000) + 1000}
                            </span>
                          </div>

                          {/* Garment hero — large emoji with glow */}
                          <div className="flex flex-col items-center py-6 mb-5 rounded-2xl" style={{ backgroundColor: 'rgba(248,242,232,0.04)' }}>
                            <div className="relative">
                              <div
                                className="absolute inset-0 rounded-full blur-xl"
                                style={{ backgroundColor: `${GOLD}55` }}
                              />
                              <div className="relative text-7xl">{garment?.emoji || '✦'}</div>
                            </div>
                            <p className="font-display font-semibold text-lg mt-3" style={{ color: '#F8F2E8' }}>
                              {garment?.label || designData.goal || 'Custom Concept'}
                            </p>
                            {designData.ageRange && (
                              <p className="text-[10px] uppercase mt-1" style={{ color: 'rgba(248,242,232,0.5)', letterSpacing: '0.22em' }}>
                                {designData.ageRange}
                              </p>
                            )}
                          </div>

                          {/* Personalization — embroidery preview */}
                          {designData.customText && (
                            <div
                              className="text-center py-4 px-4 rounded-2xl mb-5"
                              style={{
                                backgroundColor: 'rgba(199,163,106,0.10)',
                                border: '1px dashed rgba(199,163,106,0.40)',
                              }}
                            >
                              <p className="text-[9px] font-bold uppercase mb-1.5" style={{ color: GOLD, letterSpacing: '0.28em' }}>
                                Embroidered ✦
                              </p>
                              <p
                                className="font-display italic font-light"
                                style={{ fontSize: '1.6rem', color: '#F8F2E8', letterSpacing: '0.02em' }}
                              >
                                {designData.customText}
                              </p>
                            </div>
                          )}

                          {/* Color palette */}
                          {colorHexes.length > 0 && (
                            <div className="mb-5">
                              <p className="text-[9px] font-bold uppercase mb-2" style={{ color: 'rgba(248,242,232,0.5)', letterSpacing: '0.22em' }}>
                                Palette
                              </p>
                              <div className="flex items-center gap-2">
                                {colorHexes.map((c) => (
                                  <div
                                    key={c.name}
                                    className="flex flex-col items-center gap-1"
                                  >
                                    <div
                                      className="w-9 h-9 rounded-full"
                                      style={{
                                        backgroundColor: c.hex,
                                        border: '2px solid rgba(248,242,232,0.20)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                                      }}
                                    />
                                    <span className="text-[8px] uppercase" style={{ color: 'rgba(248,242,232,0.45)', letterSpacing: '0.12em' }}>
                                      {c.name.split(' ')[0]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Mood + Occasion chips */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {mood && (
                              <span
                                className="px-3 py-1.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1"
                                style={{
                                  backgroundColor: 'rgba(199,163,106,0.15)',
                                  color: GOLD,
                                  border: '1px solid rgba(199,163,106,0.30)',
                                }}
                              >
                                {mood.emoji} {mood.label}
                              </span>
                            )}
                            {designData.occasion && (
                              <span
                                className="px-3 py-1.5 rounded-full text-[11px] font-medium"
                                style={{
                                  backgroundColor: 'rgba(248,242,232,0.06)',
                                  color: 'rgba(248,242,232,0.75)',
                                  border: '1px solid rgba(248,242,232,0.15)',
                                }}
                              >
                                {designData.occasion}
                              </span>
                            )}
                          </div>

                          {/* References uploaded note */}
                          {uploadedFiles.length > 0 && (
                            <div className="text-[10px] font-medium pt-3 border-t" style={{ borderColor: 'rgba(199,163,106,0.18)', color: 'rgba(248,242,232,0.5)' }}>
                              ✦ {uploadedFiles.length} reference{uploadedFiles.length > 1 ? 's' : ''} received by the atelier
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Soft sparkle disclaimer */}
                      <div
                        className="p-3.5 rounded-xl flex items-start gap-2.5"
                        style={{
                          backgroundColor: 'rgba(199,163,106,0.08)',
                          border: '1px solid rgba(199,163,106,0.22)',
                        }}
                      >
                        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,242,232,0.7)' }}>
                          <span className="font-semibold" style={{ color: GOLD }}>Your idea becomes a Fabrician concept.</span>{' '}
                          Custom ordering is opening later — save your concept for early review.
                        </p>
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={currentStep === 0 ? () => setPhase('landing') : goPrev}
                className="rounded-2xl text-white/60 hover:text-white hover:bg-white/8"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                {currentStep === 0 ? 'Back' : 'Previous'}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={goNext}
                  className="rounded-2xl font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                    color: NAVY,
                    boxShadow: '0 4px 16px rgba(199,163,106,0.30)',
                  }}
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toast('Notify me feature coming soon!')}
                    className="rounded-2xl border-white/20 text-white hover:bg-white/8"
                  >
                    <Bell className="mr-2 w-4 h-4" />
                    Notify Me
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="rounded-2xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`,
                      color: NAVY,
                    }}
                  >
                    <Save className="mr-2 w-4 h-4" />
                    Save Concept
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

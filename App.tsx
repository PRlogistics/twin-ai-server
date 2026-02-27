import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mic, Settings, RefreshCw, Search, Filter, 
  Copy, Star, Smile, Circle, Apple, Play,
  Briefcase, MapPin, Headphones, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Glass Card Component
const GlassCard = ({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div 
    className={`relative rounded-[28px] backdrop-blur-[18px] saturate-[120%] bg-white/[0.03] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${className}`}
    style={style}
  >
    <div className="absolute inset-0 rounded-[28px] border border-white/[0.06] pointer-events-none" />
    {children}
  </div>
);

// Language Pill Component
const LangPill = ({ code }: { code: string }) => (
  <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-white/90 border border-white/10">
    {code}
  </span>
);

// Waveform Visualization
const Waveform = () => {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-white/60 rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 32 + 8}px`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`
          }}
        />
      ))}
    </div>
  );
};

// Aurora Background
const AuroraBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div 
      className="absolute w-[800px] h-[800px] rounded-full opacity-30"
      style={{
        background: 'radial-gradient(circle, rgba(123,97,255,0.4) 0%, transparent 70%)',
        top: '-20%',
        left: '-10%',
        filter: 'blur(80px)',
        animation: 'aurora1 18s ease-in-out infinite'
      }}
    />
    <div 
      className="absolute w-[600px] h-[600px] rounded-full opacity-20"
      style={{
        background: 'radial-gradient(circle, rgba(123,97,255,0.3) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-5%',
        filter: 'blur(60px)',
        animation: 'aurora2 15s ease-in-out infinite'
      }}
    />
  </div>
);

// Navigation
const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-[4vw] py-4 flex items-center justify-between backdrop-blur-md bg-[#07070A]/50">
    <div className="text-2xl font-bold text-white tracking-tight">TWIN</div>
    <div className="hidden md:flex items-center gap-8">
      <a href="#product" className="text-sm text-[#A7A9B5] hover:text-white transition-colors">Product</a>
      <a href="#solutions" className="text-sm text-[#A7A9B5] hover:text-white transition-colors">Solutions</a>
      <a href="#pricing" className="text-sm text-[#A7A9B5] hover:text-white transition-colors">Pricing</a>
      <a href="#support" className="text-sm text-[#A7A9B5] hover:text-white transition-colors">Support</a>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="ghost" className="text-sm text-[#A7A9B5] hover:text-white">Sign in</Button>
      <Button className="bg-[#7B61FF] hover:bg-[#6B51EF] text-white rounded-xl px-5">Get TWIN</Button>
    </div>
  </nav>
);

// Section 1: Hero
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !leftText || !rightText || !sub || !cta) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(card, 
        { opacity: 0, y: '18vh', scale: 0.92, rotateX: 18 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1 }
      )
      .fromTo(leftText,
        { opacity: 0, y: 40, rotateZ: -2 },
        { opacity: 1, y: 0, rotateZ: 0, duration: 0.7 },
        '-=0.6'
      )
      .fromTo(rightText,
        { opacity: 0, y: 40, rotateZ: 2 },
        { opacity: 1, y: 0, rotateZ: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo([sub, cta],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set([card, leftText, rightText, sub, cta], { opacity: 1, x: 0, y: 0, scale: 1 });
          }
        }
      });

      // Exit animations (70% - 100%)
      scrollTl.fromTo(card,
        { x: 0, opacity: 1, scale: 1 },
        { x: '-28vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      )
      .fromTo(leftText,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(rightText,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo([sub, cta],
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-10 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-between px-[10vw] pointer-events-none">
        <div ref={leftTextRef} className="text-[clamp(32px,4vw,56px)] font-semibold text-white tracking-tight">
          Speak freely
        </div>
        <div ref={rightTextRef} className="text-[clamp(32px,4vw,56px)] font-semibold text-white tracking-tight">
          Be understood
        </div>
      </div>

      <div ref={cardRef} className="absolute" style={{ top: '46vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GlassCard className="w-[min(44vw,520px)] p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <LangPill code="EN" />
              <RefreshCw className="w-4 h-4 text-white/50" />
              <LangPill code="ES" />
            </div>
          </div>
          <div className="text-center py-8">
            <span className="text-[clamp(48px,6vw,80px)] font-semibold text-white">Hello</span>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button className="p-3 rounded-full bg-[#7B61FF]/20 hover:bg-[#7B61FF]/30 transition-colors">
              <Mic className="w-5 h-5 text-[#7B61FF]" />
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Waveform />
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </GlassCard>
      </div>

      <div ref={subRef} className="absolute text-center" style={{ top: '78vh', left: '50%', transform: 'translateX(-50%)' }}>
        <p className="text-[#A7A9B5] text-lg max-w-md">
          Real-time speech translation for meetings, travel, and everyday life.
        </p>
      </div>

      <div ref={ctaRef} className="absolute flex items-center gap-4" style={{ top: '88vh', left: '50%', transform: 'translateX(-50%)' }}>
        <Button className="bg-[#7B61FF] hover:bg-[#6B51EF] text-white rounded-xl px-6 py-5 text-base">
          Get TWIN
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl px-6 py-5 text-base">
          Watch demo
        </Button>
      </div>
    </section>
  );
};

// Section 2: Live Conversation
const LiveConversationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cardA = cardARef.current;
    const cardB = cardBRef.current;

    if (!section || !headline || !cardA || !cardB) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      // Entrance (0% - 30%)
      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(cardA,
        { x: '-50vw', opacity: 0, scale: 0.92, rotateZ: -2 },
        { x: 0, opacity: 1, scale: 1, rotateZ: 0, ease: 'power3.out' },
        0.05
      )
      .fromTo(cardB,
        { x: '50vw', opacity: 0, scale: 0.92, rotateZ: 2 },
        { x: 0, opacity: 1, scale: 1, rotateZ: 0, ease: 'power3.out' },
        0.1
      );

      // Settle (30% - 70%) - hold position

      // Exit (70% - 100%)
      scrollTl.to(headline,
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(cardA,
        { x: '-40vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      )
      .to(cardB,
        { x: '40vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-20 flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Live conversation</h2>
        <p className="text-[#A7A9B5] text-base">Talk naturally. TWIN translates in real time.</p>
      </div>

      <div className="absolute flex items-center justify-center gap-8" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div ref={cardARef}>
          <GlassCard className="w-[min(34vw,400px)] p-6">
            <div className="flex items-center justify-between mb-6">
              <LangPill code="EN" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <Mic className="w-4 h-4 text-white/60" />
              </div>
            </div>
            <div className="text-center py-6">
              <span className="text-[clamp(36px,4vw,56px)] font-semibold text-white">Hello</span>
            </div>
            <div className="flex justify-center mt-4">
              <Waveform />
            </div>
          </GlassCard>
        </div>

        <div ref={cardBRef}>
          <GlassCard className="w-[min(34vw,400px)] p-6">
            <div className="flex items-center justify-between mb-6">
              <LangPill code="ES" />
              <Waveform />
            </div>
            <div className="text-center py-6">
              <span className="text-[clamp(36px,4vw,56px)] font-semibold text-white">Hola</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Settings className="w-5 h-5 text-white/40" />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// Section 3: Two-Way Translation
const TwoWaySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cardA = cardARef.current;
    const cardB = cardBRef.current;

    if (!section || !headline || !cardA || !cardB) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(cardA,
        { x: '-50vw', opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, ease: 'power3.out' },
        0.05
      )
      .fromTo(cardB,
        { x: '50vw', opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, ease: 'power3.out' },
        0.1
      );

      scrollTl.to(headline,
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(cardA,
        { x: '-40vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      )
      .to(cardB,
        { x: '40vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-30 flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Two-way translation</h2>
        <p className="text-[#A7A9B5] text-base">Each person hears their own language. Instantly.</p>
      </div>

      <div className="absolute flex items-center justify-center gap-8" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div ref={cardARef}>
          <GlassCard className="w-[min(34vw,400px)] p-6">
            <div className="flex items-center justify-between mb-6">
              <LangPill code="EN" />
              <Mic className="w-4 h-4 text-[#7B61FF]" />
            </div>
            <div className="text-center py-6">
              <span className="text-[clamp(32px,3.5vw,48px)] font-semibold text-white">Good morning</span>
            </div>
            <div className="text-center text-[#A7A9B5] text-sm mt-2">You speak in English</div>
          </GlassCard>
        </div>

        <div ref={cardBRef}>
          <GlassCard className="w-[min(34vw,400px)] p-6">
            <div className="flex items-center justify-between mb-6">
              <LangPill code="JP" />
              <Waveform />
            </div>
            <div className="text-center py-6">
              <span className="text-[clamp(32px,3.5vw,48px)] font-semibold text-white">おはようございます</span>
            </div>
            <div className="text-center text-[#A7A9B5] text-sm mt-2">They hear in Japanese</div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// Section 4: Choose Your Language
const LanguageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !headline || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(card,
        { y: '60vh', opacity: 0, scale: 0.9, rotateX: 14 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, ease: 'power3.out' },
        0.05
      );

      scrollTl.to(headline,
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(card,
        { y: '-22vh', opacity: 0, scale: 0.97, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-40 flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Choose your language</h2>
        <p className="text-[#A7A9B5] text-base">80+ languages. Male, female, or neutral voice.</p>
      </div>

      <div ref={cardRef} className="absolute" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GlassCard className="w-[min(56vw,680px)] p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <LangPill code="EN" />
              <RefreshCw className="w-4 h-4 text-white/50" />
              <LangPill code="ES" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#7B61FF]/20 border border-[#7B61FF]/40 text-white hover:bg-[#7B61FF]/30 transition-colors">
              <Star className="w-4 h-4" />
              <span className="text-sm">Female</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
              <Smile className="w-4 h-4" />
              <span className="text-sm">Male</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Neutral</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl">
              Add language
            </Button>
            <Button variant="ghost" className="text-[#A7A9B5] hover:text-white">
              Remove
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Section 5: Human-Like Voice
const VoiceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !headline || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(card,
        { scale: 0.85, opacity: 0, rotateY: -18 },
        { scale: 1, opacity: 1, rotateY: 0, ease: 'power3.out' },
        0.05
      );

      scrollTl.to(headline,
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(card,
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-50 flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Human-like voice</h2>
        <p className="text-[#A7A9B5] text-base">Clear, natural delivery that keeps the conversation flowing.</p>
      </div>

      <div ref={cardRef} className="absolute" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GlassCard className="w-[min(44vw,520px)] p-8">
          <div className="flex items-center justify-between mb-8">
            <LangPill code="EN" />
            <div className="flex items-center gap-2 text-[#7B61FF]">
              <div className="w-2 h-2 rounded-full bg-[#7B61FF] animate-pulse" />
              <span className="text-xs">Speaking</span>
            </div>
          </div>
          <div className="text-center py-6">
            <span className="text-[clamp(40px,5vw,64px)] font-semibold text-white">Hello</span>
          </div>
          <div className="mt-8">
            <svg viewBox="0 0 300 60" className="w-full h-16">
              {[...Array(4)].map((_, i) => (
                <path
                  key={i}
                  d={`M0,30 Q37.5,${30 + (i + 1) * 8} 75,30 T150,30 T225,30 T300,30`}
                  fill="none"
                  stroke="rgba(123,97,255,0.6)"
                  strokeWidth="1.5"
                  opacity={1 - i * 0.2}
                  style={{
                    animation: `wave 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </svg>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Section 6: Live Text Transcript
const TranscriptSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !headline || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(card,
        { y: '55vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'power3.out' },
        0.05
      );

      scrollTl.to(headline,
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(card,
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-[60] flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Live text transcript</h2>
        <p className="text-[#A7A9B5] text-base">Read what was said, copy, or share it after the call.</p>
      </div>

      <div ref={cardRef} className="absolute" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GlassCard className="w-[min(44vw,520px)] p-8">
          <div className="flex items-center justify-between mb-8">
            <LangPill code="EN" />
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Copy className="w-4 h-4 text-white/60" />
            </button>
          </div>
          <div className="text-center py-6">
            <span className="text-[clamp(40px,5vw,64px)] font-semibold text-white">Hello</span>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-[#A7A9B5] text-sm">Transcript:</p>
            <p className="text-white/80 text-sm mt-1">"Hello, it's nice to meet you today."</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Section 7: Smart History
const HistorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !headline || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      scrollTl.fromTo(headline,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      )
      .fromTo(card,
        { y: '60vh', opacity: 0, scale: 0.9, rotateX: 12 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, ease: 'power3.out' },
        0.05
      );

      scrollTl.to(headline,
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .to(card,
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-[70] flex items-center justify-center">
      <div ref={headlineRef} className="absolute text-center" style={{ top: '18vh', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Smart history</h2>
        <p className="text-[#A7A9B5] text-base">Search, filter, and revisit any conversation in seconds.</p>
      </div>

      <div ref={cardRef} className="absolute" style={{ top: '58vh', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <GlassCard className="w-[min(56vw,680px)] p-8">
          <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <Search className="w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10 transition-colors">
              <Filter className="w-3 h-3" />
              Date
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10 transition-colors">
              <Filter className="w-3 h-3" />
              Language
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-[#7B61FF]" />
              <div className="flex-1">
                <p className="text-white text-sm">Business meeting with Tokyo team</p>
                <p className="text-[#A7A9B5] text-xs mt-0.5">EN → JP • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="text-white text-sm">Restaurant reservation in Paris</p>
                <p className="text-[#A7A9B5] text-xs mt-0.5">EN → FR • Yesterday</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Section 8: Built for Work, Travel & Life
const UseCasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.usecase-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      gsap.fromTo('.usecase-tile',
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.usecase-grid',
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const useCases = [
    { icon: Briefcase, title: 'Business meetings', desc: 'Close deals across languages' },
    { icon: MapPin, title: 'Travel & directions', desc: 'Navigate anywhere confidently' },
    { icon: Headphones, title: 'Customer support', desc: 'Help customers in their language' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 z-[80] bg-[#07070A]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="usecase-header text-center mb-16">
          <h2 className="text-[clamp(28px,3.2vw,44px)] font-semibold text-white mb-3">Built for work, travel & life</h2>
          <p className="text-[#A7A9B5] text-base">Use TWIN in the moments that matter most.</p>
        </div>

        <div className="usecase-grid grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <GlassCard key={i} className="usecase-tile p-6 hover:translate-y-[-6px] hover:scale-[1.01] transition-transform cursor-pointer">
              <useCase.icon className="w-8 h-8 text-[#7B61FF] mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{useCase.title}</h3>
              <p className="text-[#A7A9B5] text-sm">{useCase.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <Button className="bg-[#7B61FF] hover:bg-[#6B51EF] text-white rounded-xl px-6">Get TWIN</Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl">View pricing</Button>
        </div>
      </div>
    </section>
  );
};

// Section 9: Download CTA
const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.download-content',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 z-[90] bg-[#07070A]">
      <div className="download-content max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-[clamp(32px,4vw,56px)] font-semibold text-white mb-4">Download TWIN today</h2>
        <p className="text-[#A7A9B5] text-lg mb-8">Available on iOS, Android, and Web.</p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Apple className="w-6 h-6 text-white" />
            <div className="text-left">
              <p className="text-white/60 text-xs">Download on the</p>
              <p className="text-white font-medium text-sm">App Store</p>
            </div>
          </button>
          <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Play className="w-6 h-6 text-white" />
            <div className="text-left">
              <p className="text-white/60 text-xs">Get it on</p>
              <p className="text-white font-medium text-sm">Google Play</p>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 text-sm text-[#A7A9B5]">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>

        <p className="text-[#A7A9B5]/60 text-xs mt-8">© 2025 TWIN AI. All rights reserved.</p>
      </div>
    </section>
  );
};

// Main App
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07070A] text-[#F4F6FF] overflow-x-hidden">
      <style>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.05); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, -3%) scale(1.03); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      
      <AuroraBackground />
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        <LiveConversationSection />
        <TwoWaySection />
        <LanguageSection />
        <VoiceSection />
        <TranscriptSection />
        <HistorySection />
        <UseCasesSection />
        <DownloadSection />
      </main>
    </div>
  );
}

export default App;
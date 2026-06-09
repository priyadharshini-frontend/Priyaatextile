'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/Banner/ban1.jpeg',
    label: 'New Arrivals',
    title: 'Elegant',
    accent: 'Saree',
    subtitle: 'Collection',
    desc: 'Timeless beauty woven into every thread — crafted for the woman who commands every room.',
    tags: ['Kanjivaram', 'Banarasi', 'Pure Silk'],
    cta: 'Explore Collection',
    ctaSecondary: 'View Lookbook',
    ghost: 'Saree',
    accentColor: '#d4af37',
  },
  {
    id: 2,
    image: '/images/Banner/ban1.jpeg',
    label: 'Luxury Arrivals',
    title: 'Premium',
    accent: 'Fashion',
    subtitle: 'Redefined',
    desc: 'Where heritage meets haute couture — premium styles that speak without words.',
    tags: ['Georgette', 'Chiffon', 'Crepe'],
    cta: 'Shop Now',
    ctaSecondary: 'Our Story',
    ghost: 'Style',
    accentColor: '#e8c87a',
  },
  {
    id: 3,
    image: '/images/Banner/ban1.jpeg',
    label: 'Festive 2026',
    title: 'Celebrate',
    accent: 'In Style',
    subtitle: '',
    desc: 'Every celebration deserves a saree that becomes the memory — this is yours.',
    tags: ['Zari', 'Embroidery', 'Handwoven'],
    cta: 'Festive Edit',
    ctaSecondary: 'Gift Guide',
    ghost: 'Festive',
    accentColor: '#d4af37',
  },
];

/* ─── WebGL particle system overlay ───────────────────────────
   Tiny gold dust particles that float over the image —
   subtle 3D depth without hiding the saree photo              */
const PARTICLE_VS = `
attribute float a_id;
uniform float u_time;
uniform float u_count;
uniform vec2  u_res;

float rand(float n){ return fract(sin(n*127.1+39.7)*43758.5453); }

void main(){
  float id = a_id;
  float px = rand(id)        * 2.0 - 1.0;
  float py = rand(id + 100.0)* 2.0 - 1.0;
  float sz = rand(id + 200.0)* 2.5 + 1.0;
  float sp = rand(id + 300.0)* 0.4 + 0.1;
  float ph = rand(id + 400.0)* 6.28;

  float t = u_time * sp + ph;
  float ox = sin(t * 0.7 + id) * 0.04;
  float oy = cos(t * 0.5 + id) * 0.03;

  /* drift upward slowly */
  float drift = mod(u_time * sp * 0.3 + rand(id+500.0), 2.0) - 1.0;

  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  gl_Position = vec4((px + ox) / aspect.x, py * 0.8 + drift * 0.6 + oy, 0.0, 1.0);
  gl_PointSize = sz * (u_res.y / 600.0);
}
`;

const PARTICLE_FS = `
precision mediump float;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if(d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, d) * 0.55;
  gl_FragColor = vec4(0.83, 0.69, 0.22, alpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
function createProg(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const COUNT = 80;
    const ids = new Float32Array(COUNT).map((_, i) => i);

    const prog = createProg(gl, PARTICLE_VS, PARTICLE_FS);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, ids, gl.STATIC_DRAW);

    const aId    = gl.getAttribLocation(prog, 'a_id');
    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uCount = gl.getUniformLocation(prog, 'u_count');
    const uRes   = gl.getUniformLocation(prog, 'u_res');

    gl.enableVertexAttribArray(aId);
    gl.vertexAttribPointer(aId, 1, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const start = performance.now();
    let raf = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      const t = (performance.now() - start) / 1000;
      const w = canvas.width, h = canvas.height;
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime,  t);
      gl.uniform1f(uCount, COUNT);
      gl.uniform2f(uRes,   w, h);
      gl.drawArrays(gl.POINTS, 0, COUNT);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:4 }} />;
}

/* ─── Main Hero ───────────────────────────────────────────── */
export default function HeroSection() {
  const [cur, setCur]             = useState(0);
  const [prev, setPrev]           = useState<number|null>(null);
  const [transitioning, setTrans] = useState(false);
  const [mousePos, setMouse]      = useState({ x:0.5, y:0.5 });
  const [scrollY, setScroll]      = useState(0);
  const [loaded, setLoaded]       = useState(false);
  const intervalRef               = useRef<ReturnType<typeof setInterval>|null>(null);

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === cur) return;
    setTrans(true); setPrev(cur); setCur(idx);
    setTimeout(() => { setTrans(false); setPrev(null); }, 1100);
  }, [transitioning, cur]);

  const next = useCallback(() => goTo((cur + 1) % slides.length), [cur, goTo]);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  }, [next]);

  useEffect(() => { resetInterval(); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [resetInterval]);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const m = (e: MouseEvent) => setMouse({ x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight });
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);
  useEffect(() => {
    const s = () => setScroll(window.scrollY);
    window.addEventListener('scroll', s, { passive:true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  const slide = slides[cur];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --gold:      #d4af37;
          --gold-hi:   #e8c87a;
          --gold-lo:   rgba(212,175,55,0.18);
          --gold-dim:  rgba(212,175,55,0.06);
          --maroon:    #1a0808;
        }
        .hs2-root  { font-family:'Outfit',sans-serif; }
        .hs2-serif { font-family:'Cormorant Garamond',serif; }

        /* ── Slide images ── */
        .hs2-img {
          position:absolute; inset:0; z-index:0;
          transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .hs2-img.enter  { opacity:1; }
        .hs2-img.exit   { opacity:0; }
        .hs2-img-inner  {
          position:absolute; inset:-6%;
          transition: transform 8s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .hs2-img.enter .hs2-img-inner { transform: scale(1.08) translateY(0px); }
        .hs2-img.exit  .hs2-img-inner { transform: scale(1.14) translateY(-20px); }

        /* ── Overlays ── */
        .hs2-overlay-left {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background: linear-gradient(
            105deg,
            rgba(10,3,3,0.92) 0%,
            rgba(10,3,3,0.78) 28%,
            rgba(10,3,3,0.38) 55%,
            rgba(10,3,3,0.05) 75%,
            rgba(10,3,3,0.00) 100%
          );
        }
        .hs2-overlay-bottom {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background: linear-gradient(to top,
            rgba(10,3,3,0.85) 0%,
            rgba(10,3,3,0.40) 20%,
            transparent 45%
          );
        }
        .hs2-overlay-top {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background: linear-gradient(to bottom,
            rgba(10,3,3,0.55) 0%,
            transparent 20%
          );
        }
        /* Vignette */
        .hs2-vignette {
          position:absolute; inset:0; z-index:3; pointer-events:none;
          background: radial-gradient(ellipse 110% 100% at 70% 50%,
            transparent 40%,
            rgba(10,3,3,0.55) 100%
          );
        }

        /* ── Shimmer light follows mouse ── */
        .hs2-mouse-light {
          position:absolute; inset:0; z-index:3; pointer-events:none;
          transition: background 0.6s ease;
        }

        /* ── 3D gold frame border (CSS 3D perspective) ── */
        .hs2-frame {
          position:absolute; z-index:8; pointer-events:none;
          inset: 18px 14px;
          border: 1px solid rgba(212,175,55,0.12);
          transform: perspective(1200px) rotateY(-1.5deg) rotateX(0.5deg);
          transform-origin: left center;
        }
        .hs2-frame::before,
        .hs2-frame::after {
          content:'';
          position:absolute;
          background: var(--gold);
        }
        /* Top-left corner */
        .hs2-frame::before { top:0; left:0; width:40px; height:1px; box-shadow: 0 0 8px rgba(212,175,55,0.6); }
        .hs2-frame::after  { top:0; left:0; width:1px;  height:40px; box-shadow: 0 0 8px rgba(212,175,55,0.6); }

        /* ── Corner accents ── */
        .hs2-corner {
          position:absolute; width:28px; height:28px; z-index:9; pointer-events:none;
        }
        .hs2-corner-line {
          position:absolute; background:var(--gold);
          box-shadow: 0 0 6px rgba(212,175,55,0.5);
        }

        /* ── Content animations ── */
        @keyframes hs2-rise    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hs2-slide   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hs2-linein  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes hs2-glow    { 0%,100%{opacity:0.35} 50%{opacity:0.9} }
        @keyframes hs2-float   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
        @keyframes hs2-badge   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes hs2-prog    { from{width:0%} to{width:100%} }
        @keyframes hs2-fadein  { from{opacity:0} to{opacity:1} }
        @keyframes hs2-dotpulse{ 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.5} }
        @keyframes hs2-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes hs2-zari    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes hs2-scanline{ 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

        .hs2-a1 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
        .hs2-a2 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
        .hs2-a3 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
        .hs2-a4 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
        .hs2-a5 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.56s both; }
        .hs2-a6 { animation: hs2-rise 0.75s cubic-bezier(0.22,1,0.36,1) 0.68s both; }
        .hs2-atag { animation: hs2-slide 0.65s cubic-bezier(0.22,1,0.36,1) 0.04s both; }

        /* ── Buttons ── */
        .hs2-btn-primary {
          position:relative; overflow:hidden;
          background: linear-gradient(135deg, #d4af37 0%, #e8c87a 50%, #d4af37 100%);
          background-size: 200% 100%;
          color:#1a0808; border:none;
          padding:15px 36px;
          font-family:'Outfit',sans-serif; font-size:12px; font-weight:600;
          letter-spacing:0.2em; text-transform:uppercase; cursor:pointer;
          transition:transform 0.3s, box-shadow 0.3s;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .hs2-btn-primary:hover {
          transform:translateY(-3px);
          box-shadow: 0 16px 40px rgba(212,175,55,0.45);
          animation: hs2-shimmer 1.5s linear infinite;
        }
        .hs2-btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
          background-size:200% 100%;
          opacity:0; transition:opacity 0.3s;
        }
        .hs2-btn-primary:hover::after { opacity:1; animation:hs2-shimmer 1.2s ease infinite; }

        .hs2-btn-secondary {
          background:transparent; color:rgba(255,255,255,0.65);
          border:1px solid rgba(212,175,55,0.28);
          padding:14px 30px;
          font-family:'Outfit',sans-serif; font-size:12px; font-weight:400;
          letter-spacing:0.16em; text-transform:uppercase; cursor:pointer;
          transition:all 0.3s;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .hs2-btn-secondary:hover { background:rgba(212,175,55,0.08); color:var(--gold); border-color:rgba(212,175,55,0.55); }

        /* ── Zari border strip (animated gold gradient) ── */
        .hs2-zari-strip {
          position:absolute; left:0; right:0; height:3px; z-index:15;
          background: linear-gradient(90deg, #7a5c00, #d4af37, #fff8dc, #d4af37, #e8c87a, #d4af37, #7a5c00);
          background-size:300% 100%;
          animation: hs2-zari 4s ease infinite;
        }

        /* ── Scan line effect ── */
        .hs2-scanline {
          position:absolute; left:0; right:0; height:2px; z-index:15; pointer-events:none;
          background:linear-gradient(90deg,transparent,rgba(212,175,55,0.12),transparent);
          animation: hs2-scanline 8s linear infinite;
        }

        /* ── Dots nav ── */
        .hs2-dot {
          width:3px; height:12px; border-radius:99px; border:none; cursor:pointer; padding:0;
          background:rgba(212,175,55,0.22);
          transition:all 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .hs2-dot.on { height:44px; background:var(--gold); box-shadow:0 0 10px rgba(212,175,55,0.5); }

        /* ── Scroll line ── */
        .hs2-scrollline {
          width:1px; height:56px;
          background:linear-gradient(to bottom,transparent,var(--gold),transparent);
          animation:hs2-glow 2.5s ease-in-out infinite;
        }

        /* ── Ghost text ── */
        .hs2-ghost {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(100px,17vw,240px); font-weight:700; line-height:0.85;
          letter-spacing:-0.05em;
          color:transparent;
          -webkit-text-stroke: 1px rgba(212,175,55,0.07);
          user-select:none; pointer-events:none;
        }

        /* ── Stat cards ── */
        .hs2-stat {
          background:rgba(26,8,8,0.72);
          border:1px solid rgba(212,175,55,0.15);
          backdrop-filter:blur(18px);
          padding:14px 18px;
          min-width:144px;
          animation:hs2-float 4.5s ease-in-out infinite;
          position:relative; overflow:hidden;
        }
        .hs2-stat::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--gold),transparent);
        }
        .hs2-stat+.hs2-stat { animation-delay:2s; }

        /* ── "New" badge ── */
        .hs2-new-badge {
          position:absolute; top:0; right:0; z-index:20;
          width:72px; height:72px;
          background:conic-gradient(var(--gold) 0deg 360deg);
          clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
          display:flex; align-items:center; justify-content:center;
          font-family:'Outfit',sans-serif; font-size:8px; font-weight:700;
          letter-spacing:0.1em; text-transform:uppercase; color:#1a0808;
          transform-origin:center;
          animation: hs2-badge 3s ease-in-out infinite;
        }

        /* ── Responsive ── */
        @media (max-width:1023px) {
          .hs2-stat-group { display:none !important; }
          .hs2-frame { display:none !important; }
        }
        @media (max-width:767px) {
          .hs2-sidebar { display:none !important; }
          .hs2-bottom-bar { left:16px !important; right:48px !important; }
          .hs2-dots { right:12px !important; }
          .hs2-new-badge { width:56px; height:56px; font-size:7px; }
        }
        @media (max-width:480px) {
          .hs2-btn-row { flex-direction:column !important; }
          .hs2-btn-primary, .hs2-btn-secondary { width:100%; text-align:center; justify-content:center; }
        }
      `}</style>

      <section
        className="hs2-root"
        style={{ position:'relative', height:'100dvh', minHeight:640, overflow:'hidden', background:'#080202' }}
      >

        {/* ══ BACKGROUND IMAGES — full bleed, always visible ══ */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hs2-img ${i === cur ? 'enter' : 'exit'}`}
          >
            <div className="hs2-img-inner" style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.08)` }}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover object-top"
                sizes="100vw"
                priority={i === 0}
                quality={95}
              />
            </div>
          </div>
        ))}

        {/* ══ OVERLAYS — preserve image, add depth ══ */}
        <div className="hs2-overlay-top"    />
        <div className="hs2-overlay-bottom" />
        <div className="hs2-overlay-left"   />
        <div className="hs2-vignette"       />

        {/* Mouse warmth light */}
        <div
          className="hs2-mouse-light"
          style={{ background:`radial-gradient(ellipse 600px 500px at ${mousePos.x*100}% ${mousePos.y*100}%, rgba(212,175,55,0.06) 0%, transparent 70%)` }}
        />

        {/* ══ GOLD DUST PARTICLES (WebGL) ══ */}
        <ParticleCanvas />

        {/* ══ ZARI BORDER STRIPS ══ */}
        <div className="hs2-zari-strip" style={{ top:0 }} />
        <div className="hs2-zari-strip" style={{ bottom:0 }} />

        {/* Moving scan line */}
        <div className="hs2-scanline" />

        {/* ══ 3D PERSPECTIVE FRAME ══ */}
        <div className="hs2-frame">
          {/* Bottom-right corner */}
          <div style={{ position:'absolute', bottom:0, right:0, width:32, height:1, background:'var(--gold)', boxShadow:'0 0 6px rgba(212,175,55,0.5)' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:1, height:32, background:'var(--gold)', boxShadow:'0 0 6px rgba(212,175,55,0.5)' }} />
        </div>

        {/* ══ GHOST TEXT ══ */}
        <div
          key={`ghost-${cur}`}
          className="hs2-ghost"
          style={{
            position:'absolute', right:'-2%', bottom:'-6%', zIndex:3,
            animation:'hs2-fadein 1s ease 0.1s both',
          }}
        >
          {slide.ghost}
        </div>

        {/* ══ NEW ARRIVAL BADGE ══ */}
        <div className="hs2-new-badge" style={{ top:28, right:28 }}>
          <span>New</span>
        </div>

        {/* ══ LEFT SIDEBAR ══ */}
        <div className="hs2-sidebar" style={{ position:'absolute', left:0, top:0, bottom:0, width:52, zIndex:12, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', padding:'40px 0' }}>
          <div style={{ writingMode:'vertical-rl', transform:'rotate(180deg)', fontSize:8, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(212,175,55,0.25)', fontFamily:"'Outfit',sans-serif" }}>
            Heritage · Boutique
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
            <div className="hs2-scrollline" />
            <span style={{ writingMode:'vertical-rl', fontSize:7, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(212,175,55,0.25)', fontFamily:"'Outfit',sans-serif" }}>Scroll</span>
          </div>
        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div style={{
          position:'absolute', inset:0, zIndex:10,
          display:'flex', alignItems:'center',
          paddingLeft:'clamp(60px,9vw,130px)',
          paddingRight:'clamp(16px,4vw,64px)',
          paddingTop:72,
        }}>
          <div style={{ maxWidth:560, width:'100%' }}>

            {/* Collection label */}
            <div key={`lbl-${cur}`} className="hs2-atag" style={{ marginBottom:28 }}>
              <span style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'6px 16px',
                border:'1px solid rgba(212,175,55,0.22)',
                background:'rgba(212,175,55,0.06)',
                backdropFilter:'blur(8px)',
                fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
                color:'rgba(212,175,55,0.85)', fontFamily:"'Outfit',sans-serif",
              }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', display:'inline-block', animation:'hs2-dotpulse 2s ease-in-out infinite' }} />
                {slide.label}
              </span>
            </div>

            {/* Headline — 3-line typographic stack */}
            <div key={`h-${cur}`}>
              <h1
                className="hs2-serif hs2-a1"
                style={{ fontSize:'clamp(50px,7.8vw,96px)', fontWeight:300, lineHeight:0.92, color:'#fff', margin:0, letterSpacing:'-0.025em' }}
              >
                {slide.title}
              </h1>

              <div className="hs2-a2" style={{ display:'flex', alignItems:'center', gap:16, margin:'8px 0' }}>
                {/* Animated gold rule */}
                <div style={{ width:40, height:1, background:'var(--gold)', transformOrigin:'left', animation:'hs2-linein 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both', flexShrink:0 }} />
                <h1
                  className="hs2-serif"
                  style={{ fontSize:'clamp(50px,7.8vw,96px)', fontWeight:700, fontStyle:'italic', lineHeight:0.92, color:'var(--gold)', margin:0, letterSpacing:'-0.025em', textShadow:'0 0 40px rgba(212,175,55,0.3)' }}
                >
                  {slide.accent}
                </h1>
              </div>

              {slide.subtitle && (
                <h1
                  className="hs2-serif hs2-a3"
                  style={{ fontSize:'clamp(50px,7.8vw,96px)', fontWeight:300, lineHeight:0.92, color:'rgba(255,255,255,0.22)', margin:0, letterSpacing:'-0.025em' }}
                >
                  {slide.subtitle}
                </h1>
              )}
            </div>

            {/* Divider */}
            <div className="hs2-a3" style={{ display:'flex', alignItems:'center', gap:14, marginTop:24 }}>
              <div style={{ flex:1, maxWidth:64, height:1, background:'linear-gradient(90deg,var(--gold),transparent)', opacity:0.5 }} />
              <div style={{ width:5, height:5, borderRadius:'50%', background:'var(--gold)', opacity:0.6 }} />
              <div style={{ width:32, height:1, background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.3))', opacity:0.5 }} />
            </div>

            {/* Description */}
            <p
              key={`d-${cur}`}
              className="hs2-a4"
              style={{ marginTop:20, fontSize:'clamp(13px,1.25vw,15.5px)', lineHeight:1.82, color:'rgba(255,255,255,0.5)', fontWeight:300, maxWidth:420, marginBottom:0 }}
            >
              {slide.desc}
            </p>

            {/* Fabric tags */}
            <div key={`tags-${cur}`} className="hs2-a4" style={{ display:'flex', alignItems:'center', gap:0, marginTop:16, flexWrap:'wrap', rowGap:6 }}>
              {slide.tags.map((t, i) => (
                <span key={t} style={{ display:'flex', alignItems:'center' }}>
                  <span style={{
                    fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase',
                    color:'rgba(212,175,55,0.5)', fontFamily:"'Outfit',sans-serif",
                    padding:'3px 10px',
                    background: i === 0 ? 'rgba(212,175,55,0.06)' : 'transparent',
                    border: i === 0 ? '1px solid rgba(212,175,55,0.14)' : 'none',
                  }}>
                    {t}
                  </span>
                  {i < slide.tags.length-1 && <span style={{ color:'rgba(212,175,55,0.2)', fontSize:10, padding:'0 2px' }}>·</span>}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div key={`cta-${cur}`} className="hs2-a5 hs2-btn-row" style={{ display:'flex', gap:14, marginTop:36, flexWrap:'wrap', alignItems:'center' }}>
              <button className="hs2-btn-primary">
                {slide.cta} &nbsp;→
              </button>
              <button className="hs2-btn-secondary">
                {slide.ctaSecondary}
              </button>
            </div>

            {/* Trust signals */}
            <div key={`trust-${cur}`} className="hs2-a6" style={{ display:'flex', gap:20, marginTop:28, flexWrap:'wrap' }}>
              {['Free Returns', 'Cash on Delivery', '100% Authentic'].map((t) => (
                <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, letterSpacing:'0.08em', color:'rgba(255,255,255,0.38)', fontFamily:"'Outfit',sans-serif" }}>
                  <span style={{ width:14, height:14, borderRadius:'50%', border:'1px solid rgba(212,175,55,0.3)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'var(--gold)' }}>✓</span>
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* ══ FLOATING STAT CARDS (right side) ══ */}
        <div
          className="hs2-stat-group"
          style={{ position:'absolute', right:36, bottom:96, display:'flex', flexDirection:'column', gap:12, zIndex:12 }}
        >
          {[
            { icon:'✦', label:'New This Week', value:'240+', sub:'Styles Added' },
            { icon:'⬡', label:'Free Shipping', value:'₹999+', sub:'Pan India' },
          ].map((card) => (
            <div key={card.label} className="hs2-stat">
              <div style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(212,175,55,0.4)', fontFamily:"'Outfit',sans-serif", marginBottom:5, display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ color:'var(--gold)' }}>{card.icon}</span>
                {card.label}
              </div>
              <div className="hs2-serif" style={{ fontSize:28, fontWeight:700, color:'#fff', lineHeight:1 }}>{card.value}</div>
              <div style={{ fontSize:10, color:'rgba(212,175,55,0.6)', fontFamily:"'Outfit',sans-serif", marginTop:3 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* ══ VERTICAL DOTS NAV ══ */}
        <div
          className="hs2-dots"
          style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:12, zIndex:20 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hs2-dot ${i===cur ? 'on' : ''}`}
              onClick={() => { goTo(i); resetInterval(); }}
              aria-label={`Slide ${i+1}`}
            />
          ))}
        </div>

        {/* ══ GOLD PROGRESS BAR ══ */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'rgba(212,175,55,0.08)', zIndex:20 }}>
          <div
            key={`prog-${cur}`}
            style={{ height:'100%', background:'linear-gradient(90deg,#7a5c00,#d4af37,#e8c87a)', animation:'hs2-prog 6s linear both', width:0 }}
          />
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div
          className="hs2-bottom-bar"
          style={{ position:'absolute', bottom:20, left:'clamp(60px,9vw,130px)', right:72, zIndex:20, display:'flex', alignItems:'center', justifyContent:'space-between' }}
        >
          {/* Slide counter */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span className="hs2-serif" style={{ fontSize:32, fontWeight:700, color:'var(--gold)', lineHeight:1 }}>
              {String(cur+1).padStart(2,'0')}
            </span>
            <div style={{ width:28, height:1, background:'rgba(212,175,55,0.25)' }} />
            <span className="hs2-serif" style={{ fontSize:17, color:'rgba(255,255,255,0.2)', lineHeight:1 }}>
              {String(slides.length).padStart(2,'0')}
            </span>
          </div>

          {/* Next button */}
          <button
            onClick={() => { next(); resetInterval(); }}
            style={{ display:'flex', alignItems:'center', gap:10, background:'transparent', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', fontFamily:"'Outfit',sans-serif", fontSize:9, letterSpacing:'0.24em', textTransform:'uppercase', transition:'color 0.25s', padding:0 }}
            onMouseEnter={e => (e.currentTarget.style.color='var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.35)')}
          >
            Next
            <span style={{ width:34, height:34, border:'1px solid rgba(212,175,55,0.25)', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:15, transition:'border-color 0.25s' }}>
              →
            </span>
          </button>
        </div>

      </section>
    </>
  );
}

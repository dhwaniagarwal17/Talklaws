/**
 * components/ArticleIllustration.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the cover visual for an article card or article page.
 *
 * Resolution order (highest priority first):
 *   1. article.coverImage   — per-article override, set on the Article object
 *   2. CATEGORY_IMAGES map  — category-level image from lib/categoryImages.ts
 *   3. SVG illustration     — per-category hand-crafted fallback
 *   4. Default SVG scales   — balanced scales for any uncovered category
 *
 * HOW TO ADD A REAL IMAGE FOR A CATEGORY:
 *   Drop the file into public/images/articles/categories/ and set the path
 *   in lib/categoryImages.ts. No changes needed here or in any article data.
 *
 * HOW TO OVERRIDE FOR ONE SPECIFIC ARTICLE:
 *   Set coverImage: "/images/articles/my-image.jpg" on that article in
 *   lib/articles.ts. It will take priority over the category image.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from "react";
import Image from "next/image";
import type { ArticleCategory } from "@/lib/types";
import { getCategoryImage } from "@/lib/categoryImages";

interface Props {
  category: ArticleCategory;
  /** Per-article override — takes priority over category image */
  coverImage?: string;
  title: string;
  className?: string;
  hero?: boolean;
}

// ── Shared palette tokens ─────────────────────────────────────────────────────
const P = "var(--primary)";
const S = "var(--secondary)";
const G = "var(--luxury)";
const B = "var(--border)";
const BG = "var(--surface)";

// ── Category SVG illustrations ────────────────────────────────────────────────

function IllustDPDP() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[50,100,150,200,250,300,350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <rect x="155" y="110" width="90" height="68" rx="10" fill={P} fillOpacity="0.12" stroke={P} strokeWidth="1.5" />
      <path d="M175 110 L175 82 Q200 58 225 82 L225 110" stroke={P} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="200" cy="137" r="9" fill={P} fillOpacity="0.25" stroke={P} strokeWidth="1.2" />
      <rect x="196" y="142" width="8" height="14" rx="4" fill={P} fillOpacity="0.4" />
      {[[80,50],[320,50],[60,150],[340,155],[130,170],[270,40]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="5" fill={G} fillOpacity="0.5" />)}
      <line x1="80" y1="50" x2="155" y2="110" stroke={G} strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3" />
      <line x1="320" y1="50" x2="245" y2="110" stroke={G} strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3" />
      <line x1="60" y1="150" x2="155" y2="144" stroke={G} strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3" />
      <line x1="340" y1="155" x2="245" y2="144" stroke={G} strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="4 3" />
      <circle cx="200" cy="144" r="52" stroke={G} strokeWidth="0.6" fill="none" strokeOpacity="0.2" />
    </svg>
  );
}

function IllustStartups() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[60,120,180,240,300,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[50,100,150].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <path d="M200 30 C220 50 228 90 220 130 L200 142 L180 130 C172 90 180 50 200 30Z" fill={P} fillOpacity="0.15" stroke={P} strokeWidth="1.5" />
      <path d="M185 58 Q200 30 215 58Z" fill={P} fillOpacity="0.35" />
      <circle cx="200" cy="95" r="13" stroke={G} strokeWidth="1.5" fill={G} fillOpacity="0.12" />
      <path d="M180 130 L162 155 L180 148Z" fill={P} fillOpacity="0.25" stroke={P} strokeWidth="1" />
      <path d="M220 130 L238 155 L220 148Z" fill={P} fillOpacity="0.25" stroke={P} strokeWidth="1" />
      <ellipse cx="200" cy="148" rx="12" ry="8" fill={G} fillOpacity="0.25" />
      <circle cx="320" cy="100" r="38" stroke={B} strokeWidth="0.5" fill="none" />
      <path d="M320 100 L320 62 A38 38 0 0 1 353 119 Z" fill={P} fillOpacity="0.35" />
      <path d="M320 100 L353 119 A38 38 0 0 1 287 119 Z" fill={G} fillOpacity="0.45" />
      <path d="M320 100 L287 119 A38 38 0 0 1 320 62 Z" fill={S} fillOpacity="0.25" />
      <circle cx="320" cy="100" r="16" fill={BG} />
      {[[80,40],[100,160],[60,90],[340,30],[360,170]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" fill={G} fillOpacity="0.6" />)}
    </svg>
  );
}

function IllustMA() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[80,160,240,320].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[50,100,150].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <circle cx="155" cy="100" r="58" fill={P} fillOpacity="0.08" stroke={P} strokeWidth="1.5" />
      <circle cx="245" cy="100" r="58" fill={S} fillOpacity="0.08" stroke={S} strokeWidth="1.5" />
      <path d="M200 52 Q224 66 224 100 Q224 134 200 148 Q176 134 176 100 Q176 66 200 52Z" fill={G} fillOpacity="0.18" stroke={G} strokeWidth="1" />
      <ellipse cx="155" cy="100" rx="24" ry="40" stroke={P} strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <line x1="97" y1="100" x2="213" y2="100" stroke={P} strokeWidth="0.8" strokeOpacity="0.3" />
      <ellipse cx="245" cy="100" rx="24" ry="40" stroke={S} strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <line x1="187" y1="100" x2="303" y2="100" stroke={S} strokeWidth="0.8" strokeOpacity="0.3" />
      <path d="M192 96 L208 100 L192 104" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IllustSEBI() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[80,160,240,320].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      {[[80,50,170],[120,60,155],[160,40,145],[200,65,150],[240,45,135],[280,55,130],[320,38,120]].map(([x,top,bot],i) => (
        <line key={i} x1={x} y1={top} x2={x} y2={bot} stroke={i%2===0?P:S} strokeWidth="1" strokeOpacity="0.5" />
      ))}
      {([
        [72,80,16,50,true],[112,75,16,40,false],[152,68,16,45,true],
        [192,82,16,38,false],[232,62,16,42,true],[272,72,16,35,false],[312,55,16,38,true],
      ] as [number,number,number,number,boolean][]).map(([x,y,w,h,bull],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={bull?P:S} fillOpacity="0.3" stroke={bull?P:S} strokeWidth="1" />
      ))}
      <polyline points="80,145 120,135 160,125 200,118 240,108 280,98 320,88" stroke={G} strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
      <path d="M200 18 L230 30 L230 58 Q230 78 200 90 Q170 78 170 58 L170 30 Z" fill={G} fillOpacity="0.12" stroke={G} strokeWidth="1.2" />
      <path d="M191 52 L197 58 L212 43" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IllustGovernance() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <ellipse cx="200" cy="100" rx="100" ry="55" fill={P} fillOpacity="0.08" stroke={P} strokeWidth="1.5" />
      {[120,160,200,240,280].map((x,i) => <rect key={i} x={x-10} y="28" width="20" height="14" rx="4" fill={i===2?G:P} fillOpacity={i===2?0.45:0.25} stroke={i===2?G:P} strokeWidth="1" />)}
      {[120,160,200,240,280].map((x,i) => <rect key={i} x={x-10} y="158" width="20" height="14" rx="4" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />)}
      {[75,105].map((y,i) => <rect key={i} x="74" y={y-7} width="14" height="14" rx="4" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />)}
      {[75,105].map((y,i) => <rect key={i} x="312" y={y-7} width="14" height="14" rx="4" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />)}
      <circle cx="200" cy="100" r="14" fill={G} fillOpacity="0.15" stroke={G} strokeWidth="1" />
      <text x="200" y="105" textAnchor="middle" fontSize="12" fill={G} fillOpacity="0.7">★</text>
    </svg>
  );
}

function IllustCSR() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <rect x="148" y="100" width="104" height="80" rx="3" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="1.2" />
      {[[158,112],[178,112],[198,112],[218,112],[238,112],[158,135],[178,135],[198,135],[218,135],[238,135]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="12" height="12" rx="2" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="0.6" />
      ))}
      <rect x="192" y="158" width="16" height="22" rx="2" fill={P} fillOpacity="0.25" stroke={P} strokeWidth="0.8" />
      <path d="M200 100 Q200 60 240 40 Q220 80 200 100Z" fill={G} fillOpacity="0.45" stroke={G} strokeWidth="1" />
      <path d="M200 100 Q200 65 160 50 Q182 78 200 100Z" fill={G} fillOpacity="0.3" stroke={G} strokeWidth="0.8" />
      <line x1="200" y1="100" x2="200" y2="78" stroke={G} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="80" cy="80" r="28" stroke={G} strokeWidth="1" fill="none" strokeOpacity="0.35" />
      <circle cx="80" cy="80" r="16" stroke={P} strokeWidth="1" fill="none" strokeOpacity="0.25" />
      <path d="M80 52 A28 28 0 1 1 52 80" stroke={G} strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
    </svg>
  );
}

function IllustCompliance() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      {/* checklist lines */}
      {[55,85,115,145].map((y,i) => (
        <React.Fragment key={i}>
          <circle cx="130" cy={y} r="8" fill={i<3?G:B} fillOpacity={i<3?0.3:0.2} stroke={i<3?G:B} strokeWidth="1" />
          {i<3 && <path d={`M126 ${y} L129 ${y+3} L135 ${y-3}`} stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
          <rect x="148" y={y-4} width={i===3?60:80} height="8" rx="4" fill={B} fillOpacity="0.5" />
        </React.Fragment>
      ))}
      {/* shield */}
      <path d="M260 40 L300 55 L300 100 Q300 135 260 150 Q220 135 220 100 L220 55 Z" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="1.5" />
      <path d="M248 95 L257 104 L276 82" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="260" cy="95" r="28" stroke={G} strokeWidth="0.8" fill="none" strokeOpacity="0.3" strokeDasharray="4 6" />
    </svg>
  );
}

function IllustIP() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      {/* lightbulb */}
      <circle cx="200" cy="85" r="42" fill={G} fillOpacity="0.1" stroke={G} strokeWidth="1.5" />
      <circle cx="200" cy="85" r="28" fill={G} fillOpacity="0.15" stroke={G} strokeWidth="1" />
      <rect x="191" y="124" width="18" height="6" rx="3" fill={P} fillOpacity="0.4" />
      <rect x="193" y="132" width="14" height="6" rx="3" fill={P} fillOpacity="0.3" />
      {/* TM / R marks */}
      <text x="310" y="80" fontSize="22" fill={P} fillOpacity="0.4" fontWeight="700">™</text>
      <text x="78" y="120" fontSize="18" fill={G} fillOpacity="0.5" fontWeight="700">®</text>
      {/* rays */}
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const r = Math.PI * deg / 180;
        const x1 = 200 + 50*Math.cos(r), y1 = 85 + 50*Math.sin(r);
        const x2 = 200 + 65*Math.cos(r), y2 = 85 + 65*Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} strokeWidth="1" strokeOpacity="0.3" />;
      })}
    </svg>
  );
}

function IllustEmployment() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      {/* three people silhouettes */}
      {[130,200,270].map((cx,i) => (
        <React.Fragment key={i}>
          <circle cx={cx} cy="72" r="18" fill={i===1?P:S} fillOpacity={i===1?0.25:0.15} stroke={i===1?P:S} strokeWidth="1" />
          <path d={`M${cx-24} 130 Q${cx-12} 100 ${cx} 96 Q${cx+12} 100 ${cx+24} 130`} fill={i===1?P:S} fillOpacity={i===1?0.15:0.1} stroke={i===1?P:S} strokeWidth="1" />
        </React.Fragment>
      ))}
      {/* handshake bar */}
      <rect x="100" y="152" width="200" height="6" rx="3" fill={G} fillOpacity="0.3" />
      <path d="M185 155 L200 148 L215 155" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IllustCorporateLaw() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      {/* document stack */}
      <rect x="155" y="45" width="100" height="130" rx="6" fill={P} fillOpacity="0.06" stroke={P} strokeWidth="1" />
      <rect x="162" y="38" width="100" height="130" rx="6" fill={P} fillOpacity="0.06" stroke={P} strokeWidth="1" />
      <rect x="169" y="32" width="100" height="130" rx="6" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="1.5" />
      {/* text lines */}
      {[52,66,80,94,108].map((y,i) => <rect key={i} x="185" y={y} width={i===0?60:80} height="5" rx="2.5" fill={P} fillOpacity="0.2" />)}
      {/* seal */}
      <circle cx="269" cy="130" r="18" fill={G} fillOpacity="0.2" stroke={G} strokeWidth="1.5" />
      <text x="269" y="135" textAnchor="middle" fontSize="14" fill={G} fillOpacity="0.6">✦</text>
    </svg>
  );
}

function IllustDefault() {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 w-full h-full">
      {[100,200,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={B} strokeWidth="0.4" />)}
      {[66,133].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={B} strokeWidth="0.4" />)}
      <rect x="197" y="60" width="6" height="100" rx="3" fill={P} fillOpacity="0.3" />
      <rect x="120" y="72" width="160" height="4" rx="2" fill={P} fillOpacity="0.4" />
      <circle cx="200" cy="74" r="7" fill={G} fillOpacity="0.5" stroke={G} strokeWidth="1" />
      <line x1="135" y1="76" x2="120" y2="110" stroke={P} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="140" y1="76" x2="160" y2="110" stroke={P} strokeWidth="1" strokeOpacity="0.5" />
      <path d="M115 110 Q140 122 165 110" stroke={P} strokeWidth="1.5" fill={P} fillOpacity="0.08" strokeLinecap="round" />
      <line x1="260" y1="76" x2="245" y2="110" stroke={P} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="265" y1="76" x2="285" y2="110" stroke={P} strokeWidth="1" strokeOpacity="0.5" />
      <path d="M240 110 Q265 122 290 110" stroke={P} strokeWidth="1.5" fill={P} fillOpacity="0.08" strokeLinecap="round" />
      <path d="M185 160 L200 152 L215 160 L220 168 L180 168Z" fill={P} fillOpacity="0.15" stroke={P} strokeWidth="1" />
      <circle cx="200" cy="100" r="70" stroke={G} strokeWidth="0.5" fill="none" strokeOpacity="0.15" />
    </svg>
  );
}

// ── Category → SVG illustration map ──────────────────────────────────────────
const CATEGORY_SVG: Partial<Record<ArticleCategory, React.ComponentType>> = {
  "DPDP Act":                    IllustDPDP,
  "Startups":                    IllustStartups,
  "M&A":                         IllustMA,
  "SEBI & RBI":                  IllustSEBI,
  "Corporate Governance":        IllustGovernance,
  "CSR & ESG":                   IllustCSR,
  "Compliance":                  IllustCompliance,
  "Intellectual Property":       IllustIP,
  "Employment Law":               IllustEmployment,
  "Corporate Law":               IllustCorporateLaw,
  "POSH & Workplace Compliance": IllustEmployment,
  "Regulatory":                  IllustSEBI,
  "Regulatory Updates":          IllustSEBI,
};

// ── Public component ──────────────────────────────────────────────────────────
export default function ArticleIllustration({
  category,
  coverImage,
  title,
  className = "",
  hero = false,
}: Props) {
  const wrapperClass = `relative overflow-hidden bg-[var(--surface)] ${className}`;

  // 1. Per-article coverImage override
  const resolvedImage = coverImage ?? getCategoryImage(category);

  if (resolvedImage) {
    return (
      <div className={wrapperClass}>
        <Image
          src={resolvedImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={hero}
        />
      </div>
    );
  }

  // 2. SVG illustration by category
  const IllustComponent = CATEGORY_SVG[category] ?? IllustDefault;

  return (
    <div className={wrapperClass} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, transparent 70%)",
          opacity: hero ? 0.06 : 0.08,
        }}
      />
      <IllustComponent />
    </div>
  );
}

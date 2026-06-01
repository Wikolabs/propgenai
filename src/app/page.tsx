"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — Each LP customizes only this block
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  name: "PropGenAI",
  waPhone: "261386626100",
  tools: [
    { name: "Notion", slug: "notion" },
    { name: "HubSpot", slug: "hubspot" },
    { name: "Stripe", slug: "stripe" },
    { name: "Slack", slug: "slack" },
    { name: "Groq", slug: "groq" },
  ],
  palette: {
    mode: "light" as "dark" | "light",
    bg: "#EFF6FF",
    bg2: "#DBEAFE",
    surface: "rgba(0,0,0,0.035)",
    border: "rgba(0,0,0,0.08)",
    txt1: "#0A1530",
    txt2: "#3C4E73",
    txt3: "#7889A8",
    accent: "#1E40AF",
    accentSoft: "rgba(30,64,175,0.10)",
    accentBorder: "rgba(30,64,175,0.30)",
    accentGlow: "rgba(30,64,175,0.15)",
    navBg: "rgba(239,246,255,0.85)",
  },
  content: {
    fr: {
      langLabel: "FR",
      tagLabel: "Propales IA · DocuSign · Relances automatiques",
      taglines: ["Vos notes de call.", "Une propale en 5 minutes.", "Signee en 48 heures."],
      taglineAccentIdx: 1,
      desc: "PropGenAI transforme vos notes de reunion en proposition commerciale PDF professionnelle, l'envoie via DocuSign et relance jusqu'a signature — sans que vous reecriviez une ligne.",
      navLinks: [
        { label: "Fonctionnalites", href: "#features" },
        { label: "Comment ca marche", href: "#process" },
        { label: "Pourquoi maintenant", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "48h", label: "discovery a contrat signe" },
        { value: "-90%", label: "temps de redaction" },
        { value: "+38%", label: "taux de signature" },
        { value: "5min", label: "generation propale" },
      ],
      features: [
        { icon: "🤖", title: "Generation IA dans votre ton", desc: "PropGenAI analyse vos notes de call — texte libre, transcript Otter/Loom ou bullet points — et genere un executive summary, une solution sur-mesure, un chiffrage et une timeline. Redige dans votre style, avec votre vocabulaire metier." },
        { icon: "📄", title: "PDF professionnel a votre charte", desc: "Mise en page automatique avec votre logo, vos couleurs et votre police. Conditions generales incluses, mentions legales integrees. Un document pret a envoyer qui inspire confiance des la premiere lecture." },
        { icon: "📊", title: "Suivi et relances jusqu'a signature", desc: "Envoi DocuSign direct, notification d'ouverture en temps reel, relances automatiques J+2 et J+5 avec ton adapte. Vous savez quand votre prospect a lu chaque section — et vous intervenez au bon moment." },
      ],
      steps: [
        { num: "01", title: "Importez vos notes de call", desc: "Texte libre, transcript Otter/Loom, bullet points ou enregistrement audio — PropGenAI comprend tous les formats. Collez vos notes brutes, l'IA extrait les elements cles : budget, enjeux, timeline, decideurs." },
        { num: "02", title: "L'IA structure et redige la propale", desc: "En 5 minutes : executive summary des enjeux client, solution personnalisee, chiffrage detaille, planning de mise en oeuvre, conditions. Ton professionnel, structure claire, arguments adaptes au profil du prospect." },
        { num: "03", title: "Envoi DocuSign et relances auto", desc: "PDF genere avec votre charte, envoye directement par email via DocuSign. Suivi d'ouverture en temps reel, relances automatiques aux bons intervalles. Vous etes notifie des la signature." },
      ],
      persuasion: {
        sectionTag: "Pourquoi maintenant",
        title: "La propale qui arrive jeudi a deja perdu lundi.",
        paragraphs: [
          { type: "pathos", text: "Mardi 16h. Discovery brillante avec un prospect tres chaud. Il vous demande la propale 'pour la fin de la semaine'. Vous notez tout, vous savez exactement quoi proposer. Mais vous avez 3 autres dossiers en cours, deux propales a relancer, un closing demain. Vendredi 22h, vous attaquez enfin la redaction. Lundi matin, vous envoyez. Mercredi, le prospect repond : 'On a finalement avance avec un autre prestataire qui nous a livre une propale tres complete le jeudi'. Vous saviez exactement quoi vendre. Vous l'avez juste vendu trop tard." },
          { type: "logos", text: "Une etude PandaDoc sur 2.5M de documents commerciaux montre qu'une propale envoyee dans les 24h apres la discovery a un taux de signature 32% superieur a celle envoyee a J+3. Forrester chiffre a 3h le temps median qu'un commercial B2B consacre a la redaction d'une propale custom — soit 12h par semaine sur 4 propales. McKinsey predit qu'en 2027, 75% de la redaction commerciale sera assistee par IA generative — la difference se joue maintenant sur le time-to-propale." },
          { type: "ethos", text: "Wikolabs construit des agents IA en production depuis 2023 pour des scale-ups B2B, family offices et fintechs reglementees. Nous avons brule nos doigts sur les memes problemes que vous : pipelines qui hallucinent, briefs ignores, dashboards desertes. PropGenAI est ce que nous avons construit pour nos propres clients exigeants avant de le proposer au marche." },
          { type: "solution", text: "Concretement : vous collez vos notes de call (texte libre, transcript Otter, bullet points). En 5 minutes, PropGenAI produit un PDF a votre charte avec executive summary, solution sur-mesure, chiffrage, planning et conditions — redige dans votre ton. Envoi DocuSign direct, suivi d'ouverture en temps reel, relances J+2 et J+5 automatiques. Vous gagnez 12h par semaine, votre taux de signature monte de 38%, et la propale arrive le jour meme du call." },
        ],
      },
      ctaTitle: "Votre prochaine propale en 5 minutes",
      ctaDesc: "Importez vos notes. PropGenAI fait le reste. Aucune carte bancaire.",
      ctaPrimary: "Reserver un appel",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Demander une demo",
      ctaSoonBadge: "Bientot",
      footerTagline: "Generation automatique de propositions commerciales IA",
    },
    en: {
      langLabel: "EN",
      tagLabel: "AI proposals · DocuSign · Auto follow-ups",
      taglines: ["Your call notes.", "A proposal in 5 minutes.", "Signed in 48 hours."],
      taglineAccentIdx: 1,
      desc: "PropGenAI turns your meeting notes into a professional PDF proposal, sends it via DocuSign and follows up until signature — without you rewriting a single line.",
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#process" },
        { label: "Why now", href: "#why" },
        { label: "Contact", href: "#cta" },
      ],
      metrics: [
        { value: "48h", label: "discovery to signed" },
        { value: "-90%", label: "writing time" },
        { value: "+38%", label: "signature rate" },
        { value: "5min", label: "proposal generation" },
      ],
      features: [
        { icon: "🤖", title: "AI generation in your tone", desc: "PropGenAI analyzes your call notes — free text, Otter/Loom transcript or bullet points — and generates an executive summary, tailored solution, pricing and timeline. Written in your style, with your industry vocabulary." },
        { icon: "📄", title: "Professional PDF in your brand", desc: "Automatic layout with your logo, colors and font. T&Cs included, legal mentions integrated. A ready-to-send document that builds trust from the first read." },
        { icon: "📊", title: "Tracking and follow-ups until signature", desc: "Direct DocuSign send, real-time open notifications, automatic follow-ups at D+2 and D+5 with the right tone. You know when your prospect read each section — and step in at the right time." },
      ],
      steps: [
        { num: "01", title: "Import your call notes", desc: "Free text, Otter/Loom transcript, bullet points or audio recording — PropGenAI handles all formats. Paste your raw notes, the AI extracts key elements: budget, stakes, timeline, decision-makers." },
        { num: "02", title: "The AI structures and writes the proposal", desc: "In 5 minutes: executive summary of client stakes, personalized solution, detailed pricing, implementation plan, terms. Professional tone, clear structure, arguments tailored to the prospect profile." },
        { num: "03", title: "DocuSign send and auto follow-ups", desc: "PDF generated with your brand, sent directly by email via DocuSign. Real-time open tracking, automatic follow-ups at the right intervals. You're notified the moment it's signed." },
      ],
      persuasion: {
        sectionTag: "Why now",
        title: "The proposal that arrives Thursday already lost on Monday.",
        paragraphs: [
          { type: "pathos", text: "Tuesday 4pm. Brilliant discovery with a very hot prospect. They ask for the proposal 'by end of week'. You take notes, you know exactly what to pitch. But you have 3 other open deals, two proposals to follow up on, a closing tomorrow. Friday 10pm, you finally start writing. Monday morning, you send. Wednesday, the prospect replies: 'We've gone with another vendor who delivered a very complete proposal on Thursday'. You knew exactly what to sell. You just sold it too late." },
          { type: "logos", text: "A PandaDoc study on 2.5M sales documents shows a proposal sent within 24h of discovery has a 32% higher signature rate than one sent at D+3. Forrester puts the median time a B2B rep spends writing a custom proposal at 3 hours — meaning 12h/week on 4 proposals. McKinsey predicts that by 2027, 75% of sales writing will be AI-assisted — the edge is being built right now on time-to-proposal." },
          { type: "ethos", text: "Wikolabs has been building production AI agents since 2023 for B2B scale-ups, family offices and regulated fintechs. We burned our fingers on the same problems you face: hallucinating pipelines, ignored briefs, abandoned dashboards. PropGenAI is what we built for our own demanding customers before bringing it to market." },
          { type: "solution", text: "Concretely: you paste your call notes (free text, Otter transcript, bullet points). In 5 minutes, PropGenAI delivers a PDF in your brand with executive summary, tailored solution, pricing, plan and terms — written in your tone. Direct DocuSign send, real-time open tracking, automatic D+2 and D+5 follow-ups. You save 12h/week, your signature rate climbs 38%, and the proposal arrives the same day as the call." },
        ],
      },
      ctaTitle: "Your next proposal in 5 minutes",
      ctaDesc: "Import your notes. PropGenAI does the rest. No credit card.",
      ctaPrimary: "Book a call",
      ctaWhatsApp: "WhatsApp",
      ctaDemo: "Request a demo",
      ctaSoonBadge: "Soon",
      footerTagline: "AI-generated sales proposals",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT — identical for all LPs
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const t = P.content[lang];
  const pal = P.palette;
  const isDark = pal.mode === "dark";
  const cardOverlayHover = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";

  const waLink = `https://wa.me/${P.waPhone}?text=${encodeURIComponent(
    lang === "fr"
      ? `Bonjour, je souhaite discuter de ${P.name} avec Wikolabs.`
      : `Hello, I'd like to discuss ${P.name} with Wikolabs.`
  )}`;

  return (
    <div style={{ minHeight: "100vh", background: pal.bg, color: pal.txt1 }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes wkBgShift { 0% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-2%, 1.5%, 0) rotate(180deg); } 100% { transform: translate3d(0,0,0) rotate(360deg); } }
        .wk-bg-fx { position: fixed; inset: -10%; pointer-events: none; z-index: 0; opacity: .55; will-change: transform; animation: wkBgShift 38s linear infinite; }
        .wk-bg-fx::before, .wk-bg-fx::after { content: ""; position: absolute; inset: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.6); } }
        .wk-card { transition: background .3s, border-color .3s, transform .35s cubic-bezier(.34,1.2,.64,1); }
        .wk-card:hover { background: ${cardOverlayHover} !important; border-color: ${pal.accentBorder} !important; transform: translateY(-6px); }
        .wk-btn { transition: opacity .2s, transform .2s, box-shadow .2s; }
        .wk-btn:hover { opacity:.92; transform:translateY(-2px); box-shadow:0 12px 32px ${pal.accentGlow}; }
        .wk-btn-wa { transition: opacity .2s, transform .2s; }
        .wk-btn-wa:hover { opacity:.92; transform:translateY(-2px); }
        .wk-btn-demo { opacity:.78; transition: opacity .2s, transform .2s, background .2s; }
        .wk-btn-demo:hover { opacity:1; transform:translateY(-2px); background:${pal.accentSoft}!important; }
        .wk-nav-link { color:${pal.txt2}; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .wk-nav-link:hover { color:${pal.txt1}; }
        .wk-lang { display:inline-flex; border:1px solid ${pal.border}; border-radius:100px; padding:2px; background:${pal.surface}; }
        .wk-lang button { background:transparent; border:none; padding:4px 12px; font-size:11px; font-weight:700; letter-spacing:.5px; cursor:pointer; border-radius:100px; color:${pal.txt2}; transition: background .2s, color .2s; font-family:inherit; }
        .wk-lang button.active { background:${pal.accent}; color:${isDark ? "#04080F" : "#FFFFFF"}; }
        @media(max-width:768px){
          .wk-hide-sm{ display:none!important; }
          .wk-hero-title{ font-size:2.4rem!important; }
          .wk-section{ padding-left:20px!important; padding-right:20px!important; }
          .wk-cards-grid{ grid-template-columns: 1fr !important; max-width:380px; margin-left:auto; margin-right:auto; }
          .wk-metrics-row{ justify-content:center; }
          .wk-cta-row{ flex-direction:column; align-items:stretch; max-width:340px; margin-left:auto; margin-right:auto; }
          .wk-cta-row > *{ width:100%; justify-content:center; }
          .wk-persuasion{ padding:60px 20px!important; }
          .wk-foot{ flex-direction:column; gap:12px; text-align:center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="wk-section" style={{ position:"sticky", top:0, zIndex:100, background:pal.navBg, backdropFilter:"blur(20px)", borderBottom:`1px solid ${pal.border}`, padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:pal.txt1 }}>
          {P.name}<span style={{ color:pal.accent }}>.</span>
        </span>
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          <div className="wk-hide-sm" style={{ display:"flex", gap:22 }}>
            {t.navLinks.map(l => <a key={l.label} href={l.href} className="wk-nav-link">{l.label}</a>)}
          </div>
          <div className="wk-lang" role="group" aria-label="language">
            <button type="button" className={lang==="fr"?"active":""} onClick={()=>setLang("fr")}>FR</button>
            <button type="button" className={lang==="en"?"active":""} onClick={()=>setLang("en")}>EN</button>
          </div>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
            style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:8, padding:"9px 18px", fontWeight:700, fontSize:13.5, cursor:"pointer", fontFamily:"inherit" }}>
            {t.ctaPrimary} →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="wk-section" style={{ padding:"100px 40px 80px", maxWidth:1040, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)", width:720, height:600, background:`radial-gradient(ellipse at 50% 30%, ${pal.accentGlow} 0%, transparent 60%)`, pointerEvents:"none" }} />
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:24, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:100, padding:"6px 18px", animation:"fadeUp .5s ease both" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:pal.accent, display:"inline-block", animation:"pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color:pal.accent, fontSize:11.5, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase" }}>{t.tagLabel}</span>
        </div>
        <h1 className="wk-hero-title" style={{ fontSize:"clamp(2.6rem,6vw,5rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:28, fontFamily:"'Instrument Serif',Georgia,serif", animation:"fadeUp .5s .08s ease both" }}>
          {t.taglines.map((line, i) => (
            <span key={i} style={{ display:"block", color:i===t.taglineAccentIdx?pal.accent:pal.txt1, fontStyle:i===t.taglineAccentIdx?"italic":"normal" }}>{line}</span>
          ))}
        </h1>
        <p style={{ fontSize:"1.1rem", color:pal.txt2, lineHeight:1.72, maxWidth:600, margin:"0 auto 44px", animation:"fadeUp .5s .16s ease both" }}>{t.desc}</p>
        <div className="wk-metrics-row" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14, marginBottom:44, animation:"fadeUp .5s .24s ease both" }}>
          {t.metrics.map(m => (
            <div key={m.label} style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"14px 22px", textAlign:"center", minWidth:118 }}>
              <div style={{ fontSize:"1.7rem", fontWeight:800, color:pal.txt1, letterSpacing:"-1.5px", lineHeight:1 }}>{m.value}</div>
              <div style={{ fontSize:"0.62rem", color:pal.txt3, textTransform:"uppercase", letterSpacing:"1.5px", marginTop:5 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
      </section>

      {/* FEATURES */}
      <section id="features" className="wk-section" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={lang==="fr"?"Fonctionnalites":"Features"} title={lang==="fr"?"Tout automatise, <em>rien a gerer</em>":"Fully automated, <em>nothing to manage</em>"} />
        <div className="wk-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {t.features.map((f, i) => (
            <div key={f.title} className="wk-card" style={{ background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:20, padding:"28px 28px 26px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${pal.accent},transparent)`, opacity:.55 }} />
              <div style={{ fontSize:"2rem", marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:pal.txt1, marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:"0.88rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="wk-section" style={{ padding:"80px 40px", background:pal.bg2 }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <SectionHead pal={pal} tag={lang==="fr"?"Comment ca marche":"How it works"} title={lang==="fr"?"En place en <em>10 minutes</em>":"Live in <em>10 minutes</em>"} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {t.steps.map((s, i) => (
              <div key={s.num} style={{ display:"flex", alignItems:"flex-start", gap:22, background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:18, padding:"22px 26px" }}>
                <div style={{ flexShrink:0, width:46, height:46, background:pal.accentSoft, border:`1px solid ${pal.accentBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:pal.accent, fontWeight:800, fontSize:15 }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize:"1rem", fontWeight:700, color:pal.txt1, marginBottom:6, lineHeight:1.3 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.87rem", color:pal.txt2, lineHeight:1.7, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS INTEGRATED — logos of the stack we operate for you */}
      <section id="tools" className="wk-section" style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={lang==="fr"?"Outils integres":"Tools we operate"} title={lang==="fr"?"On opere <em>votre stack</em>, vous n'avez rien a apprendre":"We operate <em>your stack</em>, you don't have to learn it"} />
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12 }}>
          {P.tools.map(tool => (
            <div key={tool.slug} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 16px", background:pal.surface, border:`1px solid ${pal.border}`, borderRadius:100, fontSize:13, color:pal.txt1, fontWeight:600, transition:"transform .2s, border-color .2s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://cdn.simpleicons.org/${tool.slug}/${pal.accent.replace('#','')}`} alt={tool.name} width={18} height={18} style={{ flexShrink:0 }} />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", color:pal.txt3, fontSize:12, marginTop:24, maxWidth:540, marginLeft:"auto", marginRight:"auto" }}>
          {lang==="fr" ? "Vous n'avez pas a apprendre ces outils — on les opere pour vous. Vous payez l'abonnement, c'est dans votre Slack demain matin." : "You don't have to learn these tools — we operate them for you. You pay the subscription, it's in your Slack tomorrow morning."}
        </p>
      </section>

      {/* PERSUASION — pathos / logos / ethos / solution */}
      <section id="why" className="wk-persuasion wk-section" style={{ padding:"100px 40px", maxWidth:860, margin:"0 auto" }}>
        <SectionHead pal={pal} tag={t.persuasion.sectionTag} title={t.persuasion.title} />
        <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
          {t.persuasion.paragraphs.map((p, i) => {
            const labelMap: Record<string, { fr: string; en: string }> = {
              pathos:   { fr: "L'enjeu humain",  en: "What's at stake" },
              logos:    { fr: "Les faits",       en: "The facts" },
              ethos:    { fr: "Notre legitimite", en: "Our credibility" },
              solution: { fr: "Notre reponse",   en: "Our answer" },
            };
            const label = labelMap[p.type]?.[lang] ?? "";
            return (
              <div key={i} style={{ borderLeft:`2px solid ${pal.accentBorder}`, paddingLeft:22 }}>
                <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:pal.accent, marginBottom:10 }}>{label}</div>
                <p style={{ fontSize:"1.02rem", color:pal.txt2, lineHeight:1.85, margin:0 }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="wk-section" style={{ padding:"0 40px 100px", maxWidth:860, margin:"0 auto" }}>
        <div style={{ background:pal.surface, border:`1px solid ${pal.accentBorder}`, borderRadius:24, padding:"64px 48px", textAlign:"center", backgroundImage:`radial-gradient(ellipse at 50% 0%, ${pal.accentSoft} 0%, transparent 65%)` }}>
          <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:16 }}>{lang==="fr"?"Demarrer":"Get started"}</p>
          <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, marginBottom:14, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif" }}>{t.ctaTitle}</h2>
          <p style={{ color:pal.txt2, fontSize:"1rem", marginBottom:36, lineHeight:1.7, maxWidth:540, margin:"0 auto 36px" }}>{t.ctaDesc}</p>
          <CtaRow t={t} pal={pal} isDark={isDark} waLink={waLink} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wk-section" style={{ borderTop:`1px solid ${pal.border}`, padding:"32px 40px" }}>
        <div className="wk-foot" style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <div>
            <span style={{ fontWeight:800, fontSize:16, color:pal.txt1 }}>{P.name}</span><span style={{ color:pal.accent }}>.</span>
            <span style={{ display:"block", fontSize:12, color:pal.txt3, marginTop:3 }}>{t.footerTagline}</span>
          </div>
          <p style={{ fontSize:13, color:pal.txt3, margin:0 }}>© 2026 {P.name} — {lang==="fr"?"Un produit":"A product by"} <a href="https://wikolabs.com" style={{ color:pal.txt2, textDecoration:"none" }}>Wikolabs</a></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:13, alignItems:"center" }}>
            <a href="mailto:team@wikolabs.com" style={{ color:pal.txt3, textDecoration:"none" }}>team@wikolabs.com</a>
            <span style={{ color:pal.txt3 }}>·</span>
            <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' style={{ background:"none", border:"none", color:pal.txt3, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:0 }}>{t.ctaPrimary}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({ pal, tag, title }: { pal: typeof P.palette; tag: string; title: string }) {
  return (
    <div style={{ textAlign:"center", marginBottom:52 }}>
      <p style={{ fontSize:"0.68rem", color:pal.accent, letterSpacing:"3px", textTransform:"uppercase", fontWeight:700, marginBottom:14 }}>{tag}</p>
      <h2
        style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:pal.txt1, letterSpacing:"-0.02em", fontFamily:"'Instrument Serif',Georgia,serif", lineHeight:1.15, margin:0 }}
        dangerouslySetInnerHTML={{ __html: title.replace(/<em>/g, `<em style="font-style:italic;color:${pal.accent}">`) }}
      />
    </div>
  );
}

function CtaRow({ t, pal, isDark, waLink }: { t: typeof P.content.fr; pal: typeof P.palette; isDark: boolean; waLink: string }) {
  return (
    <div className="wk-cta-row" style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", animation:"fadeUp .5s .32s ease both" }}>
      <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' className="wk-btn"
        style={{ background:pal.accent, color:isDark?"#04080F":"#FFFFFF", border:"none", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, fontFamily:"inherit" }}>
        📅 {t.ctaPrimary}
      </button>
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wk-btn-wa"
        style={{ background:"#25d366", color:"#FFFFFF", borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
        💬 {t.ctaWhatsApp}
      </a>
      <a href="/demo" className="wk-btn-demo" data-orig-btn="1"
        style={{ background:"transparent", color:pal.txt2, border:`1px solid ${pal.border}`, borderRadius:10, padding:"14px 28px", fontWeight:700, fontSize:15, display:"inline-flex", alignItems:"center", gap:10, fontFamily:"inherit", position:"relative" }}>
        ✨ {t.ctaDemo}
      </a>
    </div>
  );
}

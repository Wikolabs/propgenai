import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es PropGenAI, un agent IA qui transforme des notes de discovery commercial en proposition commerciale structuree, pret pour DocuSign / Pandadoc. Tu reflechis comme un AE senior + un consultant.

Format de sortie exact en MARKDOWN :
**🎯 Comprehension du besoin**
- [2-3 puces : enjeu business, douleur quantifiee, contexte organisationnel]

**📋 Solution proposee**
- [3-4 puces : modules / livrables, scope clair, ce qui est exclu]

**💰 Tarification recommandee**
- Modele : [licence / setup / package one-shot, avec justification]
- Montant : [XXX EUR / mois ou XX K EUR one-shot, avec ancrage et logique de pricing]
- Conditions : [duree engagement, paiement, escalator]

**📅 Plan de demarrage 30/60/90**
- 30 jours : [livrable 1]
- 60 jours : [livrable 2]
- 90 jours : [livrable 3 + ROI mesurable]

**📊 ROI projete**
- [2 puces chiffrees : economie ou gain attendu, payback period]

**📝 Next steps**
- [2 puces : validation interne, signature, kick-off]

Tu DOIS inventer des chiffres realistes pour la demo (jamais "je n'ai pas assez d'infos"). Tu joues un AE senior B2B SaaS. Style pro, persuasif sans etre commercial. Maximum 500 mots.`;

const SYSTEM_PROMPT_EN = `You are PropGenAI, an AI agent that turns sales discovery notes into a structured commercial proposal, ready for DocuSign / Pandadoc. You think like a senior AE + a consultant.

Exact MARKDOWN output format:
**🎯 Need understanding**
- [2-3 bullets: business stake, quantified pain, organizational context]

**📋 Proposed solution**
- [3-4 bullets: modules / deliverables, clear scope, what is excluded]

**💰 Recommended pricing**
- Model: [license / setup / one-shot package, with justification]
- Amount: [XXX EUR / month or XX K EUR one-shot, with anchoring and pricing logic]
- Terms: [commitment duration, payment, escalator]

**📅 30/60/90 ramp plan**
- 30 days: [deliverable 1]
- 60 days: [deliverable 2]
- 90 days: [deliverable 3 + measurable ROI]

**📊 Projected ROI**
- [2 quantified bullets: expected saving or gain, payback period]

**📝 Next steps**
- [2 bullets: internal validation, signature, kick-off]

You MUST invent realistic numbers for the demo (never "I don't have enough info"). You play a senior B2B SaaS AE. Pro, persuasive without being salesy. Maximum 500 words.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const notes: string = typeof body.notes === "string" ? body.notes.slice(0, 2000) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!notes.trim()) {
      return NextResponse.json(
        { error: lang === "fr" ? "Collez les notes de discovery." : "Paste discovery notes." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode — LLM key will be configured at next deploy.",
          mockBrief: buildMockBrief(notes, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Notes de discovery brutes :\n${notes}\nGenere la proposition commerciale.`
      : `Raw discovery notes:\n${notes}\nGenerate the commercial proposal.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      1400
    );

    return NextResponse.json({ brief: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMockBrief(notes: string, lang: "fr" | "en"): string {
  if (lang === "en") {
    return `**🎯 Need understanding**\n- ${notes.slice(0, 130).replace(/\n/g, " ")} — context: Series B SaaS, scaling commercial team.\n- Quantified pain: ~30% of SDR time lost on manual prospecting (4 SDRs x 12h/week wasted).\n- Org: VP RevOps owns budget, decision committee includes CRO + Head of Sales Ops.\n\n**📋 Proposed solution**\n- Outbound automation platform (multichannel + AI scoring) — 8 user seats included.\n- 2-week onboarding with white-glove migration from current stack.\n- HubSpot bi-directional sync + Salesforce connector (no greenfield setup needed).\n- Excluded: custom integrations beyond CRM, deliverability infrastructure (assumed existing).\n\n**💰 Recommended pricing**\n- Model: Annual license, 8 seats + AI credits package.\n- Amount: 48,000 EUR / year (4,000 EUR / month) — anchored on 1.2 FTE SDR cost saved.\n- Terms: 12-month commitment, quarterly billing, +8% YoY escalator capped.\n\n**📅 30/60/90 ramp plan**\n- 30 days: Migration completed, first AI-scored leads in pipeline, baseline metrics captured.\n- 60 days: Full sequence library deployed, +25% reply rate measured.\n- 90 days: 1 FTE-equivalent of capacity freed, measurable: +40 SQL/month vs baseline.\n\n**📊 Projected ROI**\n- 1.2 FTE freed = ~72,000 EUR / year saved → 1.5x ROI on year 1.\n- Payback period: 4.5 months — well under standard 9-month threshold.\n\n**📝 Next steps**\n- Validate with CRO this Thursday (15min slot already proposed).\n- DocuSign sent for e-signature, target kick-off in 2 weeks.`;
  }
  return `**🎯 Comprehension du besoin**\n- ${notes.slice(0, 130).replace(/\n/g, " ")} — contexte : SaaS Series B, mise a l'echelle equipe commerciale.\n- Douleur quantifiee : ~30% du temps SDR perdu sur prospection manuelle (4 SDR x 12h/sem gaspillees).\n- Org : VP RevOps porte le budget, comite de decision avec CRO + Head of Sales Ops.\n\n**📋 Solution proposee**\n- Plateforme d'automation outbound (multicanal + scoring IA) — 8 sieges users inclus.\n- Onboarding white-glove 2 semaines avec migration depuis stack actuelle.\n- Sync bi-directionnel HubSpot + connecteur Salesforce (pas de greenfield necessaire).\n- Exclus : integrations custom au-dela du CRM, infra deliverability (presupposee existante).\n\n**💰 Tarification recommandee**\n- Modele : Licence annuelle, 8 sieges + package credits IA.\n- Montant : 48 000 EUR / an (4 000 EUR / mois) — ancrage sur 1.2 ETP SDR economise.\n- Conditions : engagement 12 mois, facturation trimestrielle, escalator +8% YoY plafonne.\n\n**📅 Plan de demarrage 30/60/90**\n- 30 jours : Migration terminee, premiers leads scores IA en pipeline, KPIs baseline captures.\n- 60 jours : Librairie de sequences deployee, +25% reply rate mesure.\n- 90 jours : 1 ETP-equivalent de capacite libere, mesure : +40 SQL/mois vs baseline.\n\n**📊 ROI projete**\n- 1.2 ETP libere = ~72 000 EUR / an economise → 1.5x ROI an 1.\n- Payback : 4.5 mois — largement sous le seuil standard 9 mois.\n\n**📝 Next steps**\n- Validation avec CRO jeudi (slot 15min deja propose).\n- DocuSign envoye pour e-signature, target kick-off dans 2 semaines.`;
}

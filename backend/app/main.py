"""PropGenAI demo backend — production-ready POC.

In production: this service would also pull pricing benchmarks, push the
generated proposal to DocuSign/PandaDoc, and persist deal data in the CRM.
For the demo: it only invokes the LLM and returns the brief.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .llm import chat, is_configured

app = FastAPI(
    title="PropGenAI Demo Backend",
    description="POC backend — Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Prompts
# ─────────────────────────────────────────────────────────────────────────────
SYSTEM_PROMPT_FR = """Tu es PropGenAI, un agent IA qui transforme des notes de discovery commercial en proposition commerciale structuree, pret pour DocuSign / Pandadoc. Tu reflechis comme un AE senior + un consultant.

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

Tu DOIS inventer des chiffres realistes pour la demo (jamais "je n'ai pas assez d'infos"). Tu joues un AE senior B2B SaaS. Style pro, persuasif sans etre commercial. Maximum 500 mots."""

SYSTEM_PROMPT_EN = """You are PropGenAI, an AI agent that turns sales discovery notes into a structured commercial proposal, ready for DocuSign / Pandadoc. You think like a senior AE + a consultant.

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

You MUST invent realistic numbers for the demo (never "I don't have enough info"). You play a senior B2B SaaS AE. Pro, persuasive without being salesy. Maximum 500 words."""


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────
class GenerateRequest(BaseModel):
    notes: str
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    brief: str
    model: str
    generated_at: str
    static_mode: bool = False


# ─────────────────────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "propgenai-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    notes = (req.notes or "").strip()[:2000]
    if not notes:
        raise HTTPException(status_code=400, detail="empty_notes")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f"Notes de discovery brutes :\n{notes}\nGenere la proposition commerciale."
        if req.lang == "fr"
        else f"Raw discovery notes:\n{notes}\nGenerate the commercial proposal."
    )

    if not is_configured():
        return GenerateResponse(
            brief=_build_mock_brief(notes, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=1400,
        )
    except Exception:
        return GenerateResponse(
            brief=_build_mock_brief(notes, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(brief=text, model=model, generated_at=now_iso)


# ─────────────────────────────────────────────────────────────────────────────
# Mock brief (used when no LLM key configured or LLM fails)
# ─────────────────────────────────────────────────────────────────────────────
def _build_mock_brief(notes: str, lang: str) -> str:
    snippet = notes[:130].replace("\n", " ")
    if lang == "en":
        return (
            f"**🎯 Need understanding**\n"
            f"- {snippet} — context: Series B SaaS, scaling commercial team.\n"
            f"- Quantified pain: ~30% of SDR time lost on manual prospecting (4 SDRs x 12h/week wasted).\n"
            f"- Org: VP RevOps owns budget, decision committee includes CRO + Head of Sales Ops.\n\n"
            f"**📋 Proposed solution**\n"
            f"- Outbound automation platform (multichannel + AI scoring) — 8 user seats included.\n"
            f"- 2-week onboarding with white-glove migration from current stack.\n"
            f"- HubSpot bi-directional sync + Salesforce connector (no greenfield setup needed).\n"
            f"- Excluded: custom integrations beyond CRM, deliverability infrastructure (assumed existing).\n\n"
            f"**💰 Recommended pricing**\n"
            f"- Model: Annual license, 8 seats + AI credits package.\n"
            f"- Amount: 48,000 EUR / year (4,000 EUR / month) — anchored on 1.2 FTE SDR cost saved.\n"
            f"- Terms: 12-month commitment, quarterly billing, +8% YoY escalator capped.\n\n"
            f"**📅 30/60/90 ramp plan**\n"
            f"- 30 days: Migration completed, first AI-scored leads in pipeline, baseline metrics captured.\n"
            f"- 60 days: Full sequence library deployed, +25% reply rate measured.\n"
            f"- 90 days: 1 FTE-equivalent of capacity freed, measurable: +40 SQL/month vs baseline.\n\n"
            f"**📊 Projected ROI**\n"
            f"- 1.2 FTE freed = ~72,000 EUR / year saved → 1.5x ROI on year 1.\n"
            f"- Payback period: 4.5 months — well under standard 9-month threshold.\n\n"
            f"**📝 Next steps**\n"
            f"- Validate with CRO this Thursday (15min slot already proposed).\n"
            f"- DocuSign sent for e-signature, target kick-off in 2 weeks."
        )
    return (
        f"**🎯 Comprehension du besoin**\n"
        f"- {snippet} — contexte : SaaS Series B, mise a l'echelle equipe commerciale.\n"
        f"- Douleur quantifiee : ~30% du temps SDR perdu sur prospection manuelle (4 SDR x 12h/sem gaspillees).\n"
        f"- Org : VP RevOps porte le budget, comite de decision avec CRO + Head of Sales Ops.\n\n"
        f"**📋 Solution proposee**\n"
        f"- Plateforme d'automation outbound (multicanal + scoring IA) — 8 sieges users inclus.\n"
        f"- Onboarding white-glove 2 semaines avec migration depuis stack actuelle.\n"
        f"- Sync bi-directionnel HubSpot + connecteur Salesforce (pas de greenfield necessaire).\n"
        f"- Exclus : integrations custom au-dela du CRM, infra deliverability (presupposee existante).\n\n"
        f"**💰 Tarification recommandee**\n"
        f"- Modele : Licence annuelle, 8 sieges + package credits IA.\n"
        f"- Montant : 48 000 EUR / an (4 000 EUR / mois) — ancrage sur 1.2 ETP SDR economise.\n"
        f"- Conditions : engagement 12 mois, facturation trimestrielle, escalator +8% YoY plafonne.\n\n"
        f"**📅 Plan de demarrage 30/60/90**\n"
        f"- 30 jours : Migration terminee, premiers leads scores IA en pipeline, KPIs baseline captures.\n"
        f"- 60 jours : Librairie de sequences deployee, +25% reply rate mesure.\n"
        f"- 90 jours : 1 ETP-equivalent de capacite libere, mesure : +40 SQL/mois vs baseline.\n\n"
        f"**📊 ROI projete**\n"
        f"- 1.2 ETP libere = ~72 000 EUR / an economise → 1.5x ROI an 1.\n"
        f"- Payback : 4.5 mois — largement sous le seuil standard 9 mois.\n\n"
        f"**📝 Next steps**\n"
        f"- Validation avec CRO jeudi (slot 15min deja propose).\n"
        f"- DocuSign envoye pour e-signature, target kick-off dans 2 semaines."
    )

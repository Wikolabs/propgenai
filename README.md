# PropGenAI — Génération automatique de propositions commerciales par IA

> Une proposition commerciale personnalisée en 3 minutes, pas en 3 jours.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.1_70B-FF6B35?style=flat)](https://groq.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)

---

## Vue d'ensemble

PropGenAI automatise la génération de propositions commerciales personnalisées via LLM (Groq llama-3.1-70b-versatile). À partir des informations du prospect (secteur, enjeux, budget), elle génère une proposition structurée (executive summary, solution proposée, ROI estimé, tarification, prochaines étapes) exportable en PDF.

**Domaine :** Sales Productivity / Proposal Automation  
**Port VM :** 3006 | **Sous-domaine :** propgenai.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS | Editor propositions, preview PDF, templates |
| Backend | FastAPI (Python 3.11), Uvicorn | API génération, export, gestion templates |
| LLM | **Groq** (llama-3.1-70b-versatile) | Génération contenu personnalisé |
| PDF | WeasyPrint / reportlab | Export PDF branded |
| Base de données | PostgreSQL 16 | Propositions, templates, prospects |
| Streaming | Server-Sent Events (SSE) | Streaming de la génération LLM |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3006) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
groq==0.9.0
weasyprint==62.3
jinja2==3.1.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
pydantic==2.7.1
python-multipart==0.0.9
httpx==0.27.0
```

---

## Architecture mono-repo

```
propgenai/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx             # Liste propositions + quick generate
│   │   ├── generate/            # Wizard 4 étapes
│   │   ├── proposals/[id]/      # Editor + preview
│   │   └── templates/           # Bibliothèque templates sectoriels
│   └── src/components/
│       ├── ProposalWizard.tsx   # 4 étapes : prospect → enjeux → solution → pricing
│       ├── StreamingEditor.tsx  # Streaming génération LLM en temps réel
│       ├── PdfPreview.tsx       # Preview PDF dans le browser
│       ├── RoiCalculator.tsx    # ROI estimé interactif
│       └── TemplateCard.tsx     # Carte template avec preview
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── proposals.py     # CRUD propositions + generate
│   │   │   ├── templates.py     # Templates sectoriels
│   │   │   └── export.py        # GET /export/{id}/pdf
│   │   ├── services/
│   │   │   ├── generator.py     # Groq LLM prompting + streaming
│   │   │   ├── pdf_builder.py   # WeasyPrint PDF generation
│   │   │   └── roi_engine.py    # Calcul ROI selon secteur
│   │   └── models/
│   │       ├── proposal.py
│   │       └── template.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#7c3aed', 'primaryTextColor': '#fff', 'primaryBorderColor': '#6d28d9', 'lineColor': '#374151', 'secondaryColor': '#f3e8ff'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3006)"]
        NEXT["Next.js 14\nProposal Editor"]
        API["FastAPI + SSE"]

        subgraph GEN["✍️ Generation Engine"]
            GROQ["Groq LLM\nllama-3.1-70b"]
            ROI["ROI Calculator\nSector-specific"]
            PDF["WeasyPrint\nBranded PDF"]
        end

        PG[("PostgreSQL\nProposals + Templates")]
    end

    COMMERCIAL["Commercial"] --> NEXT
    NEXT -- "SSE stream" --> COMMERCIAL
    API --> GEN
```

### Séquence — Génération streaming d'une proposition

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#7c3aed', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant USER as Commercial
    participant NEXT as Next.js
    participant API as FastAPI
    participant GROQ as Groq LLM
    participant ROI as ROI Engine

    USER->>NEXT: Complète wizard {company: "Acme", sector: "logistics", challenge: "track & trace", budget: "50k"}

    NEXT->>API: POST /proposals/generate (SSE)

    API->>ROI: compute_roi(sector=logistics, investment=50000)
    ROI-->>API: {roi_months: 8, annual_savings: 75000}

    API->>GROQ: chat.completions.create(prompt, stream=True)
    loop streaming tokens
        GROQ-->>API: token chunk
        API-->>NEXT: SSE: data: {"content": "..."}
        NEXT-->>USER: affichage progressif
    end

    API->>API: save_proposal(content, roi_data)
    API-->>NEXT: SSE: data: {"status": "complete", "proposal_id": "pr_xyz"}

    USER->>API: GET /export/pr_xyz/pdf
    API-->>USER: proposal.pdf (branded, 8 pages)
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#7c3aed', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    PROPOSAL {
        uuid id PK
        string prospect_name
        string prospect_company
        string sector
        float deal_size
        string status
        text executive_summary
        text solution_section
        text roi_section
        text pricing_section
        jsonb metadata
        timestamp generated_at
    }
    TEMPLATE {
        uuid id PK
        string name
        string sector
        text system_prompt
        text structure
        string pdf_theme
    }
    ROI_MODEL {
        uuid id PK
        string sector
        float avg_roi_months
        float productivity_gain_pct
        float cost_reduction_pct
        jsonb formula
    }

    PROPOSAL }o--|| TEMPLATE : "uses"
    TEMPLATE }o--|| ROI_MODEL : "references"
```

---

## PRD

### Problème
Rédiger une proposition commerciale prend 4-8h par commercial, pour un taux de conversion de 20-30%. Les propositions génériques ne résonnent pas avec les enjeux spécifiques du prospect. Les équipes commerciales manquent de temps pour personnaliser.

### Solution
PropGenAI génère en 3 minutes une proposition de 8 pages personnalisée au secteur, aux enjeux identifiés, et au budget du prospect. Le commercial finalise et exporte en PDF branded. Gain estimé : 6h par proposition.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Commercial | Générer des propositions de qualité rapidement |
| Sales Manager | Standardiser la qualité des propositions de l'équipe |
| Pre-Sales | Générer des variantes pour des deals complexes |

### OKRs
- Temps de génération proposition < 3 min (vs 6h manuel)
- Taux d'acceptation des propositions +20%
- 100% des propositions utilisent les templates validés

---

## User Stories

```
US-01 [Commercial] En tant que commercial,
      je veux générer une proposition en remplissant un wizard de 4 étapes
      (prospect, enjeux, solution, pricing)
      afin d'avoir un document de qualité en moins de 5 minutes.

US-02 [Commercial] En tant que commercial,
      je veux voir la génération s'afficher en temps réel (streaming)
      afin de pouvoir intervenir et corriger avant la fin.

US-03 [Manager] En tant que Sales Manager,
      je veux créer des templates par secteur (logistique, finance, retail)
      afin que toutes les propositions suivent notre charte qualité.

US-04 [Commercial] En tant que commercial,
      je veux que le ROI soit calculé automatiquement selon le secteur et le budget
      afin d'avoir des chiffres crédibles sans chercher dans les études de cas.

US-05 [Commercial] En tant que commercial,
      je veux exporter la proposition en PDF avec notre logo et notre charte graphique
      afin de l'envoyer directement au client.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Structure obligatoire | 8 sections : intro, enjeux, solution, ROI, références, pricing, timeline, CTA | ✅ Section preview |
| R2 | ROI par secteur | Logistics: 8 mois ROI. Finance: 12 mois. Retail: 6 mois. | ✅ ROI calculator |
| R3 | Personnalisation | {company_name}, {contact_name}, {main_challenge} injectés dans le prompt | ✅ Variable list |
| R4 | Streaming | Génération tokénisée via SSE — pas d'attente de réponse complète | ✅ Streaming demo |
| R5 | Longueur cible | 600-800 mots (lisible en < 5 min) | ✅ Word counter |
| R6 | Tone of voice | Professionnel, sans jargon technique, centré bénéfices business | ✅ Tone selector |
| R7 | Versioning | Max 5 versions par deal — garder l'historique | ✅ Version list |
| R8 | Confidentialité | Données prospect non envoyées à Groq si flagged confidential | ✅ Privacy toggle |
| R9 | Approbation | Statut "draft → reviewed → approved → sent" | ✅ Status workflow |
| R10 | Expiration | Proposition valable 30 jours (mention auto dans le PDF) | ✅ Validity badge |

---

## Spécification API

**Base URL :** `http://propgenai.wikolabs.com/api/v1`

### POST /proposals/generate (SSE)
```json
{"prospect": {"name": "Marie D.", "company": "LogiCorp", "sector": "logistics"}, "challenges": ["track & trace temps réel", "coûts transport +15%"], "budget": 50000, "template_id": "tpl_logistics"}
// SSE stream: data: {"content": "..."} → data: {"status": "complete", "proposal_id": "pr_xyz"}
```

### GET /export/{proposal_id}/pdf
```
→ application/pdf download (branded, ~8 pages)
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Wizard 4 étapes** | Step-by-step : info prospect → enjeux → solution → pricing & ROI |
| **Streaming Editor** | Texte qui apparaît token par token comme un LLM en live |
| **ROI Calculator** | Sliders : investissement + secteur → ROI mois + économies annuelles |
| **PDF Preview** | Preview in-browser de la proposition générée |
| **Template Gallery** | Cartes templates par secteur avec preview excerpt |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: propgenai, POSTGRES_USER: pg_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://pg_user:${POSTGRES_PASSWORD}@postgres/propgenai
      GROQ_API_KEY: "${GROQ_API_KEY}"
    depends_on: [postgres]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3006:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Wizard 4 étapes + génération Groq
- [ ] Export PDF simple
- [ ] Templates sectoriels (logistics, finance, retail)

### Phase 2 — Intelligence
- [ ] ROI calculator par secteur
- [ ] Streaming SSE
- [ ] Versioning propositions

### Phase 3 — Personnalisation avancée
- [ ] Apprentissage des propositions gagnantes (fine-tuning)
- [ ] Intégration CRM (données prospect auto-remplies)
- [ ] E-signature intégrée

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*

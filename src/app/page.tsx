export default function PropGenAI() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="font-bold text-rose-900 text-xl" style={{ fontFamily: "var(--font-display)" }}>PropGenAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-rose-700">
            <a href="#workflow" className="hover:text-rose-500 transition-colors">Workflow</a>
            <a href="#features" className="hover:text-rose-500 transition-colors">Fonctionnalités</a>
            <a href="#results" className="hover:text-rose-500 transition-colors">Résultats</a>
          </div>
          <a href="#cta" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors">
            Générer ma première propale
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-rose-50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-60 pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-200 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                ✍️ De la discovery au contrat signé en 48h
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-rose-950 leading-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Vos notes de call<br />
                deviennent une propale<br />
                <span className="text-rose-500">en 5 minutes.</span>
              </h1>
              <p className="text-rose-700 text-lg mb-8 leading-relaxed">
                PropGenAI transforme vos notes de réunion en proposition commerciale PDF professionnelle, l&apos;envoie via DocuSign et relance jusqu&apos;à signature — sans que vous réécriviez une ligne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#cta" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-rose-200">
                  Générer ma première propale →
                </a>
                <a href="#workflow" className="bg-white text-rose-700 border-2 border-rose-200 hover:border-rose-400 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center">
                  Voir le workflow
                </a>
              </div>
            </div>

            {/* Timeline / doc preview */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border-l-4 border-rose-400 shadow-sm">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Call discovery — 14h00</div>
                <div className="text-sm text-gray-600 leading-relaxed">&ldquo;Budget ~15k€, besoin urgent de réduire le churn, décideur = CEO + CTO présents, timeline Q3...&rdquo;</div>
                <div className="text-xs text-gray-400 mt-2">Notes brutes importées</div>
              </div>
              <div className="flex items-center justify-center gap-2 text-rose-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                <span className="text-sm font-semibold">PropGenAI génère en 5 min</span>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-rose-100 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                  </div>
                  <span className="text-sm font-bold text-gray-800">Proposition_Commerciale_Client.pdf</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  {["✓ Résumé des enjeux client", "✓ Solution proposée personnalisée", "✓ Chiffrage détaillé 15 000€", "✓ Timeline Q3 incluse", "✓ Conditions & CGV"].map(line => (
                    <div key={line} className="flex items-center gap-2">{line}</div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-rose-100 text-xs text-rose-600 font-semibold">
                  📨 Envoyé via DocuSign · Relance automatique J+2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-950 text-center mb-14" style={{ fontFamily: "var(--font-display)" }}>
            Le workflow complet, automatisé
          </h2>
          <div className="space-y-4">
            {[
              { step: "01", icon: "🎙️", title: "Importez vos notes de call", desc: "Texte libre, transcript Otter/Loom, ou bullet points — PropGenAI comprend n'importe quel format.", color: "bg-rose-50 border-rose-200" },
              { step: "02", icon: "🤖", title: "L'IA structure la propale", desc: "En 5 minutes : executive summary, solution sur-mesure, chiffrage, timeline, conditions. Rédigé dans votre ton.", color: "bg-pink-50 border-pink-200" },
              { step: "03", icon: "📄", title: "PDF professionnel généré", desc: "Mise en page avec votre charte graphique, signature numérique, mentions légales. Prêt à envoyer.", color: "bg-fuchsia-50 border-fuchsia-200" },
              { step: "04", icon: "✍️", title: "DocuSign + relances auto", desc: "Envoi direct par email, suivi de l'ouverture, relances automatiques J+2, J+5 — jusqu'à signature ou refus.", color: "bg-rose-50 border-rose-200" },
            ].map((s) => (
              <div key={s.step} className={`${s.color} border rounded-2xl p-6 flex gap-5 items-start`}>
                <div className="text-3xl">{s.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">{s.step}</span>
                    <h3 className="font-bold text-rose-950" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  </div>
                  <p className="text-rose-700 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-rose-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            Tout pour fermer plus vite
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "Charte graphique", desc: "Votre logo, couleurs et police intégrés automatiquement dans chaque propale générée.", color: "bg-rose-900/50 border-rose-700" },
              { icon: "🔁", title: "Relances intelligentes", desc: "PropGenAI adapte le ton des relances selon l'urgence et l'historique du prospect.", color: "bg-pink-900/50 border-pink-700" },
              { icon: "📊", title: "Tracking en temps réel", desc: "Voyez quand votre propale est ouverte, combien de temps passé sur chaque section.", color: "bg-fuchsia-900/50 border-fuchsia-700" },
            ].map((f) => (
              <div key={f.title} className={`${f.color} border rounded-xl p-6`}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="text-rose-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 text-center mb-12">
            {[
              { value: "48h", label: "de la discovery au contrat signé" },
              { value: "−90%", label: "de temps passé à rédiger des propales" },
              { value: "+38%", label: "de taux de signature vs propale manuelle" },
            ].map((s) => (
              <div key={s.label} className="p-8 bg-rose-50 rounded-2xl border border-rose-100">
                <div className="text-4xl font-bold text-rose-600 mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                <div className="text-rose-700 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8 text-center">
            <blockquote className="text-xl font-medium text-rose-950 mb-5 leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
              &ldquo;Je passais 4h à rédiger chaque propale. Maintenant je dicte mes notes et PropGenAI fait le reste. Mon taux de closing a augmenté de 40% juste parce que je réponds plus vite.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center font-bold text-rose-700">JM</div>
              <div className="text-left">
                <div className="font-semibold text-rose-950">Julien M.</div>
                <div className="text-sm text-rose-500">Consultant freelance, agence digitale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Votre prochaine propale en 5 minutes
          </h2>
          <p className="text-rose-100 text-xl mb-10">Importez vos notes. PropGenAI fait le reste.</p>
          <a href="mailto:hello@wikolabs.com?subject=PropGenAI — Demande de démo" className="inline-block bg-white text-rose-600 hover:bg-rose-50 px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-xl">
            Générer ma première propale →
          </a>
          <p className="text-rose-200 text-sm mt-5">Essai gratuit · Aucune carte · Résultats immédiats</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-rose-950 text-rose-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-white text-xl" style={{ fontFamily: "var(--font-display)" }}>PropGenAI</span>
          <p className="text-sm">© 2025 PropGenAI — Un produit <a href="https://wikolabs.com" className="text-rose-400 hover:text-rose-200">Wikolabs</a></p>
          <div className="flex gap-6 text-sm">
            <a href="mailto:hello@wikolabs.com" className="hover:text-rose-200 transition-colors">Contact</a>
            <a href="https://wikolabs.com" className="hover:text-rose-200 transition-colors">Wikolabs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

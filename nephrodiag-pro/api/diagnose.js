export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key non configurata sul server" });
  }

  try {
    const { patientData } = req.body;

    const systemPrompt = `Sei un assistente medico specializzato in nefrologia, cardiologia e medicina interna. 
Analizza i dati clinici del paziente e fornisci una diagnosi differenziale strutturata.

ISTRUZIONI RIGOROSE:
1. Analizza TUTTI i dati forniti (anamnesi, esame obiettivo, laboratorio, score clinici)
2. Fornisci diagnosi differenziali ordinate per probabilità
3. Per ogni diagnosi indica: nome patologia, probabilità (%), gravità (lieve/moderata/severa/critica), categoria (nefrologica/cardiologica/medicina generale)
4. Suggerisci farmaci con dosaggio AGGIUSTATO per GFR quando applicabile
5. Segnala interazioni farmacologiche e controindicazioni
6. Suggerisci ulteriori accertamenti diagnostici se necessari

FORMATO RISPOSTA - RISPONDI SOLO IN JSON VALIDO, SENZA MARKDOWN O BACKTICK:
{
  "riepilogoClinico": "breve sintesi del quadro clinico",
  "diagnosiDifferenziali": [
    {
      "patologia": "nome",
      "probabilita": 85,
      "gravita": "moderata",
      "categoria": "nefrologica",
      "descrizione": "breve spiegazione del razionale diagnostico",
      "criteriFavorevoli": ["criterio 1", "criterio 2"],
      "criteriControri": ["criterio contro 1"]
    }
  ],
  "terapiaFarmacologica": [
    {
      "farmaco": "nome principio attivo",
      "classe": "classe farmacologica",
      "dosaggio": "dosaggio standard",
      "aggiustamentoRenale": "dosaggio aggiustato per eGFR del paziente",
      "indicazione": "per quale diagnosi",
      "controindicazioni": ["lista"],
      "interazioni": ["con altri farmaci suggeriti"]
    }
  ],
  "accertamentiSuggeriti": [
    {
      "esame": "nome esame",
      "motivazione": "perché",
      "urgenza": "urgente/programmabile"
    }
  ],
  "alertCritici": ["eventuali alert di sicurezza o urgenza"],
  "noteCliniche": "considerazioni aggiuntive e raccomandazioni"
}

DISCLAIMER: Questo è uno strumento di SUPPORTO decisionale. Non sostituisce il giudizio clinico del medico.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: patientData }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Errore API Anthropic: ${response.status} - ${errText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: `Errore server: ${error.message}` });
  }
}

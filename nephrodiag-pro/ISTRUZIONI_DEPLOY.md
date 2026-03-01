# 🔬 NefrodiagPro — Guida al Deploy

## Cosa serve
1. Un account gratuito su **Vercel** (vercel.com)
2. Una **API Key di Anthropic** (console.anthropic.com)

---

## PASSO 1: Ottenere la API Key di Anthropic

1. Vai su **https://console.anthropic.com**
2. Crea un account (o accedi se ne hai già uno)
3. Vai su **Settings → API Keys**
4. Clicca **Create Key**, dai un nome (es. "NefrodiagPro")
5. **COPIA la chiave** (inizia con `sk-ant-...`) e salvala in un posto sicuro
6. Aggiungi credito: vai su **Billing** e aggiungi un minimo (es. 5€)
   - Ogni analisi AI costa circa 0.01-0.03€, quindi 5€ bastano per centinaia di analisi

---

## PASSO 2: Deploy su Vercel (5 minuti, zero codice)

### Opzione A: Deploy diretto (più semplice)

1. Vai su **https://vercel.com** e crea un account gratuito (puoi usare email o GitHub)
2. Nella dashboard, clicca **"Add New..." → "Project"**
3. Scegli **"Import from Git Repository"** oppure carica direttamente:
   - Se hai un account GitHub: crea un repository, carica la cartella `nephrodiag-pro`, e importa
   - Se non hai GitHub: usa la CLI (vedi Opzione B)

### Opzione B: Deploy via CLI (consigliata per non-programmatori)

1. **Installa Node.js** da https://nodejs.org (versione LTS)
2. Apri il **Terminale** (Mac) o **Prompt dei comandi** (Windows)
3. Installa la Vercel CLI:
   ```
   npm install -g vercel
   ```
4. Naviga nella cartella del progetto:
   ```
   cd percorso/alla/cartella/nephrodiag-pro
   ```
5. Esegui il deploy:
   ```
   vercel
   ```
6. Segui le istruzioni a schermo:
   - Conferma la cartella del progetto
   - Scegli "Create new project"
   - Accetta le impostazioni predefinite
7. Vercel ti darà un **URL** tipo: `nephrodiag-pro.vercel.app`

### PASSO 3: Configurare la API Key (FONDAMENTALE)

1. Vai su **https://vercel.com/dashboard**
2. Clicca sul tuo progetto **nephrodiag-pro**
3. Vai su **Settings → Environment Variables**
4. Aggiungi una nuova variabile:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** incolla la tua chiave `sk-ant-...`
   - **Environment:** seleziona tutti (Production, Preview, Development)
5. Clicca **Save**
6. Vai su **Deployments** e clicca **"Redeploy"** sull'ultimo deploy

---

## PASSO 4: Testare

1. Apri l'URL fornito da Vercel nel browser (PC, tablet o smartphone)
2. Crea un nuovo paziente di test
3. Inserisci alcuni dati e prova "Avvia Analisi AI"
4. Verifica che la diagnosi venga generata correttamente

---

## Dominio personalizzato (opzionale)

Se vuoi un URL più professionale (es. `nephrodiag.it`):
1. Acquista un dominio su Aruba, Register.it, o altro provider (~10€/anno)
2. Su Vercel → Settings → Domains → Aggiungi il tuo dominio
3. Configura i DNS come indicato da Vercel

---

## Struttura dei file

```
nephrodiag-pro/
├── public/
│   └── index.html        ← L'applicazione completa
├── api/
│   └── diagnose.js       ← Backend sicuro per le chiamate AI
└── vercel.json            ← Configurazione Vercel
```

---

## FAQ

**Quanto costa Vercel?**
Il piano gratuito (Hobby) è sufficiente. Include 100GB di banda e funzioni serverless.

**Quanto costa l'AI?**
Circa 0.01-0.03€ per analisi. Con 5€ di credito Anthropic si fanno ~200-500 analisi.

**I dati dei pazienti sono sicuri?**
I dati vengono salvati LOCALMENTE nel browser del medico (localStorage).
Non vengono mai inviati a server esterni eccetto l'analisi AI (che invia solo il
riepilogo clinico anonimizzabile). Per massima sicurezza, evitare di inserire
dati identificativi nei campi nome/cognome durante l'analisi.

**Funziona offline?**
L'interfaccia funziona offline. L'analisi AI richiede connessione internet.

**Posso installarlo come app sullo smartphone?**
Sì, su iPhone: apri il sito in Safari → icona condividi → "Aggiungi a Home".
Su Android: apri in Chrome → menu ⋮ → "Aggiungi a schermata Home".

---

## Supporto

Per modifiche, nuove funzionalità o problemi, contatta Daniele o riapri
questa conversazione su Claude.

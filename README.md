# Wine Scanner

Proof of concept universitario: un'app mobile che scansiona il QR code di una bottiglia di Brunello di Montalcino e
mostra la **qualità prevista dell'annata**, calcolata da un backend Django con un modello di regressione sui dati
meteorologici.

```
┌──────────────────────┐   POST /WinePredictionREST/ajax/getForecast   ┌───────────────────────┐
│ frontend/            │ ────────────────────────────────────────────► │ backend/              │
│ Ionic + Angular      │ ◄──────────────────────────────────────────── │ Django + SQLite       │
│ (browser/Android/iOS)│        qualità, R², regressori, meteo         │ statsmodels/sklearn   │
└──────────────────────┘                                               └───────────────────────┘
```

| Cartella | Contenuto | Documentazione |
|---|---|---|
| [`backend/`](backend) | API REST Django e dati meteo/annate | [backend/README.md](backend/README.md) |
| [`frontend/`](frontend) | App Ionic/Angular/Capacitor | [frontend/README.md](frontend/README.md) |

## Avvio rapido

Servono Python 3.9–3.11 e Node.js 14/16.

**Windows (PowerShell)**

```powershell
.\scripts\setup.ps1     # venv Python, dipendenze, estrazione del DB, npm install
.\scripts\start.ps1     # backend su :8000 e frontend su :4200
```

**Linux / macOS**

```bash
./scripts/setup.sh
./scripts/start.sh
```

Poi apri <http://localhost:4200>, vai su **Scan** e inserisci un'annata (es. `2019`) – nel browser lo scanner della
camera non è disponibile. Sul dispositivo si usa il vero scanner QR (vedi [frontend/README.md](frontend/README.md)).

Se la porta 8000 è occupata avvia il backend su un'altra porta (`python manage.py runserver 8001`) e aggiorna `apiUrl`
in [`frontend/src/environments/environment.ts`](frontend/src/environments/environment.ts).

## Provenienza e storico

Questo repository unisce in un unico progetto due repository nati come lavoro universitario (Università degli Studi di
Firenze, 2019–2021), ospitati sull'account GitHub `ranfagnimattia`, collegato alla vecchia email universitaria
`mattia.ranfagni@stud.unifi.it` (**non più attiva**):

- Frontend: <https://github.com/ranfagnimattia/wine-scanner-front-end>
- Backend: <https://github.com/ranfagnimattia/wine-scanner-back-end>

I commit originali risultano firmati con la vecchia email, ormai disattivata: per questo l'autore va riconosciuto dal
nome e dai repository sopra, non dall'indirizzo. La cronologia git originale non è stata importata qui; resta
consultabile nei due repository.

Il backend si basa su un progetto di analisi di serie storiche e anomaly detection (`VineyardsDataAnalysis` / `WineApp`)
sviluppato da [Lorenzo-N](https://github.com/Lorenzo-N) e [Andrea Puccia](https://github.com/AndreaPuccia), a cui
Mattia Ranfagni ha aggiunto le app `MontalcinoForecastsApp` e `WinePredictionREST` e il frontend mobile.

### Modifiche rispetto agli originali

- Struttura monorepo (`backend/`, `frontend/`), rimossi file IDE, cache Python e `requisiti.txt` (duplicato).
- Backend: dipendenze aggiornate e svincolate da TensorFlow 1.14 (ora opzionale, vedi `requirements-ml.txt`),
  compatibile con Python 3.9–3.11 e Django 3.2; `SECRET_KEY`, `DEBUG` e host configurabili da variabili d'ambiente;
  database distribuito compresso (`WineDB.sqlite3.gz`).
- Frontend: URL del backend spostato in `environment.ts` (prima era un IP LAN hardcoded), inserimento manuale
  dell'annata quando lo scanner non è disponibile (browser), traffico HTTP in chiaro abilitato su Android.

Il database contiene anche i dati dell'app d'amministrazione Django originale (utenti, sessioni, log): è materiale
di sviluppo, non usare quegli account in produzione.

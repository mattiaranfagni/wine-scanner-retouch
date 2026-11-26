# Backend – Django

REST API che calcola la previsione di qualità di un'annata di Brunello di Montalcino a partire dai dati
meteorologici giornalieri (regressione lineare con selezione dei migliori regressori climatici).

L'app mobile chiama un solo endpoint:

```
POST /WinePredictionREST/ajax/getForecast
Content-Type: application/x-www-form-urlencoded

startDate=01/01/2006&endDate=01/01/2019&forecastYear=2019
```

Risposta (esempio):

```json
{"quality": 5.26, "r2_adj": 0.22, "regr_combo": [4, 6, 10], "regr_list": ["..."],
 "umidlugott": 64.48, "umidaprott": 67.61, "ventoaprott": 0.94}
```

## Struttura

| App Django | Ruolo |
|---|---|
| `WinePredictionREST` | Endpoint REST usato dall'app mobile |
| `MontalcinoForecastsApp` | Modelli e logica di previsione (indici climatici, regressori, annate) |
| `WineApp` | Modelli dei dati meteo (giornalieri/orari) e dashboard di anomaly detection (non esposta di default) |

## Avvio

Serve Python 3.9–3.11 (pandas 1.x / numpy 1.x non hanno wheel per versioni più recenti).

```powershell
python -m venv .venv
.\.venv\Scripts\activate          # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
```

Il database SQLite (`WineDB.sqlite3`, ~100 MB, già popolato con dati meteo e annate) è versionato in forma
compressa come `WineDB.sqlite3.gz` perché supera il limite di GitHub per i singoli file. Estrailo prima del
primo avvio (gli script in `../scripts` lo fanno in automatico):

```powershell
python -c "import gzip,shutil; shutil.copyfileobj(gzip.open('WineDB.sqlite3.gz'), open('WineDB.sqlite3','wb'))"
```

## Configurazione

Variabili d'ambiente opzionali:

| Variabile | Default | Descrizione |
|---|---|---|
| `DJANGO_SECRET_KEY` | chiave di sviluppo | Da impostare fuori dallo sviluppo locale |
| `DJANGO_DEBUG` | `True` | Con `True` qualsiasi host è accettato (utile per test da telefono in LAN) |
| `DJANGO_ALLOWED_HOSTS` | – | Host aggiuntivi separati da virgola, usati con `DJANGO_DEBUG=False` |

## Dashboard di anomaly detection (opzionale)

`WineApp` contiene una dashboard (indici, dati giornalieri/orari, anomalie) basata su LSTM, mantenuta nel codice ma
**non collegata** in `VineyardsDataAnalysis/urls.py`. Per riattivarla servono le dipendenze di
`requirements-ml.txt` (TensorFlow/Keras, `stldecompose`) e il ripristino della riga `WineApp/` in `urls.py`.
Il codice è stato scritto per TensorFlow 1.14 / Keras 2.2: con versioni moderne potrebbero servire adattamenti, e i
modelli `.h5` in `WineApp/data/LSTM` potrebbero non caricarsi senza modifiche.

## Crediti

La base del backend (`VineyardsDataAnalysis`: app `WineApp`, analisi di serie storiche e anomaly detection) è stata
sviluppata da [Lorenzo-N](https://github.com/Lorenzo-N) e [Andrea Puccia](https://github.com/AndreaPuccia).
`MontalcinoForecastsApp` e `WinePredictionREST` sono stati aggiunti nel 2021 da Mattia Ranfagni per il progetto Wine Scanner.
Provenienza del codice: vedi il [README principale](../README.md#provenienza-e-storico).

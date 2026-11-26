# Wine Scanner

University proof of concept: a mobile app that scans the QR code on a bottle of Brunello di Montalcino and shows the
**predicted quality of the vintage**, computed by a Django backend using a regression model on weather data.

```
┌──────────────────────┐   POST /WinePredictionREST/ajax/getForecast   ┌───────────────────────┐
│ frontend/            │ ────────────────────────────────────────────► │ backend/              │
│ Ionic + Angular      │ ◄──────────────────────────────────────────── │ Django + SQLite       │
│ (browser/Android/iOS)│        quality, R², regressors, weather       │ statsmodels/sklearn   │
└──────────────────────┘                                               └───────────────────────┘
```

| Folder | Contents | Documentation |
|---|---|---|
| [`backend/`](backend) | Django REST API and weather/vintage data | [backend/README.md](backend/README.md) |
| [`frontend/`](frontend) | Ionic/Angular/Capacitor app | [frontend/README.md](frontend/README.md) |

## Quick start

Requires Python 3.9–3.11 and Node.js 14/16.

**Windows (PowerShell)**

```powershell
.\scripts\setup.ps1     # Python venv, dependencies, DB extraction, npm install
.\scripts\start.ps1     # backend on :8000 and frontend on :4200
```

**Linux / macOS**

```bash
./scripts/setup.sh
./scripts/start.sh
```

Then open <http://localhost:4200>, go to **Scan** and enter a vintage year (e.g. `2019`) – the camera scanner is not
available in the browser. On a device the real QR scanner is used (see [frontend/README.md](frontend/README.md)).

If port 8000 is already in use, start the backend on another port (`python manage.py runserver 8001`) and update
`apiUrl` in [`frontend/src/environments/environment.ts`](frontend/src/environments/environment.ts).

## Origin and history

This repository merges two repositories created as university work (Università degli Studi di Firenze, 2019–2021),
hosted under the GitHub account `ranfagnimattia`, which is tied to the old university email
`mattia.ranfagni@stud.unifi.it` (**no longer active**):

- Frontend: <https://github.com/ranfagnimattia/wine-scanner-front-end>
- Backend: <https://github.com/ranfagnimattia/wine-scanner-back-end>

The original commits are signed with that now-deactivated email, so the author should be identified by name and by the
repositories above rather than by the address. The original git history has not been imported here; it remains
available in the two repositories.

The backend builds on a time-series analysis and anomaly detection project (`VineyardsDataAnalysis` / `WineApp`)
developed by [Lorenzo-N](https://github.com/Lorenzo-N) and [Andrea Puccia](https://github.com/AndreaPuccia), to which
Mattia Ranfagni added the `MontalcinoForecastsApp` and `WinePredictionREST` apps and the mobile frontend.

### Changes from the originals

- Monorepo layout (`backend/`, `frontend/`); removed IDE files, Python caches and `requisiti.txt` (a duplicate).
- Backend: updated dependencies, decoupled from TensorFlow 1.14 (now optional, see `requirements-ml.txt`),
  compatible with Python 3.9–3.11 and Django 3.2; `SECRET_KEY`, `DEBUG` and allowed hosts configurable through
  environment variables; database shipped compressed (`WineDB.sqlite3.gz`).
- Frontend: backend URL moved to `environment.ts` (it was a hardcoded LAN IP), manual vintage-year entry when the
  scanner is unavailable (browser), cleartext HTTP traffic enabled on Android.

The database also contains the original Django admin data (users, sessions, logs): it is development material, do not
reuse those accounts in production.

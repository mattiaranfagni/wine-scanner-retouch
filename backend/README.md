# Backend – Django

REST API that predicts the quality of a Brunello di Montalcino vintage from daily weather data (linear regression with
selection of the best climatic regressors).

The mobile app calls a single endpoint:

```
POST /WinePredictionREST/ajax/getForecast
Content-Type: application/x-www-form-urlencoded

startDate=01/01/2006&endDate=01/01/2019&forecastYear=2019
```

Response (example):

```json
{"quality": 5.26, "r2_adj": 0.22, "regr_combo": [4, 6, 10], "regr_list": ["..."],
 "umidlugott": 64.48, "umidaprott": 67.61, "ventoaprott": 0.94}
```

(`regr_list` entries are Italian labels, e.g. "Umidità media tra aprile e ottobre".)

## Structure

| Django app | Role |
|---|---|
| `WinePredictionREST` | REST endpoint used by the mobile app |
| `MontalcinoForecastsApp` | Models and forecasting logic (climatic indices, regressors, vintages) |
| `WineApp` | Weather data models (daily/hourly) and anomaly-detection dashboard (not exposed by default) |

## Running

Requires Python 3.9–3.11 (pandas 1.x / numpy 1.x have no wheels for newer versions).

```powershell
python -m venv .venv
.\.venv\Scripts\activate          # Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
```

The SQLite database (`WineDB.sqlite3`, ~100 MB, already populated with weather data and vintages) is stored compressed
as `WineDB.sqlite3.gz` because it exceeds GitHub's per-file size limit. Extract it before the first run (the scripts in
`../scripts` do this automatically):

```powershell
python -c "import gzip,shutil; shutil.copyfileobj(gzip.open('WineDB.sqlite3.gz'), open('WineDB.sqlite3','wb'))"
```

## Configuration

Optional environment variables:

| Variable | Default | Description |
|---|---|---|
| `DJANGO_SECRET_KEY` | development key | Set it for anything other than local development |
| `DJANGO_DEBUG` | `True` | When `True` any host is accepted (handy for testing from a phone on the LAN) |
| `DJANGO_ALLOWED_HOSTS` | – | Extra comma-separated hosts, used with `DJANGO_DEBUG=False` |

## Anomaly-detection dashboard (optional)

`WineApp` contains an LSTM-based dashboard (indices, daily/hourly data, anomalies) that is kept in the code but **not
wired** in `VineyardsDataAnalysis/urls.py`. To re-enable it you need the dependencies in `requirements-ml.txt`
(TensorFlow/Keras, `stldecompose`) and to restore the `WineApp/` line in `urls.py`. The code was written for
TensorFlow 1.14 / Keras 2.2: with modern versions some adaptation may be needed, and the `.h5` models in
`WineApp/data/LSTM` may fail to load unchanged.

## Credits

The backend foundation (`VineyardsDataAnalysis`: the `WineApp` app, time-series analysis and anomaly detection) was
developed by [Lorenzo-N](https://github.com/Lorenzo-N) and [Andrea Puccia](https://github.com/AndreaPuccia).
`MontalcinoForecastsApp` and `WinePredictionREST` were added in 2021 by Mattia Ranfagni for the Wine Scanner project.
Code origin: see the [main README](../README.md#origin-and-history).

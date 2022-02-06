from datetime import datetime, timedelta


def eCO2mixLast24hours():
    to = datetime.now()
    start = to - timedelta(hours=23, minutes=59, seconds=59)
    return "https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=eco2mix-regional-tr&q=date_heure%3A%5B{}"\
        "Z+TO+{}Z%5D&rows=1152&sort=-date_heure&facet=libelle_region&facet=nature&facet=date_heure".format(
            start.strftime("%Y-%m-%dT%H:%M:%S"), to.strftime("%Y-%m-%dT%H:%M:%S"))

from datetime import datetime, timedelta


def get_eCO2_link_last_24h():
    to = datetime.now()
    start = to - timedelta(hours=23, minutes=59, seconds=59)
    return "https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=eco2mix-regional-tr&q=date_heure%3A%5B{}"\
        "Z+TO+{}Z%5D&rows=10000&sort=-date_heure&facet=libelle_region&facet=nature&facet=date_heure".format(
            start.strftime("%Y-%m-%dT%H:%M:%S"), to.strftime("%Y-%m-%dT%H:%M:%S"))


def sort_by_region_and_date(data):
    eco2 = {}
    for records in data["records"]:
        fields = records["fields"]

        if len(fields) < 7:
            continue

        region = fields["libelle_region"].lower()
        date = "{} {}".format(fields["date"], fields["heure"])

        selected_fields = {key: value for key, value in fields.items(
        ) if key not in ("libelle_region", "date", "heure", "date_heure")}
        selected_fields["date"] = date

        if region in eco2:
            eco2[region].append(selected_fields)
        else:
            eco2[region] = [selected_fields]
    return eco2

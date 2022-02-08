from pyparsing import col
import constants
from datetime import datetime, timedelta
import pandas as pd


def get_eCO2_link_last_24h():
    to = datetime.now()
    start = to - timedelta(hours=23, minutes=59, seconds=59)
    return "https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=eco2mix-regional-tr&q=date_heure%3A%5B{}"\
        "Z+TO+{}Z%5D&rows=10000&sort=-date_heure&facet=libelle_region&facet=nature&facet=date_heure".format(
            start.strftime("%Y-%m-%dT%H:%M:%S"), to.strftime("%Y-%m-%dT%H:%M:%S"))


def get_sum(dataframe: pd.DataFrame):
    df = dataframe.groupby(["jour_heure"], as_index=False, sort=False)
    return df.sum().round(2)


def get_renewable_info(dataframe: pd.DataFrame):
    df = dataframe.drop(columns=["jour_heure"])
    df = df.groupby(["region"], as_index=False, sort=False).sum()
    df["renewable"] = df[list(constants.ECO2_KEYS_SUBSTAINABLE)].sum(axis=1)
    df["non_renewable"] = df.sum(axis=1) - df["renewable"]
    return df.round(2)


def get_dataframe_region(query: dict):
    daily_data = []
    for records in query["records"]:
        fields = records["fields"]
        jour_heure = datetime.strptime(
            fields["date_heure"], "%Y-%m-%dT%H:%M:%S%z").strftime("%A %H:%M")

        value = {key: fields[key]
                 for key in constants.ECO2_KEYS if key in fields}

        if not value:
            continue

        value["region"] = fields["libelle_region"]
        value["jour_heure"] = jour_heure

        daily_data.append(value)
    df = pd.DataFrame(daily_data, columns=(
        "region", "jour_heure") + constants.ECO2_KEYS)
    df["region"] = df["region"].str.lower()
    return df

# rates mais par région

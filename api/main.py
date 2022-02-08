import json
import uvicorn
import utils
import pandas as pd
import requests

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from functools import lru_cache
from time import time

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"API is working properly"}


@app.get("/eco2/sum/{region}")
def eCO2_sum_per_region(region: str):
    """Return the last 24 hours data from eCO2 data"""
    df_eco2 = get_eCO2_info(get_ttl_hash(900))
    df = utils.get_renewable_info(df_eco2)

    if region == "all":
        df = df.drop(columns=["region"]).sum()
    else:
        df = df[df["region"] == region].drop(columns=["region"]).iloc[0]
    return json.loads(df.to_json(orient="index"))


@app.get("/eco2/{region}")
def eCO2_info_per_region(region: str):
    """Return the last 24 hours data from eCO2 data per region, or all of them"""
    df_eco2 = get_eCO2_info(get_ttl_hash(900))

    if region == "all":
        df = utils.get_sum(df_eco2)
    else:
        df = df_eco2[df_eco2["region"] == region].drop(columns=["region"])
    return json.loads(df.to_json(orient="records"))


@lru_cache(maxsize=1)
def get_eCO2_info(ttl_hash=None):
    """Return the last 24 hours data from eCO2 data.
    Updated every 15 minutes"""
    del ttl_hash

    eco2 = requests.get(utils.get_eCO2_link_last_24h())
    if eco2.status_code != 200:
        return {"Error": "unreachable"}
    return utils.get_dataframe_region(json.loads(eco2.text))


def get_ttl_hash(seconds: int):
    """Return the same value withing `seconds` time period"""
    return time() // seconds * seconds


if __name__ == "__main__":
    uvicorn.run("main:app", port=9000, reload=True)

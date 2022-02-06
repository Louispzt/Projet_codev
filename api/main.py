import json
import uvicorn
import constants

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from functools import lru_cache
from time import time

import requests

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
    # Should return last hours of available datas for each dataset
    return {"API is working properly"}


@app.get("/eco2")
def eCO2_last_24hours():
    """Return the last 24 hours data from eCO2 data"""
    return get_eCO2_last_24hours(get_ttl_hash(900))


@lru_cache(maxsize=1)
def get_eCO2_last_24hours(ttl_hash=None):
    """Return the last 24 hours data from eCO2 data.
    Updated every 15 minutes"""
    del ttl_hash

    eco2 = requests.get(constants.eCO2mixLast24hours())
    if eco2.status_code != 200:
        return {"Error: unreachable"}
    return json.loads(eco2.text)


def get_ttl_hash(seconds):
    """Return the same value withing `seconds` time period"""
    return round(time() / seconds)


if __name__ == "__main__":
    uvicorn.run("main:app", port=9000, reload=True)

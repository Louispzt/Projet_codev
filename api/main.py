from datetime import timedelta
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from functools import lru_cache
from sqlalchemy.orm import Session
from time import time

import authentification
import crud
import json
import models
import requests
import schemas
import utils
import uvicorn

models.Base.metadata.create_all(bind=engine)


app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# User related
async def get_current_user(token: str = Depends(authentification.oauth2_scheme), db: SessionLocal = Depends(get_db)):
    try:
        return await authentification.get_current_user(token, db)
    except Exception:
        raise Exception


async def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authentification.authenticate_user(
        db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = authentification.create_access_token(
        data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_active_user)):
    return current_user


@app.post("/me/add_bookmark", response_model=schemas.Bookmark)
def create_bookmark_for_user(new_bookmark: schemas.BookmarkCreate, current_user: schemas.User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if len([b for b in current_user.bookmarks if b.title == new_bookmark.title]) == 0:
        return crud.create_user_bookmark(db, new_bookmark=new_bookmark, user_id=current_user.id)
    raise HTTPException(status_code=400, detail="bookmark already exists")


@app.post("/me/delete_bookmark", response_model=dict)
def delete_bookmark_for_user(bookmark: schemas.BookmarkBase, current_user: schemas.User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    db_bookmarks = [
        b for b in current_user.bookmarks if b.title == bookmark.title]
    if len(db_bookmarks) == 1:
        return crud.delete_user_bookmark(db, db_user=current_user, db_bookmark=db_bookmarks[0])
    raise HTTPException(status_code=400, detail="bookmark doesn't exist")


@app.post("/signup", response_model=schemas.User)
def create_user(user: schemas.UserInDb, db: Session = Depends(get_db)):
    db_user = crud.read_user(db, user.username)
    if db_user is None:
        return crud.create_user(db, user.username, authentification.get_password_hash(user.hashed_password))
    raise HTTPException(status_code=400, detail="user already exists")


@app.post("/delete", response_model=dict)
def delet_user(current_user: schemas.User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    return crud.delete_user(db, current_user)


@app.post("/update", response_model=dict)
def update_user(new_password: str, new_password_2, current_user: schemas.User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if new_password == new_password_2:
        return crud.update_user(db, current_user, authentification.get_password_hash(new_password))
    raise HTTPException(status_code=400, detail="passwords don't match")


# Actual API
@app.get("/")
async def read_root():
    return {"API is working properly"}


@app.get("/eco2/sum/{region}")
async def eCO2_sum_per_region(region: str, token: str = Depends(authentification.oauth2_scheme)):
    """Return the last 24 hours data from eCO2 data"""
    df_eco2 = get_eCO2_info(get_ttl_hash(900))
    df = utils.get_renewable_info(df_eco2)

    if region == "all":
        df = df.drop(columns=["region"]).sum()
    else:
        df = df[df["region"] == region].drop(columns=["region"]).iloc[0]
    return json.loads(df.to_json(orient="index"))


@app.get("/eco2/{region}")
async def eCO2_info_per_region(region: str, token: str = Depends(authentification.oauth2_scheme)):
    """Return the last 24 hours data from eCO2 data per region, or all of them"""
    df_eco2 = get_eCO2_info(get_ttl_hash(900))

    if region == "all":
        df = utils.get_sum(df_eco2)
    else:
        df = df_eco2[df_eco2["region"] == region].drop(columns=["region"])
    return json.loads(df.to_json(orient="records"))


# Cache
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

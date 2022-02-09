from sqlalchemy import false
from sqlalchemy.orm import Session

import models
import schemas


# Create
def create_user(db: Session, username: str, hashed_password: str):
    db_user = models.User(
        username=username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user_bookmark(db: Session, new_bookmark: schemas.BookmarkBase, user_id: int):
    db_bookmark = models.Bookmark(**new_bookmark.dict(), owner_id=user_id)
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark


# Read
def read_user(db: Session, username: str):
    db_user = db.query(models.User).filter(
        models.User.username == username
    ).first()
    if not db_user:
        return None
    return db_user


# Update
def update_user(db: Session, db_user: schemas.UserInDb, new_hashed_password: str):
    db_user.hashed_password = new_hashed_password
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"info": "Updated password for '{}'".format(db_user.username)}


# Delete
def delete_user(db: Session, db_user: schemas.User):
    db.delete(db_user)
    db.commit()
    return {"info": "Deleted user '{}'".format(db_user.username)}


def delete_user_bookmark(db: Session, db_user: schemas.User, db_bookmark: schemas.BookmarkBase):
    db.delete(db_bookmark)
    db.commit()
    return {"info": "Deleted bookmark '{}'".format(db_bookmark.title)}

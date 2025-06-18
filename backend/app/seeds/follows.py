# app/seeds/follows.py
from app.models import db, Follow

def seed_follows():
    f1 = Follow(follower_id=2, followed_id=1)
    f2 = Follow(follower_id=3, followed_id=1)
    f3 = Follow(follower_id=3, followed_id=2)
    db.session.add_all([f1, f2, f3])
    db.session.commit()

def undo_follows():
    Follow.query.delete()
    db.session.commit()

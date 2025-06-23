# app/seeds/follows.py
from app.models import db, Follow

def seed_follows(users):
    follow1 = Follow(follower_id=users[0].id, followed_id=users[1].id)
    follow2 = Follow(follower_id=users[1].id, followed_id=users[2].id)

    db.session.add_all([follow1, follow2])
    db.session.commit()


def undo_follows():
    Follow.query.delete()
    db.session.commit()

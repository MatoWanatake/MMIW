# app/seeds/comments.py
from app.models import db, Comment
from datetime import datetime

def seed_comments(users, stories):
    c1 = Comment(
        content='thank you for your story',
        user_id=users[1].id,  # marnie
        story_id=stories[0].id,  # My First Tale
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    c2 = Comment(
        content='wopila kola',
        user_id=users[2].id,  # bobbie
        story_id=stories[0].id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    c3 = Comment(
        content='live well nephew',
        user_id=users[0].id,  # Demo
        story_id=stories[1].id,  # Another Story
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add_all([c1, c2, c3])
    db.session.commit()


def undo_comments():
    db.session.execute('DELETE FROM "MMIW".comments')
    db.session.commit()

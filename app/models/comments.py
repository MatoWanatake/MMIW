from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship('User', back_populates='comments')
    story = db.relationship('Story', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'story_id': self.story_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    story = db.relationship('Story', back_populates='photos')
    user = db.relationship('User', back_populates='photos')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'story_id': self.story_id,
            'user_id': self.user_id.isoformat(),
            'created_at': self.created_at.isoformat()
        }

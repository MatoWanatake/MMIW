from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

story_tags = db.Table(
    'story_tags',
    db.metadata,
    db.Column('story_id', db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
)


class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state_or_region = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user    = db.relationship('User', back_populates='stories')
    comments = db.relationship('Comment', back_populates='story')
    tags = db.relationship("Tag", secondary=story_tags, back_populates="stories")
    photos = db.relationship('Photo', back_populates='story', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'country': self.country,
            'state_or_region': self.state_or_region,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id
        }

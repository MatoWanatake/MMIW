from flask import jsonify
from app.models import Tag
from . import tags_bp

@tags_bp.route('', methods=['GET'])
def list_tags():
    # gets all tags
    tags = Tag.query.all()
    return jsonify([t.to_dict() for t in tags]), 200

@tags_bp.route('/<int:id>', methods=['GET'])
def get_tag(id):
    # gets one tag by id

    tag = Tag.query.get_or_404(id)
    return jsonify(tag.to_dict()), 200

@tags_bp.route('/<int:id>', methods=['GET'])
def get_stories_for_tag(id):
    # gets all stories that have this tag

    tag = Tag.query.get_or_404(id)
    return jsonify([s.to_dict(include_photos=True) for s in tag.stories]), 200

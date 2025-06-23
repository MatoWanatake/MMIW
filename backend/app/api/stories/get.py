from flask import jsonify
from app.models import Story
from . import stories_bp

@stories_bp.route('', methods=['GET'])
# Return list of all stories
def get_stories():
    stories = Story.query.all()
    return jsonify([s.to_dict() for s in stories]), 200

@stories_bp.route('/<int:id>', methods=['GET'])
# gets list of stories by author
def get_story(id):
    story = Story.query.get_or_404(id)
    return jsonify(story.to_dict(include_tags=True)), 200
@stories_bp.route('/user/<int:user_id>', methods=['GET'])
def get_stories_by_user(user_id):
    stories = Story.query.filter_by(user_id=user_id).all()
    return jsonify({'stories': [story.to_dict(include_tags=True) for story in stories]}), 200

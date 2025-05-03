from flask import jsonify, request
from app.models import Comment
from . import comments_bp

@comments_bp.route('', methods=['GET'])
def list_comments():
    # list all comments (optional) with story id)

    story_id = request.args.get('story_id', type=int)
    if story_id:
        comments = Comment.query.filter_by(story_id=story_id).all()
    else:
        comments = Comment.query.all()
    return jsonify([c.to_dict() for c in comments]), 200

@comments_bp.route('/<int:id>', methods=['GET'])
def get_comment(id):
    # get comment by comment id
    comment = Comment.query.get_or_404(id)
    return jsonify(comment.to_dict()), 200

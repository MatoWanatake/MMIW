from flask import request, jsonify, abort
from flask_login import login_required, current_user
from app.models import Comment, Story, db
from . import comments_bp

@comments_bp.route('', methods=['POST'])
@login_required
def create_comment():
    # CREATE COMMENT
    data = request.get_json() or {}
    story_id = data.get('story_id')
    content = data.get('content', '').strip()

    if not story_id or not content:
        abort(400, description="story_id and content are required")

    Story.query.get_or_404(story_id)

    new = Comment(
        story_id = story_id,
        user_id = current_user.id,
        content = content
    )

    db.session.add(new)
    db.session.commit()
    return jsonify(new.to_dict()), 201

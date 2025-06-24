from flask import request, jsonify
from flask_login import login_required, current_user
from app.models import Comment, Story, db
from . import comments_bp

@comments_bp.route('', methods=['POST'])
@login_required
def create_comment():
    data = request.get_json() or {}

    story_id = data.get('story_id')
    content = data.get('content', '')

    errors = {}

    if not story_id:
        errors["story"] = "Story reference is missing. Please refresh and try again."

    if not content.strip():
        errors["content"] = "Comment cannot be empty or just spaces."

    if errors:
        return jsonify({"errors": errors}), 400

    Story.query.get_or_404(story_id)

    new = Comment(
        story_id=story_id,
        user_id=current_user.id,
        content=content
    )

    db.session.add(new)
    db.session.commit()
    return jsonify(new.to_dict()), 201

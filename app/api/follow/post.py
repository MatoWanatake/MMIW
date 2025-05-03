from flask import request, jsonify, abort
from flask_login import login_required, current_user
from app.models import Follow, User, db
from . import follow_bp

@follow_bp.route('', methods=['POST'])
@login_required
def create_follow():
    # follow a user

    data = request.get_json() or {}
    followed_id = data.get('followed_id')
    if not followed_id:
        abort(400, description="followed_id is required")
    if followed_id == current_user.id:
        abort(400, description="Cannot follow yourself")
    User.query.get_or_404(followed_id)

    # prevent duplucate follow

    exists = Follow.query.filter_by(
        follower_id = current_user.id,
        followed_id = followed_id
    ).first()
    if exists:
        abort(400, description="Already following this user")

    new = Follow(
        follower_id = current_user.id,
        followed_id = followed_id
    )

    db.session.add(new)
    db.session.commit()
    return jsonify({
        'id': new.id,
        'follower_id': new.follower_id,
        'followed_id': new.followed_id
    }), 201

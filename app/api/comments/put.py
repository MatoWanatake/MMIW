from flask import request, jsonify, abort
from flask_login import login_required, current_user
from app.models import Comment, db
from . import comments_bp

@comments_bp.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def update_comment(id):
    #update a comment

    comment = Comment.query.get_or_404(id)

    #verify authorized user
    if comment.user_id !=  current_user.id:
        abort(403, description="Not allowed to edit this comment")

    data = request.get_json() or {}
    content = data.get('content','').strip()
    if not content:
        abort(400, description="content is required")

    comment.content = content
    db.session.commit()
    return jsonify(comment.to_dict()), 200

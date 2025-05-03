from flask import abort
from flask_login import login_required, current_user
from app.models import Follow, db
from . import follow_bp

@follow_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_follow(id):
    # DELETE a follow (or unfollow)

    f = Follow.query.get_or_404(id)
    if f.follower_id != current_user.id:
        abort(403, description="Cannot unfollow on behalf of another user")
    db.session.delete(f)
    db.session.commit()
    return '', 204

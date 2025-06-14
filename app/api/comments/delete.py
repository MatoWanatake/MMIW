from flask import abort
from flask_login import login_required, current_user
from app.models import Comment, db
from  . import comments_bp

@comments_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):

    # DELETE a comment

    comment= Comment.query.get_or_404(id)

    # Verify autorization

    if comment.user_id != current_user.id:
        abort(403, description="Not allowed to delete this comment")

    db.session.delete(comment)
    db.session.commit()
    return '', 204

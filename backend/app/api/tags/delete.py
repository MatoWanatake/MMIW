from flask import abort
from flask_login import login_required
from app.models import Tag, db
from . import tags_bp

@tags_bp.route('<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    # DELETE a tag
    tag = Tag.query.get_or_404(id)
    db.session.delete(tag)
    db.session.commit()
    return '', 204

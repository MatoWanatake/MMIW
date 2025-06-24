from flask import abort, jsonify
from flask_login import login_required
from app.models import Tag, db
from . import tags_bp

@tags_bp.route('<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    tag = Tag.query.get_or_404(id)
    db.session.delete(tag)
    db.session.commit()
    return jsonify({'message': 'Tag deleted'}), 200

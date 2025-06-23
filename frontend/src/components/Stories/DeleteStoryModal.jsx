import { useDispatch } from 'react-redux';
import { deleteStory } from '../../redux/stories';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';

export default function DeleteStoryModal({ storyId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();


  const handleConfirm = async () => {
    const res = await dispatch(deleteStory(storyId));
    if (!res.error) {
      closeModal();
      navigate('/stories');
    }
  };

  return (
    <div className="delete-modal">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this story? This action cannot be undone.</p>
      <div className="modal-buttons">
        <button className="confirm-button" onClick={handleConfirm}>Yes, Delete</button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

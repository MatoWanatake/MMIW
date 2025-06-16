import React from "react";
import OpenModalButton from "../OpenModalButton";
import EditStoryForm from "./EditStoryForm";
import { useModal } from "../../context/Modal";

export default function EditStoryModal({ story }) {
  const { closeModal } = useModal();

  return (
    <OpenModalButton
      buttonText="Edit"
      modalComponent={<EditStoryForm story={story} onClose={closeModal} />}
    />
  );
}

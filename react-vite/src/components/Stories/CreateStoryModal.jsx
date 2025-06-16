import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateStoryForm from "./CreateStoryForm";
import { useModal } from "../../context/Modal";

export default function CreateStoryModal() {
  const { closeModal } = useModal();

  return (
    <OpenModalButton
      buttonText="+ New Story"
      modalComponent={<CreateStoryForm onClose={closeModal} />}
    />
  );
}

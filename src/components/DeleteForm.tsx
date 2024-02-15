import React from "react";
import ModalComponent from "./ModalComponent";
import { useDeleteUser } from "../hooks/useDeleteUserData";
import { Button } from "antd";

interface Props {
  id: string | null;
  isModalOpen: boolean;
  onClose: () => void;
}

const DeleteForm: React.FC<Props> = ({ isModalOpen, onClose, id }) => {
  const { mutate: deleteUser, isLoading } = useDeleteUser();

  const handleDelete = async () => {
    await deleteUser(id)
    onClose()
  }

  return (
    <ModalComponent
      isModalOpen={isModalOpen}
      onClose={onClose}
      title="Delete User"
    >
      <span className="text-sm font-medium">Are you sure to delete this user?</span>
      <div className="flex justify-end gap-2 mt-3">
        <Button type="primary" danger onClick={onClose}>Cancel</Button>
        <Button htmlType="submit"  onClick={handleDelete} loading={isLoading}>
          Confirm
        </Button>
      </div>
    </ModalComponent>
  );
};

export default DeleteForm;

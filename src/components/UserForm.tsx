import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { message, Button, Spin } from "antd";
import { useAddUser } from "../hooks/useAddUser";
import { useGetUserData } from "../hooks/useGetUserData";
import { useUpdateUserData } from "../hooks/useUpdateUserData";
import InputComponent from "./InputComponent";

interface Props {
  id: string | null;
  isModalOpen: boolean;
  onClose: () => void;
}

type FieldStatus = "" | "error" | "warning" | undefined;

const UserForm: React.FC<Props> = ({ isModalOpen, onClose, id }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [filedStatus, setFieldStatus] = useState<FieldStatus>("");
  const [messageApi, contextHolder] = message.useMessage();


  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please Enter Name and Username Field",
    });
  };

  const { data: userData, isLoading } = useGetUserData(id!);
  const { mutate: addUser, isLoading: addLoading } = useAddUser();
  const { mutate: updateUser, isLoading: updateLoading } = useUpdateUserData();

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        await updateUser({ id, body: formData });
        onClose();
      } else {
        console.log(formData);
        if (formData.name.length === 0) {
          error();
          setFieldStatus("error");
        } else {
          await addUser(formData);
          onClose();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalComponent
      isModalOpen={isModalOpen}
      onClose={onClose}
      title={id ? "Update User" : "Add USer"}
    >
      {contextHolder}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <InputComponent
              label="Name"
              name= "name"
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
              status={filedStatus}
            />
            <InputComponent
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              status={filedStatus}
            />
            <InputComponent
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 justify-end mt-5">
            <Button type="primary" danger onClick={onClose}>
              Cancel
            </Button>
            <Button htmlType="submit" loading={addLoading || updateLoading}>
              Confirm
            </Button>
          </div>
        </form>
      )}
    </ModalComponent>
  );
};

export default UserForm;

import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { message, Button, Spin } from "antd";
import { useAddUser } from "../hooks/useAddUser";
import { useGetUserData } from "../hooks/useGetUserData";
import { useUpdateUserData } from "../hooks/useUpdateUserData";
import InputComponent from "./InputComponent";
import {
  UserOutlined,
  MailOutlined,
  FontColorsOutlined,
  PhoneOutlined
} from "@ant-design/icons";

interface Props {
  id: string | null;
  isModalOpen: boolean;
  onClose: () => void;
}

type FieldStatus = "" | "error" | "warning" | undefined;

const UserForm: React.FC<Props> = ({ isModalOpen, onClose, id }) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    username: "",
    email: "",
    phone: ""
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if ((name === 'name' || name === 'username') && value.trim().length > 0) {
      setFieldStatus('');
    }
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
          <section>
            <div className="mb-3">
              <InputComponent
                label="Name"
                name="name"
                placeholder="Mehrdad Karami"
                value={formData.name}
                onChange={handleInputChange}
                status={filedStatus}
                prefix={<UserOutlined />}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Username"
                name="username"
                placeholder="Ash Mehr"
                value={formData.username}
                onChange={handleInputChange}
                status={filedStatus}
                prefix={<FontColorsOutlined />}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Email"
                name="email"
                type="email"
                placeholder="mehrdadk.jourabi@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                prefix={<MailOutlined />}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                label="Phone"
                name="phone"
                type="phone"
                placeholder="+98912..."
                value={formData.phone}
                onChange={handleInputChange}
                prefix={<PhoneOutlined />}
              />
            </div>
          </section>
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

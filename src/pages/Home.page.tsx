import React, { useMemo, useState } from "react";
import { Button, Select, Space, Spin, Table, Tooltip } from "antd";
import type { TableProps } from "antd";
import { useGetUsersData } from "../hooks/useGetUsersData";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import DeleteForm from "../components/DeleteForm";
import InputComponent from "../components/InputComponent";

interface DataType {
  key: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const HomePage: React.FC = () => {
  const [userModal, setUserModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [serachInput, setSearchInput] = useState<string>("");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record.key)}>
            <Tooltip title="Edit">
              <EditOutlined />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record.key)}>
            <Tooltip title="Delete">
              <DeleteOutlined />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  const handleOpenModal = () => {
    setUserModal(true);
    setUserId(null);
  };

  const handleCloseModal = () => {
    setUserModal(false);
    setDeleteModal(false);
  };

  const handleUpdate = (id: string) => {
    setUserModal(true);
    setUserId(id);
  };

  const handleDelete = (id: string) => {
    setDeleteModal(true);
    setUserId(id);
  };

  const { data: users, isLoading, isFetching } = useGetUsersData();

  const rows = useMemo(() => {
    if (users) {
      if (selectedUsers.length > 0) {
        return users
          .filter((user) => selectedUsers.includes(user.id))
          .map((user) => ({
            ...user,
            key: user.id,
          }));
      }

      if (serachInput.length > 0) {
        return users
          .filter(
            (user) =>
              user.name.includes(serachInput.toLowerCase()) ||
              user.username.includes(serachInput.toLowerCase()) ||
              user.email.includes(serachInput.toLowerCase()) ||
              user.phone.includes(serachInput)
          )
          .map((user) => ({
            ...user,
            key: user.id,
          }));
      }

      return users.map((user) => ({
        ...user,
        key: user.id,
      }));
    }
    return [];
  }, [selectedUsers, serachInput, users]);

  const selectPptions = useMemo(() => {
    if (users) {
      return users.map((user) => ({
        label: user.name,
        value: user.id,
      }));
    }
    return [];
  }, [users]);

  const handleChangeSelect = (value: string[]) => {
    setSelectedUsers(value);
  };

  return (
    <>
      <Header label="Users Table">
        <Button
          onClick={handleOpenModal}
          className=""
          icon={<PlusOutlined />}
          type="link"
        >
          Add User
        </Button>
        <Select
          mode="multiple"
          allowClear
          className="flex-1"
          placeholder="Filter users by selecting them ..."
          options={selectPptions}
          onChange={handleChangeSelect}
          loading={isLoading}
          filterOption={(inputValue, option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
        <div className="flex-1">
          <InputComponent
            name="searchInput"
            value={serachInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Filter users by searching them ..."
            prefix={<SearchOutlined />}
          />
        </div>
      </Header>

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center mt-24">
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={rows} />
      )}

      {userModal && (
        <UserForm
          id={userId}
          isModalOpen={userModal}
          onClose={handleCloseModal}
        />
      )}

      {deleteModal && (
        <DeleteForm
          id={userId}
          isModalOpen={deleteModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default HomePage;

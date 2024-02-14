import React, { useMemo, useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useGetUsersData } from '../hooks/useGetUsersData';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import { useDeleteUser } from '../hooks/useDeleteUserData';

interface DataType {
    key: string;
    name: string;
    username: number;
    email: string;
}



const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null)

    const { mutate: deleteUser } = useDeleteUser()

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleUpdate(record.key)}>Update</a>
                    <a onClick={() => handleDelete(record.key)}>Delete</a>
                </Space>
            ),
        },
    ];

    const handleOpenModal = () => {
        setIsModalOpen(true)
        setUserId(null)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = (id: string) => {
        setIsModalOpen(true)
        setUserId(id)
    }

    const handleDelete = async (id: string) => {
        await deleteUser(id)
    }




    const { data: users } = useGetUsersData()


    const rows = useMemo(() => {
        if (users) {
            return users.map((user: any) => ({
                ...user,
                key: user.id,
            }))
        }
    }, [users])

    return (
        <>
            <Header label="users" component={
                <Button onClick={handleOpenModal}>Add User</Button>
            } />
            <Table columns={columns} dataSource={rows} />
            {isModalOpen && <UserForm id={userId} isModalOpen={isModalOpen} onClose={handleCloseModal} />}
        </>
    )
}

export default HomePage;
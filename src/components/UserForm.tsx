import { useEffect, useState } from 'react';
import ModalComponent from './ModalComponent'
import { Typography, Input, Button } from 'antd';
import { useAddUser } from '../hooks/useAddUser';
import { useGetUserData } from '../hooks/useGetUserData';
import { useUpdateUserData } from '../hooks/useUpdateUserData';

interface Props {
    id: string | null;
    isModalOpen: boolean;
    onClose: () => void;
}

const UserForm: React.FC<Props> = ({ isModalOpen, onClose, id }) => {

    console.log("id", id)
    const { Text } = Typography;

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: ""
    })

    const { mutate: addUser } = useAddUser()
    const { data: userData } = useGetUserData(id!)
    const { mutate: updateUser } = useUpdateUserData()


    useEffect(() => {
        if (userData) {
            setFormData(userData)
        }
    }, [userData])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (id) {
                await updateUser({id, body: formData})
            } else {
                await addUser(formData)
            }
            onClose()
        } catch (err) {
            console.log(err)
        }
    }




    return (
        <ModalComponent isModalOpen={isModalOpen} onClose={onClose} >
            <form onSubmit={handleSubmit}>
                <div>
                    <Text>Name</Text>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <Text>Username</Text>
                    <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    <Text>Email</Text>
                    <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className='flex gap-2 justify-end mt-5'>
                    <Button danger>Cancel</Button>
                    <Button htmlType='submit'>Confirm</Button>
                </div>
            </form>
        </ModalComponent>
    )
}

export default UserForm
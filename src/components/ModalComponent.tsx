import { Modal } from 'antd'

interface Props {
    isModalOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalComponent: React.FC<Props> = ({ isModalOpen, onClose, children }) => {

    return (
        <Modal title="Add User" open={isModalOpen} onCancel={onClose} footer={false}>
            {children}
        </Modal>
    )
}

export default ModalComponent;
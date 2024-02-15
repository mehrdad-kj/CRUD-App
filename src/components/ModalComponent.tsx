import { Modal } from 'antd'

interface Props {
    isModalOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const ModalComponent: React.FC<Props> = ({ isModalOpen, onClose, children, title }) => {

    return (
        <Modal title={title} open={isModalOpen} onCancel={onClose} footer={false}>
            {children}
        </Modal>
    )
}

export default ModalComponent;
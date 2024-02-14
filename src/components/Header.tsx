import { Typography } from 'antd';

interface Props {
    label: string;
    component: any;
}

const Header: React.FC<Props> = ({ label, component }) => {
    const { Text } = Typography;

    return (
        <div className="flex items-center bg-white rounded-md px-2 py-3 my-3">
            <Text className="text-xl font-normal">{label}</Text>
            {component}
        </div>
    )
}

export default Header
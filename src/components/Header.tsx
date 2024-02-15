import { Typography } from 'antd';

interface Props {
    label?: string;
    children: any;
}

const Header: React.FC<Props> = ({ label, children }) => {
    const { Text } = Typography;

    return (
        <div className="flex items-center flex-wrap gap-2 bg-white rounded-md px-2 py-3 my-3">
            <Text className="text-sm font-medium">{label}</Text>
            {children}
        </div>
    )
}

export default Header
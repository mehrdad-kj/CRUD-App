import { Typography, Input } from "antd";

interface Props {
  label?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  status?: "" | "error" | "warning" | undefined;
  name: string;
  className?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
}

const InputComponent: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
  status,
  className,
  placeholder,
  prefix
}) => {
  const { Text } = Typography;

  return (
    <div className="mb-3">
      <Text className="font-normal">{label}</Text>
      <Input
        value={value}
        onChange={onChange}
        status={status}
        name={name}
        className={className}
        placeholder={placeholder}
        prefix={prefix}
      />
    </div>
  );
};

export default InputComponent;

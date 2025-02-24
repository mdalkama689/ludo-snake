interface IInput {
  type: string;
  placeholder: string;
  onChange: any;
  value: string;
  disabled: boolean;
  name: string;
}

const Input = ({
  type,
  placeholder,
  onChange,
  value,
  disabled,
  name,
}: IInput) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
      name={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  );
};

export default Input;

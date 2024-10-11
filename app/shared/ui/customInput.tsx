const CustomInput = ({
  name,
  placeholder,
  type,
  value,
  disable = false,
  required,
  fullWidth,
}: {
  name: string;
  placeholder?: string;
  type: string;
  value?: string;
  disable: boolean;
  fullWidth: boolean;
  required: boolean;
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disable}
      defaultValue={value}
      required={required}
      className={`
        h-20 bg-transparent border-b text-2xl self-center focus:outline-none
        ${fullWidth ? "w-full" : "w-4/5"} 
        ${disable && "opacity-50 cursor-default"}
      `}
    ></input>
  );
};

export default CustomInput;

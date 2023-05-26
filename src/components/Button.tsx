interface ButtonProps {
  label: string;
  secondary?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  outline,
  fullWidth,
  large,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
disabled:opacity-70
disabled:cursor-not-allowed
rounded-full 
font-semibold
hover:opacity-80
transition
border-2
${fullWidth ? "w-full" : "w-fit"}
${
  secondary
    ? "bg-white text-black border-black"
    : "bg-sky-500 border-sky-500 text-white"
}
${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
${outline ? "bg-transparent border-r text-white" : ""}

  `}
    >
      {label}
    </button>
  );
};

export default Button;

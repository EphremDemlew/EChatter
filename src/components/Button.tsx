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
                    disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2 flex items-center justify-center${
                      fullWidth ? "w-full" : "w-fit"
                    }
                    ${
                      secondary
                        ? " dark:bg-white text-white bg-black dark:text-black dark:border-black"
                        : "bg-orange-500 border-orange-500 text-white "
                    }
                    ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
                    ${
                      outline
                        ? "bg-transparent border-r text-black dark:text-white "
                        : ""
                    }

                `}
    >
      {label}
    </button>
  );
};

export default Button;

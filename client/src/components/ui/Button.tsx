interface IButton {
  text: string;
  disabled?: boolean;
  onClick?: any;
  className?: string
}

const Button = ({ text, disabled, onClick, className }: IButton) => {
  return (
    <button
      className={` ${className}`}
      disabled={disabled}
      onClick={onClick}

    >
      {text}
    </button>
  );
};

export default Button;

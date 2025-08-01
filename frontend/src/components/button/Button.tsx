type ButtonProps = {
  onClick?: (...args: any[]) => void;
  children: string;
  buttonType?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
};

const Button = ({ onClick, children, buttonType, disabled }: ButtonProps) => {
  return (
    <button
      type={buttonType}
      className={`bg-primary cursor-pointer rounded-lg border-0 px-2.5 py-1.5 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-primary-hover ${
        disabled ? 'hover:bg-primary cursor-not-allowed opacity-50' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

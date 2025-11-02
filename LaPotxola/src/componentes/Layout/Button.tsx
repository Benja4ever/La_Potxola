import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
};

const Button = ({ children = "Botón", className = "", ...props }: Props) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center cursor-pointer
        w-[245px] h-[43px] md:w-[260px] md:h-[46px]
        rounded-full border border-primary-1
        bg-primary-1 text-secondary-1 font-titulo4
        transition-all duration-300 ease-out
        hover:bg-[#f7f7ee] hover:text-[#434b34] hover:-translate-y-[2px]
        active:translate-y-0 active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-1/50
        motion-reduce:transform-none motion-reduce:transition-none
        
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

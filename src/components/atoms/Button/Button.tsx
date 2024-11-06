import { MouseEvent, ReactNode } from "react";

export type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode,
  className?: string,
  disabled?: boolean
}

const bg = 'bg-primary hover:bg-primaryHover active:bg-primaryActive disabled:bg-primaryDisabled';

export const Button = ({ onClick, children, className = '', disabled }: ButtonProps) => {
  return (
    <button disabled={disabled} className={`w-[310px] h-[32px] ${bg} rounded px-2.5 py-1.5 box-border ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
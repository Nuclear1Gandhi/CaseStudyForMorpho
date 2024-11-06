import Image from "next/image"
import { ChangeEvent } from "react"

export type InputProps = {
  label: string,
  placeholder?: string,
  value: string,
  iconSrc?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
}

const InputStyles = {
  error: {
    color: 'text-color-interactive-error',
    borderColor: 'focus:outline-color-interactive-error'
  },
  default: {
    color: 'text-color-body',
    borderColor: 'focus:outline-constants-color-active'
  }
}

export const Input = ({ placeholder, label, value, onChange, iconSrc, errorMessage }: InputProps) => {
  const styles = InputStyles[errorMessage ? 'error' : 'default']
  return (
    <div className="flex flex-col h-[81px]">
      <label className="text-xxs text-color-secondary mb-2" htmlFor={label}>{label}</label>
      <div className="relative flex h-inherit w-full">
        <input
          name={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`outline-none text-ellipsis focus:outline-1 rounded-md pl-2.5 pr-[29px] py-2 placeholder:text-color-interactive-disabled box-border h-[36px] text-xs bg-background-secondary w-full ${styles.color} ${styles.borderColor}`}
        />
        {iconSrc && <Image src={iconSrc} height={16} width={16} className="absolute right-[8px] top-1/2 -translate-y-1/2" alt="input-state" />}
      </div>
      {errorMessage && <p className={`${styles.color} text-right mt-[3px] text-xxxs`}>{errorMessage}</p>}
    </div>
  )
}
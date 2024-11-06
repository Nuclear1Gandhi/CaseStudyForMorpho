export type CardProps = {
  children?: React.ReactNode,
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-background-block border border-solid border-border-primary rounded-lg shadow-dp4 p-5 box-border ${className}`}>
      {children}
    </div>
  )
}


export type ValueDisplayProps = {
  label: string,
  value: string
}

export const ValueDisplay = ({ label, value }: ValueDisplayProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xxxs text-color-tertiary">{label}</p>
      <p className="text-sm text-color-body">{value}</p>
    </div>
  )
}
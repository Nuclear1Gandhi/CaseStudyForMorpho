import { Content, State } from "@/app/content"
import { Button } from "@/components/atoms/Button/Button"
import { Card } from "@/components/atoms/Cards/Card"
import Image from "next/image"
import { MouseEvent } from "react"

export type PanelProps = {
  state: State.Connect | State.WrongNetwork
  isPending: boolean,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Panel = ({ state, isPending, onClick }: PanelProps) => {
  const { description, icon, title, button, buttonLoading } = Content[state]
  return (
    <Card className='flex flex-col text-center gap-12.5 justify-center w-[350px] h-[350px]'>
      <div className='flex flex-col gap-2.5 items-center'>
        <Image width={24} height={24} src={icon} alt="logo" />
        <p className='text-xl text-color-body'>{title}</p>
        <p className='text-sm text-color-secondary'>{description}</p>
      </div>
      <Button
        disabled={isPending}
        onClick={onClick}
      >
        <p className='text-xs text-button-primary'>{isPending ? buttonLoading : button}</p>
      </Button>
    </Card>
  )
}
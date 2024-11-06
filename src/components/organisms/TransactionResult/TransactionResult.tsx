import { Content, State } from "@/app/content"
import { Button } from "@/components/atoms/Button/Button"
import { Card } from "@/components/atoms/Cards/Card"
import Image from "next/image"
import { ReactNode } from "react"

type TransactionResultProps = {
  success: boolean;
  amount?: string;
  symbol?: string;
  onClick: () => void;
  children: ReactNode
}


const Styles = {
  success: {
    color: 'text-color-interactive-valid',
    icon: '/svg/general/RoundCheckmark.svg'
  },
  failure: {
    color: 'text-color-interactive-error',
    icon: '/svg/general/ExclamationMark.svg'
  }
}

export const TransactionResult = ({ success, onClick, amount = '0', symbol = '', children }: TransactionResultProps) => {
  const content = Content[success ? State.Success : State.Failure]
  const { color, icon } = Styles[success ? 'success' : 'failure']

  return (
    <Card className="w-[21.857rem] h-[16.875rem] px-[20px] py-[50px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <Image height={32} width={32} src={icon} alt="success-checkmark" />
        <p className={`text-sm ${color} mt-2`}>{content.title}</p>
        {children}
      </div>
      <Button onClick={() => onClick()}>
        <p className="text-xs">{content.button}</p>
      </Button>
    </Card>
  )
}
import { Content, State } from "@/app/content"
import { Button } from "@/components/atoms/Button/Button"
import { Card } from "@/components/atoms/Cards/Card"

export type PendingTransactionProps = {
  txHash: string
}

export const PendingTransaction = ({ txHash }: PendingTransactionProps) => {
  const content = Content[State.Pending]
  return (
    <Card className="w-[21.875rem] h-[16.875rem] flex flex-col justify-between px-[1.25rem] py-[3.125rem]">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-color-body text-center">{content.title}</p>
        <div className="text-color-tertiary text-xxxs text-center">
          {`${content.description} `}
          <a href={`${process.env.NEXT_PUBLIC_ETHERSCAN_LINK}/tx/${txHash}`} className="underline" target="_blank">{content.explorer} {` ->`}</a>
        </div>
      </div>
      <Button disabled>
        <p className="text-xs">{content.button}</p>
      </Button>
    </Card>
  )
}
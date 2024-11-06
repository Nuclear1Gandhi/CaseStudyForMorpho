'use client'

import { useAccount, useConnect, useConfig, useSwitchChain, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Panel } from '@/components/organisms/Panel/Panel';
import { Card } from '@/components/atoms/Cards/Card';
import { Input } from '@/components/atoms/Input/Input';
import { Content, State } from './content';
import { useState } from 'react';
import { Address, formatUnits } from 'viem';
import { createMetamorphoFactoryContract } from '@/viem/mmFactoryContract';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { ValueDisplay } from '@/components/atoms/ValueDisplay/ValueDisplay';
import { Button } from '@/components/atoms/Button/Button';
import { CaseStudyForMorphoChain } from '@/wagmi/chain';
import { PendingTransaction } from '@/components/organisms/PendingTransaction/PendingTransaction';
import { createVaultContract } from '@/viem/vaultContract';
import { createErc20Contract } from '@/viem/erc20Contract';
import { MetamorphoVaultABI } from '@/abi/metamorphoVaultABI';
import { TransactionResult } from '@/components/organisms/TransactionResult/TransactionResult';
import { formatResource } from '@/utils/formatResource';

type VaultData = {
  name: string,
  symbol: string,
  vaultDecimals: number,
  assetDecimals: number,
  userAssets: bigint
  userShares: bigint
  assetSymbol: string
  userMaxWithdraw: bigint,
  formattedAssets: string,
  formattedShares: string
  formattedMaxWithdraw: string
}


function App() {
  const { chain, isConnecting, isConnected, address: account } = useAccount()
  const { connect } = useConnect()
  const { chains } = useConfig()
  const isWrongNetwork = isConnected && chain?.id !== chains[0].id;
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain()
  const [inputAddress, setInputAddress] = useState('')
  const [isMetaMorpho, setIsMetaMorpho] = useState<boolean | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const inputContent = Content[State.Input];
  const [redeemData, setRedeemData] = useState<VaultData | undefined>(undefined)
  const {
    data: redeemHash,
    isPending: isRedeeming,
    isError,
    isSuccess,
    writeContract,
    reset
  } = useWriteContract()


  const getRedeemData = async (account: Address) => {
    const vault = createVaultContract({ address: inputAddress })

    const [name, symbol, decimals, assetAddress, userShares, maxRedeem] = await Promise.all([
      vault.read.name(),
      vault.read.symbol(),
      vault.read.decimals(),
      vault.read.asset(),
      vault.read.balanceOf([account]),
      vault.read.maxRedeem([account])
    ])

    const asset = createErc20Contract({ assetAddress })

    const [userAssets, userMaxWithdraw, assetSymbol, assetDecimals] = await Promise.all([
      vault.read.convertToAssets([userShares]),
      vault.read.convertToAssets([maxRedeem]),
      asset.read.symbol(),
      asset.read.decimals(),
    ])
    setRedeemData({
      name,
      symbol,
      assetSymbol,
      vaultDecimals: decimals,
      assetDecimals,
      userShares,
      userAssets,
      userMaxWithdraw,
      formattedMaxWithdraw: formatResource(formatUnits(userMaxWithdraw, assetDecimals)),
      formattedAssets: formatResource(formatUnits(userAssets, assetDecimals)),
      formattedShares: formatResource(formatUnits(userShares, decimals)),
    })
  }

  useDebounceCallback(inputAddress as Address, async () => {
    try {
      /* Always reset input state and vault when its base value changes */
      setIsMetaMorpho(undefined);
      setErrorMessage(undefined);
      setRedeemData(undefined)

      if (!inputAddress || !account) return;

      const isMetaMorpho = await createMetamorphoFactoryContract().read.isMetaMorpho([inputAddress])
      if (!isMetaMorpho) {
        setErrorMessage(inputContent.errorInvalidVaultAddress);
        setIsMetaMorpho(false)
        return;
      }


      await getRedeemData(account)
      setIsMetaMorpho(true)
    } catch (error: any) {
      if (inputContent[error?.name as keyof typeof inputContent]) {
        setErrorMessage(inputContent[error.name as keyof typeof inputContent])
      } else {
        setErrorMessage(inputContent.genericError);
      }

      console.error(error)
    }
  })

  const redeem = async () => {
    if (!redeemData || !account) return;

    writeContract({
      abi: MetamorphoVaultABI,
      address: inputAddress as Address,
      functionName: 'redeem',
      args: [redeemData.userMaxWithdraw, account, account],
      chain: CaseStudyForMorphoChain,
    })
  }

  if (!isConnected || isWrongNetwork) {
    return (
      <Panel
        onClick={() => {
          if (isWrongNetwork) switchChain({ chainId: chains[0].id })
          else connect({ connector: injected() })
        }}
        isPending={isConnecting || isSwitchingChain}
        state={isWrongNetwork ? State.WrongNetwork : State.Connect}
      />
    )
  }

  if (redeemHash && !isError && !isSuccess) {
    return (
      <PendingTransaction txHash={redeemHash} />
    )
  }

  if (redeemHash && (isSuccess || isError) && redeemData) {
    const _description = Content[isSuccess ? State.Success : State.Failure].description
    const description = typeof _description === 'string'
      ? _description
      : _description(formatUnits(redeemData?.userAssets, redeemData?.assetDecimals), redeemData?.assetSymbol ?? '')
    return (
      <TransactionResult onClick={() => {
        getRedeemData(account as Address)
        reset();
      }} success={isSuccess} >
        <p className="text-xxxs text-color-tertiary mt-1">{description}</p>
      </TransactionResult>
    )
  }

  return (
    <div className='flex flex-col gap-[1.5625rem]'>
      {!redeemHash && <Card className='flex flex-col h-[9.75rem] w-[21.875rem] justify-center'>
        <Input
          placeholder={inputContent.placeholder}
          label={inputContent.label}
          value={inputAddress}
          errorMessage={errorMessage}
          iconSrc={isMetaMorpho === true ? inputContent.validAddressIcon : isMetaMorpho === false || errorMessage ? inputContent.invalidAddressIcon : undefined}
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </Card>}
      {redeemData && !redeemHash && account &&
        <Card
          className='flex flex-col h-[20.0625rem] w-[21.875rem] px-5 py-[3.125rem] justify-center'
        >
          <p className='text-color-body text-xl mb-[25px]'>{redeemData.name} {redeemData.symbol}</p>
          <div className='flex flex-col gap-2.5 mb-[50px]'>
            <ValueDisplay label={Content[State.Withdraw].sharesLabel} value={`${redeemData.formattedShares} ${redeemData.symbol}`} />
            <ValueDisplay label={Content[State.Withdraw].assetsLabel} value={`${redeemData.formattedAssets} ${redeemData.assetSymbol}`} />
          </div>
          <Button className='flex justify-center items-center' disabled={Number(redeemData.userShares) <= 0 || isRedeeming} onClick={async () => redeem()}>
            <p className='text-xs'> {isRedeeming ? Content[State.Withdraw].signButton : `${Content[State.Withdraw].button} ${redeemData.formattedMaxWithdraw} ${redeemData.assetSymbol}`}</p>
          </Button>
        </Card>
      }
    </div>
  )
}

export default App


// 0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB
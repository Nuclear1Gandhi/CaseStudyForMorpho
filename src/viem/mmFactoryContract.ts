import { Address, getContract } from 'viem'
import { MetamorphoFactoryABI } from '@/abi/metamorphoFactoryABI'
import { createPublicClient, createWalletClient } from './client'

export const createMetamorphoFactoryContract = () => getContract({
  address: process.env.NEXT_PUBLIC_METAMORPHO_FACTORY_ADDRESS as Address,
  abi: MetamorphoFactoryABI,
  client: { public: createPublicClient(), wallet: createWalletClient() }
})

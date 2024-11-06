import { type Chain, } from 'viem'

export const CaseStudyForMorphoChain = {
  id: +process.env.NEXT_PUBLIC_CHAIN_ID!,
  name: 'CaseStudyForMorpho',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL as string] },
  },
} as const satisfies Chain
import { createPublicClient as publicClient, createWalletClient as walletClient, http, custom } from 'viem'

export const createPublicClient = () => publicClient({
  chain: {
    id: 1,
    name: 'CaseStudyForMorpho',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.NEXT_PUBLIC_RPC_URL as string] },
    },
  },
  transport: http(),
})

// eg: Metamask
export const createWalletClient = () => walletClient({
  chain: {
    id: 1,
    name: 'CaseStudyForMorpho',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.NEXT_PUBLIC_RPC_URL as string] },
    },
  },
  transport: custom(window.ethereum!),
})

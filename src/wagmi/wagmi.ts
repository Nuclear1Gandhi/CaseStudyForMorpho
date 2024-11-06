import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { CaseStudyForMorphoChain } from './chain'

export function getConfig() {
  return createConfig({
    chains: [CaseStudyForMorphoChain],
    connectors: [
      injected(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [CaseStudyForMorphoChain.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '../wagmi/wagmi'
import { Providers } from './providers'

import './globals.css'

//todo
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Morpho Case Study',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en">
      <body className={`${inter.className} absolute left-1/2 transform -translate-x-1/2  top-1/2 -translate-y-1/2 bg-background-base`}>
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  )
}

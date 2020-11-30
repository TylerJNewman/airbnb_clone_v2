import * as React from 'react'
import Head from 'next/head'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'

import {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../utils/apollo'

export default function App({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

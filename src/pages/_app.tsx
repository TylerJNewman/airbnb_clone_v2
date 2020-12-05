import * as React from 'react'
import {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../utils/apollo'
import {Viewer} from 'types'
import Head from 'next/head'
import {Layout} from 'antd'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
// import '../styles/styles.css' // turn on and off for reference for local

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

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
        <Layout id="app">
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  )
}

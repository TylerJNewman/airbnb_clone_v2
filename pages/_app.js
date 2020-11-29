import React from 'react'

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'

import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apolloClient'

export default function App({Component, pageProps}) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

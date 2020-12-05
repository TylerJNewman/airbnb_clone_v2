import * as React from 'react'
import {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../utils/apollo'
import {Viewer} from 'types'
import Head from 'next/head'
import {Layout, Affix} from 'antd'
import * as Sentry from '@sentry/react'
import {init} from 'utils/sentry'

init()

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import {AppHeader} from 'section'
// import '../styles/styles.css' // turn on and off for reference for local

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

function FallbackComponent() {
  return <div>An error has occurred</div>
}

export default function App({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const [viewer, setViewer] = React.useState<Viewer>(initialViewer)

  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <Head>
        <link rel="icon" type="image/png" href="home_away.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="home_away.png" sizes="16x16" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Layout id="app">
          <Affix offsetTop={0} className="app__affix-header">
            <AppHeader setViewer={setViewer} viewer={viewer} />
          </Affix>
          <Component {...pageProps} setViewer={setViewer} viewer={viewer} />
        </Layout>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}

/// <reference types="@welldone-software/why-did-you-render" />
import * as React from 'react'
import {AppProps} from 'next/app'
import {ApolloProvider, useMutation} from '@apollo/client'
import {useApollo} from '../utils/apollo'
import {Viewer} from 'types'
import Head from 'next/head'
import {Layout, Affix, Spin} from 'antd'
import {LOG_IN} from 'utils/mutations/LogIn'
import {
  LogIn as LogInData,
  LogInVariables,
} from 'utils/mutations/LogIn/__generated__/LogIn'
import * as Sentry from '@sentry/react'
import {init} from 'utils/sentry'

init()

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import {AppHeader} from 'section'
import {LayoutWithSkeleton, ErrorBanner} from 'components'
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

const App = ({Component, pageProps}: AppProps) => {
  const [viewer, setViewer] = React.useState<Viewer>(initialViewer)
  const [logIn, {error}] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn) {
        setViewer(data.logIn)
      }
    },
  })
  const logInRef = React.useRef(logIn)

  React.useEffect(() => {
    logInRef.current()
  }, [])

  const statusIsPending = !viewer.didRequest && !error

  if (statusIsPending) {
    return <LayoutWithSkeleton />
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in, please try again later." />
  ) : null

  return (
    <Layout id="app">
      {logInErrorBannerElement}
      <Affix offsetTop={0} className="app__affix_header">
        <AppHeader setViewer={setViewer} viewer={viewer} />
      </Affix>
      <Component {...pageProps} setViewer={setViewer} viewer={viewer} />
    </Layout>
  )
}

export default function AppWithProvider({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <Head>
        <link rel="icon" type="image/png" href="home_away.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="home_away.png" sizes="16x16" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <App Component={Component} {...pageProps} />
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}

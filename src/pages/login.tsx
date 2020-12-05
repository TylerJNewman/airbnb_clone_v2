import * as React from 'react'
import {useApolloClient, useMutation} from '@apollo/client'
import {Card, Layout, Spin, Typography} from 'antd'
import styles from '../styles/pages/login.module.css'
import {LOG_IN} from 'utils/mutations/LogIn'
import {AUTH_URL} from 'utils/queries/AuthUrl'
import {AuthUrl as AuthUrlData} from 'utils/queries/AuthUrl/__generated__/AuthUrl'
import {
  LogIn as LogInData,
  LogInVariables,
} from 'utils/mutations/LogIn/__generated__/LogIn'
import {Viewer} from 'types'
import {ErrorBanner, Redirect} from 'components'
import {displaySuccessNotification, displayErrorMessage} from 'utils'

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

// Image Assets
const googleLogo = '/google_logo.jpg'

interface Props {
  setViewer: (viewer: Viewer) => void
}

const {Content} = Layout
const {Text, Title} = Typography

export const Login = () => {
  const [viewer, setViewer] = React.useState<Viewer>(initialViewer)
  const client = useApolloClient()
  const [
    logIn,
    {data: logInData, loading: logInLoading, error: logInError},
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn)
        displaySuccessNotification("You've successfully logged in!")
      }
    },
  })
  const logInRef = React.useRef(logIn)

  React.useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')
    if (code) {
      logInRef.current({
        variables: {
          input: {code},
        },
      })
    }
  }, [])

  const handleAuthorize = async () => {
    try {
      const {data} = await client.query<AuthUrlData>({
        query: AUTH_URL,
      })
      window.location.href = data.authUrl
    } catch {
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!",
      )
    }
  }

  if (logInLoading) {
    return (
      <Content className={styles.log_in}>
        <Spin size="large" tip="Logging you in..." />
      </Content>
    )
  }

  if (logInData && logInData.logIn) {
    const {id: viewerId} = logInData.logIn
    return <Redirect to={`/user/${viewerId}`} />
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null

  return (
    <Content className={styles.log_in}>
      {logInErrorBannerElement}
      <Card className={styles.log_in_card}>
        <div className={styles.log_in_card__intro}>
          <Title level={3} className={styles.log_in_card__intro_title}>
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className={styles.log_in_card__intro_title}>
            Log in to HomeAway!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          onClick={handleAuthorize}
          className={styles.log_in_card__google_button}
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className={styles.log_in_card__google_button_logo}
          />
          <span className={styles.log_in_card__google_button_text}>
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  )
}

export default Login

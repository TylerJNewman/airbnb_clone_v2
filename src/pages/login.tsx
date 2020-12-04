import React from 'react'
import {useApolloClient} from '@apollo/client'
import {Card, Layout, Typography} from 'antd'
import styles from '../styles/pages/login.module.css'
// import {LOG_IN} from 'utils/mutations/LogIn'
import {AUTH_URL} from 'utils/queries/AuthUrl'
import {AuthUrl as AuthUrlData} from 'utils/queries/AuthUrl/__generated__/AuthUrl'

// Image Assets
const googleLogo = '/google_logo.jpg'

const {Content} = Layout
const {Text, Title} = Typography

const Login = () => {
  const client = useApolloClient()

  const handleAuthorize = async () => {
    try {
      const {data} = await client.query<AuthUrlData>({
        query: AUTH_URL,
      })
      console.log({data})
      window.location.href = data.authUrl
    } catch {}
  }

  // const [
  //   logIn,
  //   {data: logInData, loading: logInLoading, error: logInError},
  // ] = useMutation<LogInData, LogInVariables>(LOG_IN)
  // const logInRef = React.useRef(logIn)

  // React.useEffect(() => {
  //   const code = new URL(window.location.href).searchParams.get('code')
  //   if (code) {
  //     logInRef.current({
  //       variables: {
  //         input: {code},
  //       },
  //     })
  //   }
  // }, [])

  return (
    <Content className={styles.log_in}>
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

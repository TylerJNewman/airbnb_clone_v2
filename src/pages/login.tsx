import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/client'
import {Card, Layout, Typography} from 'antd'
import styles from '../styles/pages/login.module.css'

// Image Assets
const googleLogo = '/google_logo.jpg'

const {Content} = Layout
const {Text, Title} = Typography

const Login = () => {
  const [session] = useSession()

  const handleLogin = (e) => {
    e.preventDefault()
    signIn('google')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut()
  }

  if (session)
    return (
      <>
        <img
          src={session.user.image}
          className="user"
          style={{width: 100, height: 100}}
        />
        <a href="#" onClick={handleLogout} className="logout">
          Logout
        </a>
      </>
    )

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
          onClick={handleLogin}
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

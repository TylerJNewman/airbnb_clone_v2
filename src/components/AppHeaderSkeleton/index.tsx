import * as React from 'react'
import {Layout} from 'antd'
import styles from 'section/AppHeader/AppHeader.module.css'

const logoSrc = '/home_away.png'
const {Header} = Layout

export const AppHeaderSkeleton = () => {
  return (
    <Header className={styles.app_header}>
      <div className={styles.app_header__logo_search_section}>
        <div className={styles.app_header__logo}>
          <img src={logoSrc} alt="App logo" />
        </div>
      </div>
    </Header>
  )
}

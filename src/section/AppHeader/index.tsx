import Link from 'next/link'
import {Layout} from 'antd'
import React from 'react'
import {MenuItems} from 'components'
import {Viewer} from 'types'
import styles from './AppHeader.module.css'

const {Header} = Layout

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

const logoSrc = '/home_away.png'

export const AppHeader = ({viewer, setViewer}) => {
  return (
    <Header className={styles.app_header}>
      <div className={styles.app_header__logo_search_section}>
        <div className={styles.app_header__logo}>
          <Link href="/">
            <img src={logoSrc} alt="App logo" />
          </Link>
        </div>
      </div>
      <div className={styles.app_header__menu_section}>
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  )
}

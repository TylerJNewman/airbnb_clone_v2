import Link from 'next/link'
import {Layout} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import React from 'react'
import {MenuItems} from 'section'
import {Viewer} from 'types'
import styles from './AppHeader.module.css'

const {Header} = Layout

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

const logoSrc = '/favicon-32x32.png'

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

import Link from 'next/link'
import {Avatar, Button, Menu} from 'antd'
import React from 'react'
import {useMutation} from '@apollo/client'
import {displaySuccessNotification, displayErrorMessage} from 'utils'
import {LOG_OUT} from 'utils/mutations/LogOut'
import {LogOut as LogOutData} from 'utils/mutations/LogOut/__generated__/LogOut'
import {Viewer} from 'types'
import {HomeOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons'
import styles from './MenuItems.module.css'

const {Item, SubMenu} = Menu

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const MenuItems = ({viewer, setViewer}: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut)
        displaySuccessNotification("You've successfully logged out!")
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!",
      )
    },
  })

  const handleLogOut = () => {
    logOut()
  }

  const subMenuLogin =
    viewer?.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link href={`/user/${viewer.id}`}>
            <a>
              <UserOutlined />
              Profile
            </a>
          </Link>
        </Item>
        <Item key="/logout">
          <div onClick={handleLogOut}>
            <LogoutOutlined />
            Log out
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link href="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    )

  return (
    <Menu mode="horizontal" selectable={false} className={styles.menu}>
      <Item key="/host">
        <Link href="/host">
          <a>
            <HomeOutlined />
            Host
          </a>
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  )
}

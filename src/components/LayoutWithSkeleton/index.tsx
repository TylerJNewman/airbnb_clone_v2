import {Layout, Spin} from 'antd'
import React from 'react'
import {AppHeaderSkeleton} from 'components'
import styles from './LayoutWithSkeleton.module.css'

export const LayoutWithSkeleton = React.memo(() => {
  return (
    <Layout className={styles.app_skeleton}>
      <AppHeaderSkeleton />
      <div className={styles.app_skeleton__spin_section}>
        <Spin size="large" tip="Launching Homeaway" />
      </div>
    </Layout>
  )
})

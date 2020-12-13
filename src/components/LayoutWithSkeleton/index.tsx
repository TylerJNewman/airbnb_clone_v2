import {Layout, Spin} from 'antd'
import React from 'react'
import {AppHeaderSkeleton} from 'components'
import styles from './LayoutWithSkeleton.module.css'

export const LayoutWithSkeleton = React.memo(() => {
  return (
    <Layout className={styles.root}>
      <AppHeaderSkeleton />
      <div className={styles.spin_section}>
        <Spin size="large" tip="Launching Homeaway" />
      </div>
    </Layout>
  )
})

import React, {Fragment} from 'react'
import {Skeleton} from 'antd'
import styles from './PageSkeleton.module.css'

export const PageSkeleton = () => {
  const skeletonParagraph = (
    <Skeleton active paragraph={{rows: 4}} className={styles.paragraph} />
  )

  return (
    <Fragment>
      {skeletonParagraph}
      {skeletonParagraph}
      {skeletonParagraph}
    </Fragment>
  )
}

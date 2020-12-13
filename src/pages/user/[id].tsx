import {useQuery} from '@apollo/client'
import * as React from 'react'
import {useRouter} from 'next/router'
import {USER} from 'utils/queries'
import {
  User as UserData,
  UserVariables,
} from 'utils/queries/User/__generated__/User'
import {Col, Layout, Row} from 'antd'
import {UserProfile} from '@/components/UserProfile'
import styles from 'styles/pages/user.module.css'
import {Viewer} from 'types'
import {PageSkeleton, ErrorBanner, UserBookings, UserListings} from 'components'

const {Content} = Layout

interface Props {
  viewer: Viewer
}

const PAGE_LIMIT = 4

const User = ({viewer}: Props) => {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id

  const [listingsPage, setListingsPage] = React.useState(1)
  const [bookingsPage, setBookingsPage] = React.useState(1)

  const {data, loading, error} = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  })

  if (loading) {
    return (
      <Content className={styles.user}>
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className={styles.user}>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    )
  }

  const user = data?.user ?? null
  const viewerIsUser = viewer.id === id

  const userListings = user?.listings ?? null
  const userBookings = user?.bookings ?? null

  const userProfileElement = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null

  const userBookingsElement = userListings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null

  return (
    <Content className={styles.user}>
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  )
}

export default User

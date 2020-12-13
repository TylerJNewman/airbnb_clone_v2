import * as React from 'react'
import {Typography, List} from 'antd'
import {ListingCard} from '..'
import {User} from 'utils/queries/User/__generated__/User'
import styles from './UserListings.module.css'

interface Props {
  userListings: User['user']['listings']
  listingsPage: number
  limit: number
  setListingsPage: (page: number) => void
}

const {Paragraph, Title} = Typography

export const UserListings = ({
  userListings,
  listingsPage,
  limit,
  setListingsPage,
}: Props) => {
  const {total, result} = userListings

  const userListingsList = (
    <List
      // grid={{
      //   gutter: 8,
      //   xs: 1,
      //   sm: 2,
      //   lg: 4,
      // }}
      // for some reason need to specify all
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      dataSource={result}
      locale={{emptyText: "User doesn't have any listings yet!"}}
      pagination={{
        position: 'top',
        current: listingsPage,
        total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingsPage(page),
        style: {paddingBottom: 20},
      }}
      renderItem={(userListing) => (
        <List.Item>
          <ListingCard listing={userListing} />
        </List.Item>
      )}
    />
  )

  return (
    <div className={styles.root}>
      <Title level={4} className={styles.title}>
        Listings
      </Title>
      <Paragraph className={styles.description}>
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Paragraph>
      {userListingsList}
    </div>
  )
}

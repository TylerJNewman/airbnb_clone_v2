import * as React from 'react'
import {Avatar, Button, Card, Divider, Typography} from 'antd'
import {User as UserData} from 'utils/queries/User/__generated__/User'
import styles from './UserProfiles.module.css'

interface Props {
  user: UserData['user']
  viewerIsUser: boolean
}

const {Paragraph, Text, Title} = Typography

export const UserProfile = ({user, viewerIsUser}: Props) => {
  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider />
      <div className={styles.user_profile__details}>
        <Title level={4}>Additional Details</Title>
        <Paragraph>
          Interested in becoming a HomeAway host? Register with your Stripe
          account!
        </Paragraph>
        <Button type="primary" className={styles.user_profile__details_cta}>
          Connect with Stripe!
        </Button>
        <Paragraph type="secondary">
          TinyHouse uses{' '}
          <a
            href="https://stripe.com/en-US/connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>{' '}
          to help transfer your earnings in a secure and trusted manner.
        </Paragraph>
      </div>
    </>
  ) : null

  return (
    <div className={styles.user_profile}>
      <Card className={styles.user_profile__card}>
        <div className={styles.user_profile__avatar}>
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className={styles.user_profile__details}>
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  )
}

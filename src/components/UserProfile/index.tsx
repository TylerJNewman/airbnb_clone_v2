import * as React from 'react'
import {Avatar, Card, Divider, Typography} from 'antd'
import {User as UserData} from 'utils/queries/User/__generated__/User'
import styles from './UserProfiles.module.css'

interface Props {
  user: UserData['user']
}

const {Paragraph, Text, Title} = Typography

export const UserProfile = ({user}: Props) => {
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
      </Card>
    </div>
  )
}

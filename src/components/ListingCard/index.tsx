import React from 'react'
import {Card, Typography} from 'antd'
import {iconColor, formatListingPrice} from 'utils'
import Link from 'next/link'
import styles from './ListingCard.module.css'
import {UserOutlined} from '@ant-design/icons'

interface Props {
  listing: {
    id: string
    title: string
    image: string
    address: string
    price: number
    numOfGuests: number
  }
}

const {Text, Title} = Typography

export const ListingCard = ({listing}: Props) => {
  const {id, title, image, address, price, numOfGuests} = listing

  return (
    <Link href={`/listing/${id}`} passHref>
      <a>
        <Card
          hoverable
          cover={
            <div
              style={{backgroundImage: `url(${image})`}}
              className={styles.cover_img}
            />
          }
        >
          <div className={styles.details}>
            <div className={styles.description}>
              <Title level={4} className={styles.price}>
                {formatListingPrice(price)}
                <span>/day</span>
              </Title>
              <Text strong ellipsis className={styles.title}>
                {title}
              </Text>
              {/* <Text ellipsis className={styles.address}>
              {address}
            </Text> */}
            </div>
            <div
              className={`${styles.dimensions} ${styles.dimensions__guests}`}
            >
              <UserOutlined style={{color: iconColor}} />
              <Text>{numOfGuests} guests</Text>
            </div>
          </div>
        </Card>
      </a>
    </Link>
  )
}

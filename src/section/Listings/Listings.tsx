import * as React from 'react'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'
import {ListingsSkeleton} from './ListingsSkeleton'
import {ListingsList} from './ListingsList'

import styles from './Listings.module.css'

export const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

export function Listings({title}: {title: string}) {
  const {data, loading, error} = useQuery(LISTINGS)
  const listings = data?.listings ?? null

  if (loading) {
    return (
      <div className={styles.listings}>
        <ListingsSkeleton title={title} error={!!error} />
      </div>
    )
  }

  if (error) {
    return <h2>Something went wrong...</h2>
  }

  return (
    <div className={styles.listings}>
      <h2>{title}</h2>
      <ListingsList listings={listings} />
    </div>
  )
}

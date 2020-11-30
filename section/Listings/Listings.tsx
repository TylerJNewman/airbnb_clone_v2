import * as React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'
import {
  Listings as ListingsData,
  Listings_listings as Listing,
} from './__generated__/Listings'
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing'
import {List, Avatar, Button, Spin} from 'antd'
import './styles/Listings.module.css'
import {ListingsSkeleton} from './components'

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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`
interface ListingListProps {
  listings: Listing[] | null
}

function ListingList({listings}: ListingListProps) {
  const {refetch} = useQuery<ListingsData>(LISTINGS)
  const [deleteListing, {loading, error}] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    await deleteListing({variables: {id}})
    refetch()
  }

  if (error) return <div>Something went wrong with deleting...</div>
  if (!listings || listings.length === 0) return <div>No listings....</div>

  return (
    <>
      <Spin spinning={loading}></Spin>
      <List
        itemLayout="horizontal"
        dataSource={listings}
        renderItem={(listing) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                key="delete"
                onClick={() => handleDeleteListing(listing.id)}
              >
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
              title={listing.title}
              description={listing.address}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export function Listings({title}: {title: string}) {
  const {data, loading, error} = useQuery<ListingsData>(LISTINGS)
  const listings = data?.listings ?? null
  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={!!error} />
      </div>
    )
  }

  if (error) {
    return <h2>Something went wrong...</h2>
  }

  return (
    <div className="listings">
      <h2>{title}</h2>
      <ListingList listings={listings} />
    </div>
  )
}

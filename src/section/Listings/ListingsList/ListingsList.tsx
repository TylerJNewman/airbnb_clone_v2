import * as React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'
import {ListingsData, Listing} from '../types'
import {DeleteListingData, DeleteListingVariables} from '../types'
import {LISTINGS} from '../Listings'
import {List, Avatar, Button, Spin} from 'antd'

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`
const ListingsList = ({listings}) => {
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
        renderItem={(listing: Listing) => (
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

export default ListingsList

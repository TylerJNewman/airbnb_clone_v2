import {IResolvers} from 'apollo-server-micro'
import {Listing} from 'apollo/lib/types'

export const listingResolvers: IResolvers = {
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString()
    },
  },
}

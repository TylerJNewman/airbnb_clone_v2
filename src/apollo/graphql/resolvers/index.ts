import merge from 'lodash.merge'
import {bookingResolvers} from './Booking'
import {listingResolvers} from './Listing'
import {viewerResolvers} from './Viewer'
import {userResolvers} from './User'

export const resolvers = merge(
  bookingResolvers,
  listingResolvers,
  userResolvers,
  viewerResolvers,
)

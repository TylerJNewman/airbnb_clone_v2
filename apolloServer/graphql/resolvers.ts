import merge from 'deepmerge'
import {listingResolvers} from './Listing'

export const resolvers = merge({}, listingResolvers)

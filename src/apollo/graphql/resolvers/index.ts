import merge from 'deepmerge'
import {userResolvers} from './User'
import {viewerResolvers} from './Viewer'

export const resolvers = merge(userResolvers, viewerResolvers)

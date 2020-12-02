import merge from 'deepmerge'
import {viewerResolvers} from './Viewer'

export const resolvers = merge({}, viewerResolvers)

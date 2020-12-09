import {IResolvers} from 'apollo-server-micro'

export const userResolvers: IResolvers = {
  Query: {
    user: () => {
      return 'Query.user'
    },
  },
}

import {ObjectId} from 'mongodb'
import {IResolvers} from 'apollo-server-micro'
import {Database, Listing} from '../../lib/types'

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: `unkown`,
      {db}: {db: Database},
    ): Promise<Listing[]> => {
      if (!db) return []
      return await db.listings.find({}).toArray()
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      {id}: {id: string},
      {db}: {db: Database},
    ): Promise<Listing> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      })

      if (deleteResult?.value) {
        return deleteResult.value
      }

      throw new Error('failed to delete listing')
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
}

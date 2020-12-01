import {Collection, ObjectId, ClientSession} from 'mongodb'

export interface Booking {
  _id: ObjectId
}
export interface Listing {
  _id: ObjectId
}

export interface User {
  _id: ObjectId
}

export interface Database {
  listings: Collection<Listing>
  users: Collection<User>
}

export interface DatabaseConnection {
  client: ClientSession
  db: Database
}

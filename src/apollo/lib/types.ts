import {Collection, ObjectId, ClientSession} from 'mongodb'

export interface Listing {
  _id: ObjectId
  title: string
  image: string
  address: string
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBaths: number
  rating: number
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

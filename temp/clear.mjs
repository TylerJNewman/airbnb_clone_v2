import connectToDatabase from './database.mjs'

let mongoClient

const clear = async () => {
  try {
    console.log('[clear] : running...')

    const {db, client} = await connectToDatabase()
    mongoClient = client

    const bookings = await db.bookings.find({}).toArray()
    const listings = await db.listings.find({}).toArray()
    const users = await db.users.find({}).toArray()

    if (bookings.length > 0) {
      await db.bookings.drop()
    }

    if (listings.length > 0) {
      await db.listings.drop()
    }

    if (users.length > 0) {
      await db.users.drop()
    }

    console.log('[clear] : success')
  } catch (err) {
    console.dir(err)
    throw new Error('failed to clear database')
  } finally {
    mongoClient.close()
  }
}

clear()

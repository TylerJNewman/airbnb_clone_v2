import pkg from 'mongodb'
const {MongoClient, ObjectID} = pkg
import dotenv from 'dotenv'
dotenv.config()

const {MONGODB_URI, MONGODB_DB} = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  )
}

async function connectToDatabase() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const client = await MongoClient.connect(MONGODB_URI, opts).catch((err) =>
    console(err),
  )
  const db = client.db(MONGODB_DB)
  const listingsCollection = db.collection('test_listings')
  return {listingsCollection, client}
}

const seed = async () => {
  try {
    console.log(`[seed] : running...`)
    const {listingsCollection, client} = await connectToDatabase()

    const listings = [
      {
        _id: new ObjectID(),
        title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
        address: '3210 Scotchmere Dr W, Toronto, ON, CA',
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5,
      },
      {
        _id: new ObjectID(),
        title: 'Luxurious home with private pool',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
        address: '100 Hollywood Hills Dr, Los Angeles, California',
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4,
      },
      {
        _id: new ObjectID(),
        title: 'Single bedroom located in the heart of downtown San Fransisco',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg',
        address: '200 Sunnyside Rd, San Fransisco, California',
        price: 25000,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3,
      },
    ]

    for (const listing of listings) {
      await listingsCollection.insertOne(listing)
    }

    console.log(`Successfully seeded database...`)
    client.close()
  } catch (error) {
    throw new Error('failed to seed database')
  }
}

seed()

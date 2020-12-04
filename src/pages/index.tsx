import {initializeApollo} from '../utils/apollo'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/client'
import {connectToDatabase} from 'apollo/database'

const ListingsQuery = gql`
  query ListingsQuery {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

const Index = () => {
  // const {
  //   data: {listings},
  // } = useQuery(ListingsQuery)
  const listings = null

  if (!listings) return <>no listings</>

  return <Listings title="Airbnb Clone Listings" />
}

// export async function getServerSideProps() {
//   const context = await connectToDatabase()
//   const apolloClient = initializeApollo(null, context)

//   await apolloClient.query({
//     query: ListingsQuery,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default Index

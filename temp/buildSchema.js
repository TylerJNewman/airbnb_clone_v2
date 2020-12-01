const {getIntrospectionQuery} = require('graphql')
const axios = require('axios')
const fs = require('fs')

const ENDPOINT_URL = 'http://localhost:3000/api'

async function build() {
  const res = await axios.post(ENDPOINT_URL, {query: getIntrospectionQuery()})
  fs.writeFile('schema.json', JSON.stringify(res.data.data), () =>
    console.log('successfully built schema'),
  )
}

build()

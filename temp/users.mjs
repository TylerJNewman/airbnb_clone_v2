import pkg from 'mongodb'
const {ObjectId} = pkg

const users = [
  {
    _id: '5d378db94e84753160e08b55',
    token: 'token_************',
    name: 'James J.',
    avatar:
      'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg',
    contact: 'james@homeawau.com',
    walletId: 'acct_************',
    income: 723796,
    bookings: [],
    listings: [
      new ObjectId('5d378db94e84753160e08b31'),
      new ObjectId('5d378db94e84753160e08b4b'),
      new ObjectId('5d378db94e84753160e08b4c'),
    ],
  },
  {
    _id: '5d378db94e84753160e08b56',
    token: 'token_************',
    name: 'Elizabeth A.',
    avatar:
      'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649052/mock/users/user-profile-2_arwtdy.jpg',
    contact: 'elizabeth@homeawau.com',
    walletId: 'acct_************',
    income: 256144,
    bookings: [],
    listings: [
      new ObjectId('5d378db94e84753160e08b37'),
      new ObjectId('5d378db94e84753160e08b38'),
      new ObjectId('5d378db94e84753160e08b3a'),
      new ObjectId('5d378db94e84753160e08b3b'),
      new ObjectId('5d378db94e84753160e08b3d'),
      new ObjectId('5d378db94e84753160e08b41'),
      new ObjectId('5d378db94e84753160e08b43'),
      new ObjectId('5d378db94e84753160e08b4a'),
      new ObjectId('5d378db94e84753160e08b50'),
      new ObjectId('5d378db94e84753160e08b51'),
      new ObjectId('5d378db94e84753160e08b53'),
      new ObjectId('5d378db94e84753160e08b54'),
    ],
  },
  {
    _id: '5d378db94e84753160e08b57',
    token: 'token_************',
    name: 'Andrew D.',
    avatar:
      'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560649280/mock/users/user-profile-3_omxctk.jpg',
    contact: 'andrew@homeawau.com',
    walletId: 'acct_************',
    income: 272359,
    bookings: [],
    listings: [
      new ObjectId('5d378db94e84753160e08b30'),
      new ObjectId('5d378db94e84753160e08b32'),
      new ObjectId('5d378db94e84753160e08b34'),
      new ObjectId('5d378db94e84753160e08b35'),
      new ObjectId('5d378db94e84753160e08b36'),
      new ObjectId('5d378db94e84753160e08b3c'),
      new ObjectId('5d378db94e84753160e08b3e'),
      new ObjectId('5d378db94e84753160e08b47'),
      new ObjectId('5d378db94e84753160e08b48'),
      new ObjectId('5d378db94e84753160e08b4d'),
    ],
  },
  {
    _id: '5d378db94e84753160e08b58',
    token: 'token_************',
    name: 'Danielle C.',
    avatar:
      'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560650165/mock/users/user-profile-4_wxi6om.jpg',
    contact: 'danielle@homeawau.com',
    walletId: 'acct_************',
    income: 465043,
    bookings: [],
    listings: [
      new ObjectId('5d378db94e84753160e08b3f'),
      new ObjectId('5d378db94e84753160e08b40'),
      new ObjectId('5d378db94e84753160e08b44'),
    ],
  },
  {
    _id: '5d378db94e84753160e08b59',
    token: 'token_************',
    name: 'Sarah K.',
    avatar:
      'https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560650436/mock/users/user-profile-5_tm8hhl.jpg',
    contact: 'sarah@homeawau.com',
    walletId: 'acct_************',
    income: 104347,
    bookings: [],
    listings: [
      new ObjectId('5d378db94e84753160e08b33'),
      new ObjectId('5d378db94e84753160e08b39'),
      new ObjectId('5d378db94e84753160e08b42'),
      new ObjectId('5d378db94e84753160e08b45'),
      new ObjectId('5d378db94e84753160e08b46'),
      new ObjectId('5d378db94e84753160e08b49'),
      new ObjectId('5d378db94e84753160e08b4e'),
      new ObjectId('5d378db94e84753160e08b4f'),
      new ObjectId('5d378db94e84753160e08b52'),
    ],
  },
]

export default users

import {google} from 'googleapis'

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_URL} = process.env
const REDIRECT_URI = `${PUBLIC_URL}/login`

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
)

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  logIn: async (code: string) => {
    const {tokens} = await auth.getToken(code)

    auth.setCredentials(tokens)

    const {data} = await google.people({version: 'v1', auth}).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    })

    return {user: data}
  },
}

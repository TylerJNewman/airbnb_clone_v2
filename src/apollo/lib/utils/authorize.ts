import {NextApiRequest} from 'next'
import {Database, User} from '../types'

export const authorize = async (
  db: Database,
  req: NextApiRequest,
): Promise<User | null> => {
  console.log('entered Authorize function')
  const token = req.headers.authorization
  console.log(req.headers)

  const viewer = await db.users.findOne({
    _id: req.cookies.view,
    token,
  })

  return viewer
}

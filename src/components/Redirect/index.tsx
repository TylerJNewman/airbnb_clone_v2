import {useRouter} from 'next/dist/client/router'

interface Props {
  to: string
}

export const Redirect = ({to}: Props) => {
  const router = useRouter()
  router.push(to)
  return ''
}

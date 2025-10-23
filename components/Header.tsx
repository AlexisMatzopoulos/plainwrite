import { getServerProfile } from '@/lib/getServerProfile'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const profileData = await getServerProfile()

  return <HeaderClient {...profileData} />
}

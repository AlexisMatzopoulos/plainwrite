import { getServerProfile } from '@/lib/getServerProfile'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const profileData = await getServerProfile()

  return (
    <HeaderClient
      isLoggedIn={profileData.isLoggedIn}
      serverProfile={profileData.profile}
      serverUserRole={profileData.userRole}
      userEmail={profileData.userEmail}
      userName={profileData.userName}
      userImage={profileData.userImage}
    />
  )
}

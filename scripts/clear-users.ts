import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearAllUsers() {
  console.log('🗑️  Clearing all users and related data...\n')

  try {
    // Get counts before deletion
    const userCount = await prisma.user.count()
    const profileCount = await prisma.profile.count()
    const historyCount = await prisma.history.count()

    console.log('📊 Current database state:')
    console.log(`   Users: ${userCount}`)
    console.log(`   Profiles: ${profileCount}`)
    console.log(`   History entries: ${historyCount}`)
    console.log('')

    if (userCount === 0) {
      console.log('✅ Database is already empty!')
      return
    }

    // Delete all users (cascades to profiles and history)
    console.log('🔄 Deleting all users (will cascade to related tables)...')
    const deletedUsers = await prisma.user.deleteMany({})
    console.log(`   ✅ Deleted ${deletedUsers.count} users`)

    // Verify all is cleared
    const remainingUsers = await prisma.user.count()
    const remainingProfiles = await prisma.profile.count()
    const remainingHistory = await prisma.history.count()

    console.log('\n📊 Final database state:')
    console.log(`   Users: ${remainingUsers}`)
    console.log(`   Profiles: ${remainingProfiles}`)
    console.log(`   History entries: ${remainingHistory}`)

    if (
      remainingUsers === 0 &&
      remainingProfiles === 0 &&
      remainingHistory === 0
    ) {
      console.log('\n✅ All data successfully cleared! Database is now empty.')
    } else {
      console.log('\n⚠️  Warning: Some data may still remain in the database.')
    }
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

clearAllUsers()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

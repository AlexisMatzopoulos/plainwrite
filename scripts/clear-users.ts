import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearAllUsers() {
  console.log('🗑️  Clearing all users and related data...\n')

  try {
    // Get counts before deletion
    const userCount = await prisma.user.count()
    const profileCount = await prisma.profile.count()
    const historyCount = await prisma.history.count()
    const accountCount = await prisma.account.count()
    const sessionCount = await prisma.session.count()
    const verificationTokenCount = await prisma.verificationToken.count()

    console.log('📊 Current database state:')
    console.log(`   Users: ${userCount}`)
    console.log(`   Profiles: ${profileCount}`)
    console.log(`   History entries: ${historyCount}`)
    console.log(`   Accounts: ${accountCount}`)
    console.log(`   Sessions: ${sessionCount}`)
    console.log(`   Verification tokens: ${verificationTokenCount}`)
    console.log('')

    if (userCount === 0) {
      console.log('✅ Database is already empty!')
      return
    }

    // Delete all users (cascades to accounts, sessions, profiles, history)
    console.log('🔄 Deleting all users (will cascade to related tables)...')
    const deletedUsers = await prisma.user.deleteMany({})
    console.log(`   ✅ Deleted ${deletedUsers.count} users`)

    // Delete verification tokens (not cascaded)
    console.log('🔄 Deleting verification tokens...')
    const deletedTokens = await prisma.verificationToken.deleteMany({})
    console.log(`   ✅ Deleted ${deletedTokens.count} verification tokens`)

    // Verify all is cleared
    const remainingUsers = await prisma.user.count()
    const remainingProfiles = await prisma.profile.count()
    const remainingHistory = await prisma.history.count()
    const remainingAccounts = await prisma.account.count()
    const remainingSessions = await prisma.session.count()
    const remainingTokens = await prisma.verificationToken.count()

    console.log('\n📊 Final database state:')
    console.log(`   Users: ${remainingUsers}`)
    console.log(`   Profiles: ${remainingProfiles}`)
    console.log(`   History entries: ${remainingHistory}`)
    console.log(`   Accounts: ${remainingAccounts}`)
    console.log(`   Sessions: ${remainingSessions}`)
    console.log(`   Verification tokens: ${remainingTokens}`)

    if (
      remainingUsers === 0 &&
      remainingProfiles === 0 &&
      remainingHistory === 0 &&
      remainingAccounts === 0 &&
      remainingSessions === 0 &&
      remainingTokens === 0
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

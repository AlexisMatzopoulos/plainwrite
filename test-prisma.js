const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log('✅ Prisma connection successful:', result);
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Prisma connection failed:', error.message);
    await prisma.$disconnect();
  }
}

testPrisma();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking mslhfr1999@gmail.com account in database...\n');
  
  const user = await prisma.user.findUnique({
    where: { email: 'mslhfr1999@gmail.com' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      accountType: true,
      _count: { select: { products: true } }
    }
  });

  if (user) {
    console.log('✓ Account found:');
    console.log('  Email:', user.email);
    console.log('  Name:', user.name);
    console.log('  Role:', user.role, '← এটা ADMIN হওয়া উচিত');
    console.log('  Account Type:', user.accountType);
    console.log('  Products:', user._count.products);
  } else {
    console.log('✗ Account not found!');
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

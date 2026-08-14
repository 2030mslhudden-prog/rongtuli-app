const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking for existing mslhfr1999@gmail.com account...');
  
  const existingUser = await prisma.user.findUnique({
    where: { email: 'mslhfr1999@gmail.com' },
  });

  if (existingUser) {
    console.log('✓ Found existing account:');
    console.log('  - Name:', existingUser.name);
    console.log('  - Role:', existingUser.role);
    console.log('  - Account Type:', existingUser.accountType);
    console.log('');
    console.log('🗑️  Deleting old account...');
    
    // Delete products created by this user
    await prisma.product.deleteMany({
      where: { authorId: existingUser.id },
    });
    console.log('  ✓ Deleted associated products');
    
    // Delete the user
    await prisma.user.delete({
      where: { id: existingUser.id },
    });
    console.log('  ✓ Deleted user account');
  } else {
    console.log('ℹ️  No existing account found');
  }

  console.log('');
  console.log('➕ Creating fresh super-admin account...');

  const adminEmail = 'mslhfr1999@gmail.com';
  const adminPassword = 'Admin@Rongtuli2026';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const newAdmin = await prisma.user.create({
    data: {
      name: 'রংতুলি ডিজাইন',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      accountType: 'COMMERCIAL',
      phone: '+880 1711-000000',
      address: 'Dhaka, Bangladesh',
      bio: 'Platform administrator with full dashboard access.',
    },
  });

  console.log('✅ Fresh super-admin account created:');
  console.log('  - Email:', newAdmin.email);
  console.log('  - Name:', newAdmin.name);
  console.log('  - Role:', newAdmin.role);
  console.log('  - ID:', newAdmin.id);
  console.log('');
  console.log('🔐 Login Credentials:');
  console.log('  Email:', adminEmail);
  console.log('  Password:', adminPassword);
  console.log('');
  console.log('✅ Done! You can now log in with the fresh account.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

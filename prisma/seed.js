const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const sampleProducts = [
  {
    id: '1',
    title: 'SaaS Dashboard UI Kit',
    description: 'A comprehensive, modern SaaS UI kit containing 50+ desktop and mobile screens designed for modern analytics platforms.',
    category: 'UI Kits',
    price: 49.00,
    imageUrl: '/images/product-saas-checkout.jpg',
    tags: 'ui kit, saas, dashboard, analytics',
    status: 'ACTIVE',
    salesCount: 124,
    viewsCount: 3840,
  },
  {
    id: '2',
    title: '3D Tech & Finance Icons',
    description: 'High quality 3D render icons for fintech, crypto, and modern tech applications. Includes PNG & Blender source files.',
    category: '3D Assets',
    price: 24.00,
    imageUrl: '/images/product-3d-icons-checkout.jpg',
    tags: '3d, icons, finance, tech, blender',
    status: 'ACTIVE',
    salesCount: 89,
    viewsCount: 2910,
  },
  {
    id: '3',
    title: 'Aurora Serif Font Family',
    description: 'An elegant display serif typeface tailored for luxury branding, editorial layouts, and premium packaging.',
    category: 'Fonts',
    price: 45.00,
    imageUrl: '/images/product-aurora-font.jpg',
    tags: 'font, serif, typography, luxury',
    status: 'ACTIVE',
    salesCount: 98,
    viewsCount: 2210,
  },
  {
    id: '4',
    title: 'Retro Grade Display Font',
    description: 'Bold vintage display font with distinct geometric curves and retro aesthetic for posters and headlines.',
    category: 'Fonts',
    price: 22.00,
    imageUrl: '/images/product-retro-grade.jpg',
    tags: 'font, retro, vintage, display',
    status: 'ACTIVE',
    salesCount: 53,
    viewsCount: 876,
  },
  {
    id: '5',
    title: 'Whisper Signature Script',
    description: 'Handcrafted signature font with smooth natural flow, perfect for invitations and personal logo marks.',
    category: 'Fonts',
    price: 18.00,
    imageUrl: '/images/product-whisper-script.jpg',
    tags: 'font, script, signature, luxury',
    status: 'ACTIVE',
    salesCount: 31,
    viewsCount: 1120,
  },
  {
    id: '6',
    title: 'Nexus Modern Dashboard UI',
    description: 'Sleek dark and light mode admin dashboard design with responsive grid layout and Figma source components.',
    category: 'UI Kits',
    price: 120.00,
    imageUrl: '/images/product-nexus-dashboard.jpg',
    tags: 'dashboard, figma, admin, react ui',
    status: 'ACTIVE',
    salesCount: 67,
    viewsCount: 1980,
  },
];

async function main() {
  const adminEmail = 'mslhfr1999@gmail.com';
  const adminPassword = 'Admin@Rongtuli2026';

  let adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    adminUser = await prisma.user.create({
      data: {
        name: 'Rongtuli Super Admin',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
        accountType: 'COMMERCIAL',
        phone: '+880 1711-000000',
        address: 'Dhaka, Bangladesh',
        bio: 'Platform administrator with full dashboard access.',
      },
    });
    console.log('Super admin created:', adminUser.email);
  } else {
    adminUser = await prisma.user.update({
      where: { id: adminUser.id },
      data: { role: 'ADMIN', name: adminUser.name || 'Rongtuli Super Admin' },
    });
    console.log('Super admin ensured:', adminUser.email);
  }

  let user = await prisma.user.findUnique({
    where: { email: 'demo@rongtuli.com' },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash('password123', 10);
    user = await prisma.user.create({
      data: {
        name: 'Creative Author',
        email: 'demo@rongtuli.com',
        passwordHash,
        role: 'AUTHOR',
        accountType: 'COMMERCIAL',
        phone: '+880 1711-000000',
        address: 'Dhaka, Bangladesh',
        bio: 'Passionate digital artist creating UI Kits and Typography.',
      },
    });
    console.log('Demo user created:', user.email);
  }

  for (const item of sampleProducts) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl,
        tags: item.tags,
        status: item.status,
      },
      create: {
        ...item,
        authorId: user.id,
      },
    });
  }

  console.log('Sample products seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

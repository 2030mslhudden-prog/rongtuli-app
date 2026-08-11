-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'AUTHOR',
    "accountType" TEXT NOT NULL DEFAULT 'PERSONAL', "phone" TEXT, "address" TEXT,
    "avatarUrl" TEXT, "bio" TEXT, "website" TEXT, "payoutMethod" TEXT DEFAULT 'bkash',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL,
    "category" TEXT NOT NULL, "price" DOUBLE PRECISION NOT NULL, "imageUrl" TEXT NOT NULL,
    "fileUrl" TEXT, "tags" TEXT, "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "salesCount" INTEGER NOT NULL DEFAULT 0, "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL, CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL, "orderNumber" TEXT NOT NULL, "totalAmount" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL, "tax" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING', "paymentMethod" TEXT NOT NULL DEFAULT 'bkash',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" TEXT,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL, "licenseType" TEXT NOT NULL DEFAULT 'Personal',
    "price" DOUBLE PRECISION NOT NULL, "quantity" INTEGER NOT NULL DEFAULT 1,
    "orderId" TEXT NOT NULL, "productId" TEXT NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
ALTER TABLE "Product" ADD CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

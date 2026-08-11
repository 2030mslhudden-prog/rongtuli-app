# Rongtuli marketplace

## Production handoff

Orders now stay `PENDING` by default. They must be changed to `PAID` by a
verified payment-provider webhook before sales or author earnings are counted.
`PAYMENT_SIMULATION_ENABLED=true` is for local testing only.

### PostgreSQL

1. Provision a managed PostgreSQL database and set its connection string in `DATABASE_URL`.
2. Generate the client: `npx prisma generate --schema prisma/schema.postgres.prisma`.
3. Deploy schema migrations: `npx prisma migrate deploy --schema prisma/schema.postgres.prisma`.

`prisma/schema.postgres.prisma` is the production schema for a new managed database. Do not run the demo seed against a live marketplace unless you explicitly need demo data.

### cPanel Node.js App

Use Node.js 20.9 or later and set the application startup file to `app.js`.
After uploading the project (excluding `node_modules`, `.next`, `.env`, and
`prisma/dev.db`) to the application root, run:

```bash
npm ci --include=dev
npx prisma generate --schema prisma/schema.postgres.prisma
npx prisma migrate deploy --schema prisma/schema.postgres.prisma
npm run build
```

Set `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, and
`PAYMENT_SIMULATION_ENABLED=false` in the cPanel app environment, then restart
the application. The cPanel process runs `app.js`; do not start a second server
manually with `npm run start`.

If cPanel does not provide a terminal, set `RUN_DATABASE_MIGRATIONS=true` for
the first restart. `app.js` then runs `prisma migrate deploy` before accepting
web traffic. Keep it enabled only while you want pending migrations applied;
the app intentionally does not start if the migration fails. The server must
already have dependencies installed, including the `prisma` package.

### Payments and file storage

Add a provider-specific payment initiation endpoint and signed webhook. The
webhook must locate the matching pending order, set it to `PAID`, and increment
product sales counts in the same transaction. Before accepting source files,
configure S3-compatible object storage (for example Cloudflare R2). Keep only
an object key in `Product.fileUrl`; generate a signed download URL only after
checking the buyer has a paid order item.

Copy `.env.example` for local setup. Add real secrets only through the hosting
provider's encrypted environment-variable settings.

## Local development

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

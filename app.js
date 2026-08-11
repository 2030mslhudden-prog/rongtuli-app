const { createServer } = require('node:http');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const path = require('node:path');
const next = require('next');

const port = Number.parseInt(process.env.PORT || '3000', 10);
const hostname = '127.0.0.1';
const applicationRoot = __dirname;
const app = next({ dev: process.env.NODE_ENV !== 'production', dir: applicationRoot, hostname, port });
const handle = app.getRequestHandler();
const execFileAsync = promisify(execFile);

async function runMigrations() {
  if (process.env.RUN_DATABASE_MIGRATIONS !== 'true') return;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required when RUN_DATABASE_MIGRATIONS=true');
  }

  const prismaCommand = path.join(
    applicationRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'prisma.cmd' : 'prisma'
  );
  console.log('Applying pending PostgreSQL migrations…');
  const { stdout, stderr } = await execFileAsync(
    prismaCommand,
    ['migrate', 'deploy', '--schema', 'prisma/schema.postgres.prisma'],
    { cwd: applicationRoot, env: process.env }
  );
  if (stdout) console.log(stdout);
  if (stderr) console.warn(stderr);
}

runMigrations().then(() => app.prepare()).then(() => {
  createServer((request, response) => handle(request, response)).listen(port, hostname, () => {
    console.log(`Rongtuli is listening on ${hostname}:${port}`);
  });
}).catch((error) => {
  console.error('Unable to start Rongtuli:', error);
  process.exit(1);
});

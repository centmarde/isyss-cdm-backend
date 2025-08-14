import fetch from 'node-fetch';

const services = [
  // { name: 'Gateway Service', url: 'http://localhost:3000/api/health' },
  { name: 'Security Service', url: 'http://localhost:3001/api/health' },
  { name: 'Caching Service', url: 'http://localhost:3002/api/health' },
  { name: 'User Account Service', url: 'http://localhost:3003/api/health' },
  { name: 'Activity Logs Service', url: 'http://localhost:3004/api/health' },
  // { name: 'System Settings Service', url: 'http://localhost:3005/api/health' },
  // { name: 'License Applicaition & Management Service', url: 'http://localhost:3006/api/health' },
  // ... add other services
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function pingService(service: { name: string; url: string }) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(service.url);
      const text = await res.text();
      console.log(`✅ ${service.name}: ${text}`);
      return;
    } catch {
      console.warn(`❌ [Attempt ${attempt}] ${service.name} not responding`);
      await delay(5000); // wait 5s before retry
    }
  }
  console.error(`❌ ${service.name} failed after 5 attempts.`);
}

async function checkHealth() {
  console.log('⏳ Waiting for services to start...');
  await delay(15000); // initial delay before first ping

  for (const service of services) {
    await pingService(service);
  }

  console.log('✅ Health check complete.');
}

checkHealth();

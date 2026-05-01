const path = require('path');
// Try to find puppeteer in various locations
let puppeteer;
const attempts = [
  'puppeteer',
  path.join(process.env.APPDATA || '', 'npm/node_modules/puppeteer'),
  path.join(process.env.USERPROFILE || '', 'AppData/Roaming/npm/node_modules/puppeteer'),
  'C:/Users/EliteBook 840 G7/AppData/Local/Temp/node_modules/puppeteer',
];
for (const p of attempts) {
  try { puppeteer = require(p); break; } catch(e) {}
}
if (!puppeteer) { console.error('puppeteer not found'); process.exit(1); }

(async () => {
  const b = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await b.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const adminState = { state: { user: { id:'a1', name:'Admin User', email:'admin@fabrician.com', role:'admin', addresses:[] }, isAuthenticated:true, isAdmin:true }, version:0 };
  const demoState  = { state: { user: { id:'u1', name:'Demo User',  email:'demo@fabrician.com',  role:'customer', addresses:[] }, isAuthenticated:true, isAdmin:false }, version:0 };

  const setAuth = (state) => page.evaluate((s) => localStorage.setItem('fabrician-auth', JSON.stringify(s)), state);
  const clearAuth = () => page.evaluate(() => localStorage.removeItem('fabrician-auth'));

  // Seed app first so localStorage domain is set
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 500));

  const shots = [
    { url: '/login',           file: 'sc-login.png',           auth: null },
    { url: '/admin',           file: 'sc-admin-dash.png',      auth: 'admin' },
    { url: '/admin/studio',    file: 'sc-admin-studio.png',    auth: 'admin' },
    { url: '/admin/settings',  file: 'sc-admin-settings.png',  auth: 'admin' },
    { url: '/studio',          file: 'sc-studio.png',          auth: null },
    { url: '/account',         file: 'sc-account.png',         auth: 'demo' },
  ];

  for (const s of shots) {
    if (s.auth === 'admin') await setAuth(adminState);
    else if (s.auth === 'demo') await setAuth(demoState);
    else await clearAuth();

    await page.goto('http://localhost:3000' + s.url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: 'E:/Fabrician/Fabrician/' + s.file });
    console.log('ok:', s.file);
  }

  await b.close();
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE = 'https://vistoria.metriclab.com.br';

(async () => {
  const assetsDir = path.resolve(process.cwd(), 'assets/recordings');
  const publicDir = path.resolve(process.cwd(), 'public/recordings');
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    recordVideo: {
      dir: assetsDir,
      size: { width: 390, height: 844 },
    },
  });

  const page = await context.newPage();

  // CENA 1 — Splash
  console.log('▶️ [V2] Acessando Splash Vistoria...');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.click('text=ENTRAR');

  // CENA 2 — Login
  console.log('▶️ [V2] Efetuando login...');
  await page.waitForURL(/\/login/, { timeout: 10000 });
  await page.waitForTimeout(1000);

  // Set session fallback in localStorage
  await page.evaluate(() => {
    localStorage.setItem(
      'ml_vistoria_session',
      JSON.stringify({
        lead_id: '17f89a9f-f3a8-4df3-831b-7260f2017a41',
        telefone: '5511999990001',
        nome: 'Carlos Mendes',
      })
    );
  });

  await page.locator('input[type="tel"]').fill('+55 (11) 99999-0001');
  await page.waitForTimeout(400);
  await page.locator('input[type="password"]').fill('123456');
  await page.waitForTimeout(400);
  await page.click('button[type="submit"]');

  // CENA 3 — Trechos
  console.log('▶️ [V2] Selecionando trecho...');
  try {
    await page.waitForURL(/\/trechos/, { timeout: 10000 });
  } catch {
    await page.goto(`${BASE}/trechos`, { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(2500);

  const trechoCard = page.locator('h3:has-text("Trecho 01"), h3:has-text("Trecho")').first();
  await trechoCard.click();

  // CENA 4 — Passo 1 residência
  console.log('▶️ [V2] Preenchendo dados residência...');
  try {
    await page.waitForURL(/\/vistoria\/novo/, { timeout: 10000 });
  } catch {
    await page.goto(`${BASE}/vistoria/novo?trecho_id=132b2313-eb1c-4e54-960a-24aa39f01456`, {
      waitUntil: 'networkidle',
    });
  }
  await page.waitForTimeout(1500);

  const numInput = page.locator('input[type="number"], input[placeholder*="142"]');
  await numInput.fill('42');
  await page.waitForTimeout(800);
  await page.locator('button:has-text("Próximo")').click();

  // CENA 5 — Checklist
  console.log('▶️ [V2] Respondendo checklist...');
  await page.waitForTimeout(1500);
  const simButtons = page.locator('button:has-text("SIM")');
  const count = await simButtons.count();
  for (let i = 0; i < count; i++) {
    await simButtons.nth(i).click();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(800);
  await page.locator('button:has-text("Próximo")').click();

  // CENA 6 — Passo fotos
  console.log('▶️ [V2] Passo fotos...');
  await page.waitForTimeout(1000);
  const dummyPixel = Buffer.from(
    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
    'base64'
  );
  const fileInput = page.locator('input[type="file"]');
  if (await fileInput.count() > 0) {
    try {
      await fileInput.setInputFiles({
        name: 'fachada.jpg',
        mimeType: 'image/jpeg',
        buffer: dummyPixel,
      });
      await page.waitForTimeout(2500);
    } catch (e) {
      console.warn('Fallback fotos');
    }
  }
  await page.locator('button:has-text("Próximo")').click();

  // CENA 7 — Assinatura + GPS
  console.log('▶️ [V2] Passo assinatura e GPS...');
  await page.waitForTimeout(1500);
  const canvas = page.locator('canvas');
  if (await canvas.count() > 0) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 30, box.y + 40);
      await page.mouse.down();
      await page.mouse.move(box.x + 80, box.y + 30);
      await page.mouse.move(box.x + 140, box.y + 70);
      await page.mouse.move(box.x + 200, box.y + 40);
      await page.mouse.up();
    }
  }
  await page.waitForTimeout(8000);

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const destAssets = path.join(assetsDir, 'v2-vistoria.webm');
    const destPublic = path.join(publicDir, 'v2-vistoria.webm');
    fs.copyFileSync(videoPath, destAssets);
    fs.copyFileSync(videoPath, destPublic);
    console.log(`✅ V2 salvo em ${destAssets} e ${destPublic}`);
  }
})();

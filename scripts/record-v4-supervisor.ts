import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE = 'https://propostalote15.metriclab.com.br';

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

  // CENA 1 — Painel KPIs
  console.log('▶️ [V4] Acessando Painel do Supervisor...');
  await page.goto(`${BASE}/supervisor`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // CENA 2 — Scroll suave para o Mapa e Feed
  console.log('▶️ [V4] Rolando para feed e mapa linear...');
  await page.evaluate(() => window.scrollBy({ top: 420, behavior: 'smooth' }));
  await page.waitForTimeout(4000);

  // Clicar em um trecho do mapa para inspecionar
  const trechoSegment = page.locator('text=T01, text=T02').first();
  if (await trechoSegment.count() > 0) {
    await trechoSegment.click();
    await page.waitForTimeout(1500);
  }

  // CENA 3 — Scroll para o feed detalhado
  console.log('▶️ [V4] Rolando para os cards do feed...');
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'smooth' }));
  await page.waitForTimeout(4000);

  // CENA 4 — Abrir modal de detalhes
  console.log('▶️ [V4] Abrindo modal de detalhes...');
  const detailBtn = page.locator('text=Ver detalhes, button:has-text("Analisar")').first();
  if (await detailBtn.count() > 0) {
    await detailBtn.click();
    await page.waitForTimeout(6000);
  } else {
    await page.waitForTimeout(6000);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const destAssets = path.join(assetsDir, 'v4-supervisor.webm');
    const destPublic = path.join(publicDir, 'v4-supervisor.webm');
    fs.copyFileSync(videoPath, destAssets);
    fs.copyFileSync(videoPath, destPublic);
    console.log(`✅ V4 salvo em ${destAssets} e ${destPublic}`);
  }
})();

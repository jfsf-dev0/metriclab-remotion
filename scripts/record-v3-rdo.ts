import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE = 'https://rdo.metriclab.com.br';

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
  console.log('▶️ [V3] Acessando Splash RDO...');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.click('text=ENTRAR');

  // CENA 2 — Login
  console.log('▶️ [V3] Efetuando login...');
  await page.waitForURL(/\/login/, { timeout: 10000 });
  await page.waitForTimeout(1000);

  const demoPill = page.locator('button:has-text("Carlos"), button:has-text("RDO001")').first();
  if (await demoPill.count() > 0) {
    await demoPill.click();
    await page.waitForTimeout(500);
  } else {
    await page.locator('#nome, input[placeholder*="Carlos"]').fill('Carlos Encarregado');
    await page.waitForTimeout(300);
    await page.locator('#chave, input[type="password"]').fill('RDO001');
    await page.waitForTimeout(300);
  }
  await page.click('button[type="submit"]');

  // CENA 3 — Menu
  console.log('▶️ [V3] Acessando menu...');
  await page.waitForURL(/\/menu/, { timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.click('text=Relatório Diário de Obra');

  // CENA 4 — Passo 1 (turno + clima)
  console.log('▶️ [V3] Passo 1 (identificação & clima)...');
  await page.waitForURL(/\/rdo\/novo/, { timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.click('text=Manhã');
  await page.waitForTimeout(800);
  await page.locator('button:has-text("Próximo")').click();

  // CENA 5 — Passo 2 equipe
  console.log('▶️ [V3] Passo 2 (equipe)...');
  await page.waitForTimeout(1500);
  const addExemploBtn = page.locator('button:has-text("+ Antônio"), button:has-text("+ Sebastião")').first();
  if (await addExemploBtn.count() > 0) {
    await addExemploBtn.click();
    await page.waitForTimeout(800);
  }
  await page.locator('button:has-text("Próximo")').click();

  // CENA 6 — Passo 3 máquinas
  console.log('▶️ [V3] Passo 3 (máquinas)...');
  await page.waitForTimeout(1500);
  const operandoBtns = page.locator('button:has-text("Operando")');
  const mCount = await operandoBtns.count();
  for (let i = 0; i < Math.min(3, mCount); i++) {
    await operandoBtns.nth(i).click();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(600);
  await page.locator('button:has-text("Próximo")').click();

  // CENA 7 — Passo 4 fotos + atividades
  console.log('▶️ [V3] Passo 4 (atividades & fotos)...');
  await page.waitForTimeout(1500);
  await page.fill(
    'textarea',
    'Concretagem da laje do bloco A e escavação de fundação no km 14+200. Execução conforme cronograma.'
  );
  await page.waitForTimeout(800);

  // Upload simulado de foto para habilitar avanço
  const dummyPixel = Buffer.from(
    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
    'base64'
  );
  const fileInputs = page.locator('input[type="file"]');
  if (await fileInputs.count() > 0) {
    try {
      await fileInputs.last().setInputFiles({
        name: 'obra.jpg',
        mimeType: 'image/jpeg',
        buffer: dummyPixel,
      });
      await page.waitForTimeout(2000);
    } catch (e) {
      console.warn('Foto upload fallback');
    }
  }

  const proxBtn = page.locator('button:has-text("Próximo")');
  if (await proxBtn.isEnabled()) {
    await proxBtn.click();
  }

  // CENA 8 — Passo 5 assinatura
  console.log('▶️ [V3] Passo 5 (assinatura digital)...');
  await page.waitForTimeout(1500);
  const canvas = page.locator('canvas');
  if (await canvas.count() > 0) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 40, box.y + 50);
      await page.mouse.down();
      await page.mouse.move(box.x + 90, box.y + 30);
      await page.mouse.move(box.x + 150, box.y + 80);
      await page.mouse.move(box.x + 220, box.y + 45);
      await page.mouse.up();
    }
  }

  await page.waitForTimeout(8000);

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const destAssets = path.join(assetsDir, 'v3-rdo.webm');
    const destPublic = path.join(publicDir, 'v3-rdo.webm');
    fs.copyFileSync(videoPath, destAssets);
    fs.copyFileSync(videoPath, destPublic);
    console.log(`✅ V3 salvo em ${destAssets} e ${destPublic}`);
  }
})();

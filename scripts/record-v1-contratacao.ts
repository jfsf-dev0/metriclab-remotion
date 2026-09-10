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

  console.log('▶️ [V1] Acessando /contratacao...');
  await page.goto(`${BASE}/contratacao`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Preencher formulário animadamente
  const nomeInput = page.locator('input[placeholder*="Carlos"], input[type="text"]').first();
  await nomeInput.click();
  const nome = 'João Silva';
  for (const char of nome) {
    await nomeInput.pressSequentially(char, { delay: 70 });
  }
  await page.waitForTimeout(400);

  const telInput = page.locator('input[type="tel"]').first();
  await telInput.click();
  const tel = '11987654321';
  for (const char of tel) {
    await telInput.pressSequentially(char, { delay: 60 });
  }
  await page.waitForTimeout(400);

  const telGestorInput = page.locator('input[type="tel"]').nth(1);
  await telGestorInput.click();
  const telG = '11912345678';
  for (const char of telG) {
    await telGestorInput.pressSequentially(char, { delay: 60 });
  }
  await page.waitForTimeout(400);

  const empresaInput = page.locator('input[placeholder*="Consórcio"], input[type="text"]').nth(1);
  await empresaInput.fill('Consórcio Lote 15');
  await page.waitForTimeout(300);

  const cargoInput = page.locator('input[placeholder*="Cargo"], input[placeholder*="Operador"], input[type="text"]').last();
  await cargoInput.fill('Analista de Planejamento');
  await page.waitForTimeout(1500);

  // Submeter
  console.log('▶️ [V1] Submetendo formulário...');
  await page.click('button[type="submit"]');

  // Aguardar transição para a página do tracker
  try {
    await page.waitForURL(/\/contratacao\/.+/, { timeout: 10000 });
    console.log('▶️ [V1] Tracker carregado, gravando fases...');
  } catch (e) {
    console.warn('URL transition timeout, continuing recording...');
  }

  // Grava o tracker por tempo suficiente para preencher o vídeo
  await page.waitForTimeout(15000);

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const destAssets = path.join(assetsDir, 'v1-contratacao.webm');
    const destPublic = path.join(publicDir, 'v1-contratacao.webm');
    fs.copyFileSync(videoPath, destAssets);
    fs.copyFileSync(videoPath, destPublic);
    console.log(`✅ V1 salvo em ${destAssets} e ${destPublic}`);
  }
})();

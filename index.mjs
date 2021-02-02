import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const bufferScript = fs.readFileSync(path.resolve('buffer.min.js')).toString();

const config = {
  headless: false,
  args: [
    '--disable-sync',
    '--mute-audio',
    '--no-pings',
    '--no-default-browser-check',
    '--disable-speech-api',
    '--disable-extensions',
    '--single-process',
    '--no-sandbox', 
    '--disable-setuid-sandbox',
  ],
};

let browser;
const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
try {
  browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 });
  await page.waitForTimeout(5000);
  await page.addScriptTag({ content: bufferScript });
  const embed = await page.$('embed[type="application/pdf"]');
  if (embed) {
    const result = await page.evaluate(async (url) => { 
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return buffer.Buffer.from(arrayBuffer).toString('binary');
    }, url);
    fs.writeFileSync('test.pdf', Buffer.from(result, 'binary'));
    console.log('pdf downloaded');
  } else {
    console.log('pdf not embeded in url');
  }
} catch (err) {
  throw err;
} finally {
  if (browser) {
    await browser.close();
  }
}

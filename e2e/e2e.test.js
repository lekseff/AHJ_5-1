import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('popOver', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 300,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test.each([
    ['top'],
    ['right'],
    ['bottom'],
    ['left'],
  ])('Появление %s', async (position) => {
    await page.goto(baseUrl);
    const button = await page.$(`[data-position=${position}]`);
    await button.click();
    await page.waitForSelector('.popover');
  });

  test.each([
    ['top'],
    ['right'],
    ['bottom'],
    ['left'],
  ])('Появление и закрытие окна %s', async (position) => {
    await page.goto(baseUrl);
    const button = await page.$(`[data-position=${position}]`);
    await button.click();
    await page.waitForSelector('.popover');
    await button.click();
    const isPopover = await page.$('.popover');
    expect(isPopover).toBeFalsy();
  });
});

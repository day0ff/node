const puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://translate.yandex.by/');
    await page.setViewport({width: 1080, height: 500})
    await page.screenshot({path: 'yandex.png'});

    await browser.close();
}

getPic();
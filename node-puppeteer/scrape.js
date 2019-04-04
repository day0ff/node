const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.waitFor(1000);
    // Код для скрапинга
    const result = await page.evaluate(() => {
        // что-нибудь возвращаем
        let li = Array.from(document.querySelectorAll('ol > li'));
        return li.map(element => {
            let title = element.querySelector('h3').textContent;
            let price = element.querySelector('.price_color').textContent;
            return {title: title, price: price};
        });
    });
    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Получилось!
});
const {Builder, By, Key, until} = require('selenium-webdriver');

new Builder().forBrowser('firefox').build().then(async (driver) => {

    await driver.get('https://s28-bg.bitefight.gameforge.com/city/grotte');
    driver.executeScript(`document.querySelector('input[name="user"]').value = 'username'`);
    driver.executeScript(`document.querySelector('input[name="pass"]').value = 'pass`);
    
    driver.executeScript(`document.querySelector('input[type="submit"]').click()`);

    await new Promise(r => setTimeout(r, 1000)); 

    // driver.executeScript(`document.querySelector('a[href="https://s28-bg.bitefight.gameforge.com:443/city/index"]')`)

    await new Promise(r => setTimeout(r, 1000)); 


    await driver.get('https://s28-bg.bitefight.gameforge.com/city/grotte');

    await new Promise(r => setTimeout(r, 1000)); 

    let health = null;
    

    while (true) {
        await new Promise(r => setTimeout(r, 1000)); 

        health = await driver.executeScript(`return Number.parseFloat(document.querySelector('img[src="/img/symbols/ap.gif"]').nextSibling.data.split('/')[0].trim())`);
        
        console.log(health)
        if (health < 7.0) {
            console.log('break, go to church');
            await driver.get('https://s28-bg.bitefight.gameforge.com/city/church');        
            await new Promise(r => setTimeout(r, 1000)); 

            await driver.executeScript(`document.querySelector('input[type="submit"]').click()`);
            await new Promise(r => setTimeout(r, 1000)); 

            health = await driver.executeScript(`return Number.parseFloat(document.querySelector('img[src="/img/symbols/ap.gif"]').nextSibling.data.split('/')[0].trim())`);

            if (health < 7.0) {
                break;
            }

            await driver.get('https://s28-bg.bitefight.gameforge.com/city/grotte');
        }
        
        driver.executeScript(`document.querySelector('input[value="Трудна"]').click()`);
        await driver.get('https://s28-bg.bitefight.gameforge.com/city/grotte');

    }
    // console.log(await driver.executeScript(`document.querySelector('img[src="/img/symbols/ap.gif"]')`));
    // const health = document.querySelector('img[src="/img/symbols/ap.gif"]').nextSibling.data.split('/')[1]
})
.catch((err) => {
    console.log(err)
})


// driver.get('http://www.google.com/ncr').then(() => {
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// });    


// (async function example() {
//   try {
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//     await driver.quit();
//   }
// })();

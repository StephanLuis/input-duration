const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver')

// import capabilities add name, project
const aC = require('../BScapabilities/AllCaps');
const { testURL } = require("../TestURLs/inputDurationTestURLs");

console.log(testURL().ReleaseNPMgithub);

// filter out iOS

// allCaps.allCapabilities()[0]['bstack:opti


// remove iPhone because of the Appium bug

yesNumeric = aC.allCapabilities().filter(element => !element['bstack:options'].deviceName?.includes('iPhone'));


yesNumeric.forEach(element => {

    element.project = 'Add Os';
    element.name = '0 placeholders are added';

    console.log(element);

    runTestWithCaps(element);

});

async function runTestWithCaps(capabilities) {
    let driver = new webdriver.Builder()
        .usingServer('')
        .withCapabilities(capabilities)
        .build();

    var bobValue;

    try {
        await driver.get(testURL().ReleaseNPMgithub);


        var sbb = await driver.findElement(By.id('bob')).getShadowRoot();

        console.log('Finding shadow elements must be separate "await"');

        var x = await sbb.findElement(By.css('input'));

        await x.click();
        await x.sendKeys('777777777');

        bobValue = await driver.executeScript('return document.querySelector("#bob").value');

        console.log(bobValue);

        if (bobValue !== '77:07:07.777') {
            throw new Error('Keying 7777777 did not produce 77:07:07.777, TEST FAILED: ' + bobValue);
        }


        console.log('Test Passed');

        //marking the test as Passed
        await driver.executeScript(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "The add 0s test passed."}}'
        );



    } catch (e) {

        //marking the test as Failed
        console.log("Error:", e.message)

        await driver.executeScript(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","The add 0s test failed."}}'
        );

        await driver.quit();
    }

    await driver.quit();

}
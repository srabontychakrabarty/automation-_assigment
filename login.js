// test_locked_out_user.js
const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Login with locked_out_user', function () {
    let driver;

    beforeEach(async function () {
      console.log('Initializing driver...');
        driver = await new Builder().forBrowser('chrome').build();
        this.timeout(200000);
        console.log('Driver initialized. Navigating to URL...');
        await driver.get('https://www.saucedemo.com/');
        console.log('URL navigated. Waiting for title...');
        await driver.wait(until.titleIs('Swag Labs'), 200000);
        console.log('Page loaded successfully.');
    },200000);

    afterEach(async function () {
        await driver.quit();
    });

    it('should display error message for locked_out_user', async function () {
        const usernameInput = await driver.findElement(By.xpath('//input[@placeholder="Username"]'));
        const passwordInput = await driver.findElement(By.xpath('//input[@placeholder="Password"]'));
        const loginButton = await driver.findElement(By.xpath('//input[@class="submit-button btn_action"]'));

        await usernameInput.sendKeys('locked_out_user');
        await passwordInput.sendKeys('secret_sauce');
        await loginButton.click();

      const errorMessage = await driver.findElement(By.xpath('//div[@class="error-message-container error"]'));
        const errorMessageText = await errorMessage.getText();

        expect(errorMessageText).to.equal('Epic sadface: Sorry, this user has been locked out.');
    });
});
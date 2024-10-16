const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

//const mocha = require('mocha');
chai.use(chaiAsPromised);

describe('Login with standard_user, add items to cart, and complete purchase journey', () => {
  let driver;

  beforeEach(async () => {
    try{
        console.log('Initializing driver...');
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 200000 });
        //this.timeout(200000);
        console.log('Driver initialized. Navigating to URL...');
        await driver.get('https://www.saucedemo.com/');
        console.log('URL navigated. Waiting for title...');
        await driver.wait(until.titleIs('Swag Labs'), 200000);
        console.log('Page loaded successfully.');
    } catch (error) {
            console.error('Error in before hook:', err);
    }
    //document()

  },200000);

  afterEach(async () => {
    await driver.quit();
  });

  it('should complete purchase journey', async () => {
    await driver.findElement(By.xpath('//input[@placeholder="Username"]')).sendKeys('standard_user');
    await driver.findElement(By.xpath('//input[@placeholder="Password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.xpath('//input[@class="submit-button btn_action"]')).click();
    await driver.findElement(By.xpath('//button[@id="react-burger-menu-btn"]')).click();
    await driver.findElement(By.xpath('//a[@id="reset_sidebar_link"]')).click();
    await driver.findElement(By.id('item_4_title_link')).click();
    await driver.findElement(By.id('item_0_title_link')).click();
    await driver.findElement(By.id('item_1_title_link')).click();
    await driver.findElement(By.id('shopping_cart_container')).click();
    await driver.findElement(By.id('checkout')).click();
    //Navigate to final checkout page
    await driver.findElement(By.xpath('//input[@palceholder="First Name"]')).sendKeys('John');
    await driver.findElement(By.xpath('//input[@paceholder="Last Name"]')).sendKeys('Doe');
    await driver.findElement(By.xpath('//input[@placeholdr="Zip/Postal Code"]')).sendKeys('12345');
    await driver.findElement(By.xpath('//input[@placeholder="submit-button btn btn_primary cart_button btn_action"]')).click();
    await driver.findElement(By.id('finish')).click();
    const productNames = await driver.findElements(By.xpath('//div[@class="inventory_item_name"]'));
    const totalPrice = await driver.findElement(By.xpath('//div[@class="summary_subtotal_label"]'));
    expect(productNames.length).toBe(3);
    expect(totalPrice.getText()).toContain('Total: $');
    await driver.findElement(By.id('finish')).click();
    const successMessage = await driver.findElement(By.xpath('//h[@class="complete-header"]'));
    expect(successMessage.getText()).toContain('THANK YOU FOR YOUR ORDER');
    await driver.findElement(By.xpath('//button[@id="react-burger-menu-btn"]')).click();
    await driver.findElement(By.xpath('//a[@id="reset_sidebar_link"]')).click();
    await driver.findElement(By.id('logout_sidebar_link')).click();
  });
});
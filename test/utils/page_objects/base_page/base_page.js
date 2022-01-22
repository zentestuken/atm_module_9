const Element = require('../base_elements/base_element');
const Header = require('./header');
const Footer = require('./footer');
const FeedbackWindow = require('./feedbackWindow');
const InputField = require('./inputField');
const logger = require('../../../../config/log4js.conf');

/**
 * @class BasePage
 */
class BasePage {
  /**
   * Creates an instance of BasePage.
   * @memberof BasePage
   */
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.feedbackButton = new Element('Feedback Button',
        'css', '.ask-question__button');
    this.feedbackWindow = new FeedbackWindow();
    this.inputField = new InputField();
  }
  /**
   * @param {number} milliseconds
   * @return {Promise}
   * @memberof BasePage
   */
  wait(milliseconds) {
    logger.debug(`Waiting for ${milliseconds} ms`);
    return browser.sleep(milliseconds);
  }
  /**
   * @return {Promise<string>}
   * @memberof BasePage
   */
  async getCurrentUrl() {
    const currentUrl = await browser.getCurrentUrl();
    logger.debug(`Current page url is "${currentUrl}"`);
    return currentUrl;
  }
  /**
   *@param {string} url
   * @return {Promise}
   * @memberof BasePage
   */
  open(url) {
    logger.info(`---------------- Going to "${url}" ----------------`);
    return browser.get(url);
  }
  /**
   * @param {string} languageName
   * @memberof BasePage
   */
  async setLanguage(languageName) {
    const url = await this.getCurrentUrl();
    let languageCode = '';
    switch (languageName) {
      case 'English': languageCode = 'en';
        break;
      case 'Русский': languageCode = 'ru';
        break;
      case 'Українська': languageCode = 'ua';
        break;
    }
    if (!url.includes(`lang=${languageCode}`)) {
      await new Element('Language Menu Button', 'css',
          '.location-selector__globe').click();
      // eslint-disable-next-line max-len
      await new Element(`Language Link (${languageName})`, 'xpath', `//*[contains(@class, "location-selector__item")]/*[text()[contains(.,"${languageName}")]]`)
          .click();
    }
  }
  /**
   * @return {Promise}
   * @memberof BasePage
   */
  scrollToEnd() {
    logger.debug('Scrolling to end of page');
    return browser.executeScript('window.scrollTo(0,10000);');
  }
  /**

   * @memberof BasePage
   */
  async acceptCookies() {
    const cookieMessage = new Element('Accept Cookies Button',
        'css', '.cookie-modal__action');
    if (await this.checkIfElementDisplayed(cookieMessage)) {
      await cookieMessage.click();
    };
  }
  /**
   * @param {*} element
   * @return {Promise<boolean>}
   * @memberof BasePage
   */
  async checkIfElementDisplayed(element) {
    const isDisplayed = await element.isDisplayed();
    if (!isDisplayed) {
      // eslint-disable-next-line max-len
      logger.warn(`Checking if "${element.elementName}" is displayed: ${isDisplayed}`);
    } else {
      // eslint-disable-next-line max-len
      logger.debug(`Checking if "${element.elementName}" is displayed: ${isDisplayed}`);
    }
    return isDisplayed;
  }
  /**
   * @param {number} pixels
   * @return {Promise}
   * @memberof BasePage
   */
  scrollDown(pixels) {
    logger.debug(`Scrolling by ${pixels} px down`);
    return browser.executeScript(`window.scrollBy(0, ${pixels})`);
  }
  /**
   * @return {Promise}
   * @memberof BasePage
   */
  openFeedbackWindow() {
    return this.feedbackButton.click();
  }
  /**
   * @param {*} field element
   * @return {Promise}
   * @memberof feedbackWindow
   */
  async cutTextFromField(field) {
    logger.debug(`Selecting text in "${field.elementName}" field`);
    await browser.actions().click(field.element)
        .keyDown(protractor.Key.CONTROL).sendKeys('a')
        .keyUp(protractor.Key.CONTROL).perform();
    logger.info(`Cutting text from "${field.elementName}" field`);
    return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('x')
        .keyUp(protractor.Key.CONTROL).perform();
  }
  /**
   * @param {*} field element
   * @memberof BasePage
   * @return {Promise}
   */
  async pasteTextInField(field) {
    await browser.actions().mouseMove(field.element).mouseDown().perform();
    logger.info(`Pasting text in "${field.elementName}" field`);
    return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('v')
        .keyUp(protractor.Key.CONTROL).perform();
  }
}


module.exports = BasePage;

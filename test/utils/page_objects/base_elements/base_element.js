const helpers = require('../../helpers');
const logger = require('../../../../config/log4js.conf');

/**
 * @class Element
 */
class Element {
  /**
   * Creates an instance of Element.
   * @param {string} elementName name of the element
   * @param {string} selectorType 'xpath', 'css'
   * @param {string} selector
   * @memberof Element
   */
  constructor(elementName, selectorType, selector) {
    switch (selectorType) {
      case 'xpath': this.element = element(by.xpath(selector));
        break;
      case 'css': this.element = element(by.css(selector));
        break;
      case 'repeater': this.element = element(by.repeater(selector));
        break;
      case 'model': this.element = element(by.model(selector));
        break;
    }
    this.elementName = elementName;
  }
  /**
   * @return {Promise}
   * @memberof Element
   */
  async click() {
    const element = this.element;
    await helpers.highlightWithJS(element, `element "${this.elementName}"`);
    logger.info(`Clicking "${this.elementName}"`);
    return element.click();
  }
  /**
   * @return {Promise<string>}
   * @memberof Element
   */
  async getText() {
    const elementText = await this.element.getText();
    log.info(`"${this.elementName}" element text is "${elementText}"`);
    return elementText;
  }
  /**
   * @return {Promise<boolean>}
   * @memberof Element
   */
  async isDisplayed() {
    const isDisplayed = await this.element.isDisplayed();
    return isDisplayed;
  }
  /**
   * @param {string} text
   * @return {Promise}
   * @memberof Element
   */
  type(text) {
    logger.info(`Inputting text "${text}" in element "${this.elementName}"`);
    return browser.actions().click(this.element).sendKeys(text).perform();
  }
}


module.exports = Element;

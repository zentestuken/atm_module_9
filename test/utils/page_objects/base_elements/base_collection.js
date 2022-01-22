const helpers = require('../../helpers');
const logger = require('../../../../config/log4js.conf');

/**
 * @class Collection
 */
class Collection {
  /**
   * Creates an instance of Collection.
   * @param {string} collectionName
   * @param {string} selectorType
   * @param {string} selector
   * @memberof Collection
   */
  constructor(collectionName, selectorType, selector) {
    switch (selectorType) {
      case 'xpath': this.collection = element.all(by.xpath(selector));
        break;
      case 'css': this.collection = element.all(by.css(selector));
        break;
      case 'repeater': this.collection = element.all(by.repeater(selector));
        break;
      case 'model': this.collection = element.all(by.model(selector));
        break;
    }
    this.collectionName = collectionName;
  }
  /**
   * @return {Promise<number>}
   * @memberof Collection
   */
  async getCount() {
    const count = await this.collection.count();
    logger.info(`Collection "${this.collectionName}" has ${count} element(s)`);
    return count;
  }
  /**
   * @return {Promise<string[]>}
   * @memberof Collection
   */
  async getTexts() {
    const texts = await this.collection.getText();
    logger.info(`Collection "${this.collectionName}" has texts "${texts}"`);
    return texts;
  }
  /**
   * @param {string[]} expectedTextsArray
   * @param {boolean} upperCase (optional)
   * @return {Promise<boolean>}
   * @memberof Collection
   */
  async verifyTexts(expectedTextsArray, upperCase) {
    let areVerified = false;
    const actualTextsArray = await this.getTexts();
    if (!upperCase) {
      areVerified = helpers
          .compareTextArrays(actualTextsArray, expectedTextsArray);
    } else {
      areVerified = helpers.compareTextArrays(actualTextsArray,
          expectedTextsArray.map((text) => text.toUpperCase()));
    }
    if (areVerified) {
      // eslint-disable-next-line max-len
      logger.debug(`Collection "${this.collectionName}" texts should be "${expectedTextsArray}"`);
      // eslint-disable-next-line max-len
      logger.info(`Verifying that collection "${this.collectionName}" texts are correct: ${areVerified}`);
    } else {
      // eslint-disable-next-line max-len
      logger.debug(`Collection "${this.collectionName}" texts should be "${expectedTextsArray}"`);
      // eslint-disable-next-line max-len
      logger.warn(`Verifying that collection "${this.collectionName}" texts are correct: ${areVerified}`);
    }
    return areVerified;
  }
  /**
   * @param {string} textToClick
   * @return {Promise}
   * @memberof Collection
   */
  async clickElementByText(textToClick) {
    const arrayOfElementTexts = await this.collection.getText();
    const elementToClickIndex = arrayOfElementTexts.indexOf(textToClick);
    if (elementToClickIndex === -1) {
      throw new Error(`Element with text "${textToClick}" not found`);
    }
    const element = await this.collection.get(elementToClickIndex);
    await helpers.highlightWithJS(element,
        // eslint-disable-next-line max-len
        `element with text "${textToClick}" of collection "${this.collectionName}"`);
    // eslint-disable-next-line max-len
    logger.info(`Clicking element with text "${textToClick}" of collection "${this.collectionName}"`);
    return element.click();
  }
  /**
   * @param {string[]} texts
   * @memberof Collection
   */
  async clickAllByTexts(texts) {
    for (const text of texts) {
      await this.clickElementByText(text);
    }
  }
  /**
   * @param {string} expectedText
   * @return {Promise<boolean>}
   * @memberof Collection
   */
  async checkEachTextEquals(expectedText) {
    const actualTextsArray = await this.getTexts();
    const eachTextEquals =
        helpers.arrayContainsOnly(actualTextsArray, expectedText);
    if (eachTextEquals) {
      // eslint-disable-next-line max-len
      logger.info(`Checking all elements in collection "${this.collectionName}" have text "${expectedText}": ${eachTextEquals}`);
    } else {
      // eslint-disable-next-line max-len
      logger.warn(`Checking all elements in collection "${this.collectionName}" have text "${expectedText}: ${eachTextEquals}"`);
    }
    return eachTextEquals;
  }
}


module.exports = Collection;

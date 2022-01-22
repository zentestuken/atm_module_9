const Element = require('../base_elements/base_element');
const logger = require('../../../../config/log4js.conf');

/**
 * @class InputField
 * @extends {Element}
 */
class InputField extends Element {
  /**
   * Creates an instance of InputField.
   * @param {string} elementName
   * @param {string} selectorType
   * @param {string} selector
   * @memberof InputField
   */
  constructor(elementName, selectorType, selector) {
    super(elementName, selectorType, selector);
  }
  /**
   * @return {Promise<string>}
   * @memberof Element
   */
  async getTextFromInput() {
    const textFromInput = await this.element.getAttribute('value');
    // eslint-disable-next-line max-len
    logger.info(`Input field "${this.elementName}" contains text: "${textFromInput}"`);
    return textFromInput;
  }
}


module.exports = InputField;

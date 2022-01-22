const logger = require('../../config/log4js.conf');

/**
 * @param {string[]} textsArray
 * @param {string[]} expectedTextsArray
 * @return {boolean}
 */
function compareTextArrays(textsArray, expectedTextsArray) {
  if (textsArray.length === expectedTextsArray.length) {
    return textsArray
        .every((text, counter) => text === expectedTextsArray[counter]);
  } else return false;
}
/**
 * @param {string[]} textsArray
 * @param {string} expectedText
 * @return {boolean}
 */
function arrayContainsOnly(textsArray, expectedText) {
  return textsArray.every((text) => text === expectedText);
}

/**
 * @param {*} el
 *  @param {*} elementName
 * @return {*}
 */
async function highlightWithJS(el, elementName) {
  const originalColor = await el.getCssValue('backgroundColor');
  const bgColor = originalColor;
  await browser.executeScript(
      'arguments[0].style.backgroundColor = \'' + 'red' + '\'', el);
  await browser.sleep(700);
  logger.debug(`Highlighting ${elementName} with red color`);
  return browser.executeScript(
      'arguments[0].style.backgroundColor = \'' + bgColor + '\'', el);
}


module.exports = {compareTextArrays, arrayContainsOnly, highlightWithJS};

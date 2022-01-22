const Element = require('../base_elements/base_element');
const Collection = require('../base_elements/base_collection');

/**
 * @class Header
 * @extends {Element}
 */
class Header extends Element {
  /**
   * Creates an instance of Header.
   * @memberof Header
   */
  constructor() {
    super('Footer', 'css', 'footer');
    this.links =
        new Collection('Footer links', 'css', '.footer-nav__item');
  }
}


module.exports = Header;

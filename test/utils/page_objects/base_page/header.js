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
    super('Header', 'css', 'header');
    this.menuItems =
        new Collection('Header Menu Items', 'css', '.main-nav__item');
  }
}


module.exports = Header;

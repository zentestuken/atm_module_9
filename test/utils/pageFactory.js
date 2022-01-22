const BasePage = require('./page_objects/base_page/base_page');
const HomePage = require('./page_objects/home_page');
const BlogPage = require('./page_objects/blog_page');

/**
 * @class PageFactory
 */
class PageFactory {
  /**
   * @static
   * @param {string} pageName
   * @return {*} page
   * @memberof PageFactory
   */
  static getPage(pageName) {
    switch (pageName) {
      case 'Home': return new HomePage();
      case 'Blog': return new BlogPage();
      default: return new BasePage();
    }
  }
}


module.exports = PageFactory;

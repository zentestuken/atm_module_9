const BasePage = require('./base_page/base_page');
const Element = require('./base_elements/base_element');
const Collection = require('./base_elements/base_collection');

/**
 * @class BlogPage
 * @extends {BasePage}
 */
class BlogPage extends BasePage {
  /**
   * Creates an instance of BlogPage.
   * @memberof BlogPage
   */
  constructor() {
    super();
    this.categories =
        new Collection('Post Categories', 'repeater', 'category in categories');
    this.categoryLabelsInPosts =
        new Collection('Post Category Labels', 'css', '.news__item-category');
    this.ourSkills = new Collection('Our Skills Panels', 'repeater',
        'skill in skills | orderBy: \'Name\'');
    this.posts = new Collection('Posts', 'repeater', 'newsItem in news');
    this.viewMoreButton = new Element('View More Button',
        'css', '.news__view-more-button');
  }
  /**
   * @return {Promise}
   * @memberof BlogPage
   */
  open() {
    return super.open('https://training.by/#!/News');
  }
}


module.exports = BlogPage;

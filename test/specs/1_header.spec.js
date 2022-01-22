const expect = require('chai').expect;
const PageFactory = require('../utils/pageFactory');
let page;

describe('Page header', function() {
  beforeEach(async function() {
    browser.manage().window().maximize();
    page = PageFactory.getPage('Home');
    await page.open();
    await page.setLanguage('English');
    // await page.wait(2000);
  });

  it('should have 4 menu items', async function() {
    const countOfMenuItems = await page
        .header.menuItems.getCount();
    expect(countOfMenuItems).to.equal(4);
  });

  it('menu items should have correct titles', async function() {
    const expectedMenuItemsTitles = ['TRAINING LIST', 'ABOUT', 'BLOG', 'FAQ'];
    const titlesAreCorrect = await page
        .header.menuItems.verifyTexts(expectedMenuItemsTitles);
    expect(titlesAreCorrect).to.be.true;
  });
});

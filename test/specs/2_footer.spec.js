const expect = require('chai').expect;
const PageFactory = require('../utils/pageFactory');
let page;

describe('Page footer', function() {
  beforeEach(async function() {
    browser.manage().window().maximize();
    page = PageFactory.getPage('Home');
    await page.open();
    await page.setLanguage('English');
    await page.acceptCookies();
    await page.scrollToEnd();
  });

  it('should have 4 links', async function() {
    const countOfLinks = await page
        .footer.links.getCount();
    expect(countOfLinks).to.equal(4);
  });

  it('links should have correct titles', async function() {
    const expectedLinksTitles =
        ['INVESTOR RELATIONS', 'CONTACT', 'PRIVACY POLICY', 'PRIVACY NOTICE'];
    const titlesAreCorrect = await page
        .footer.links.verifyTexts(expectedLinksTitles);
    expect(titlesAreCorrect).to.be.true;
  });
});

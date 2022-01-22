const expect = require('chai').expect;
const PageFactory = require('../utils/pageFactory');
let page;

describe('Blog page', function() {
  beforeEach(async function() {
    browser.manage().window().maximize();
    page = PageFactory.getPage('Blog');
    await page.open();
    await page.setLanguage('English');
    await page.acceptCookies();
  });

  it('has 6 categories', async function() {
    const categoriesCount = await page.categories.getCount();
    expect(categoriesCount).to.equal(6);
  });

  it('categories have correct titles', async function() {
    const expectedCategoryTitles = ['NEWS', 'REAL STORIES', 'MATERIALS',
      'HARD SKILLS', 'SOFT SKILLS', 'EVENTS'];
    const titlesAreCorrect =
      await page.categories.verifyTexts(expectedCategoryTitles);
    expect(titlesAreCorrect).to.be.true;
  });

  it('has 30 items in "Our skills" section', async function() {
    const ourSkillsCount = await page.ourSkills.getCount();
    expect(ourSkillsCount).to.equal(30);
  });

  it('shows only posts from the selected category', async function() {
    await page.categories.clickElementByText('HARD SKILLS');
    const allLabelsHaveCorrectCategory =
      await page.categoryLabelsInPosts.checkEachTextEquals('HARD SKILLS');
    expect(allLabelsHaveCorrectCategory).to.be.true;
  });

  it('shows maximum 7 posts in a category by default', async function() {
    await page.categories.clickElementByText('HARD SKILLS');
    const postsCount = await page.posts.getCount();
    expect(postsCount).to.equal(7);
  });

  it('shows 7 more posts when "View more" button clicked', async function() {
    await page.categories.clickElementByText('HARD SKILLS');
    await page.viewMoreButton.click();
    const postsCount = await page.posts.getCount();
    expect(postsCount).to.equal(14);
  });
});

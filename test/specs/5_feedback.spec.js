const expect = require('chai').expect;
const PageFactory = require('../utils/pageFactory');
let page;

describe('Feedback window', function() {
  beforeEach(async function() {
    browser.manage().window().maximize();
    page = PageFactory.getPage('Home');
    await page.open();
  });

  it('cut and paste text', async function() {
    const inputText = 'Some random text in field';
    await page.openFeedbackWindow();
    await page.feedbackWindow.email.type(inputText);
    await page.cutTextFromField(page.feedbackWindow.email);
    await page.pasteTextInField(page.feedbackWindow.message);
    const textInMessageField =
        await page.feedbackWindow.message.getTextFromInput();
    expect(textInMessageField).to.equal(inputText);
  });
});

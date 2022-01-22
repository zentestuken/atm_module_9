const expect = require('chai').expect;
const PageFactory = require('../utils/pageFactory');
let page;

describe('Home page', function() {
  beforeEach(async function() {
    browser.restart();
    page = PageFactory.getPage('Home');
    await page.open();
    await page.setLanguage('English');
    await page.acceptCookies();
  });

  it('correct names for Kazakhstan cities in search filter', async function() {
    const expectedCityNames = ['Nur-Sultan', 'Karaganda', 'Almaty'];
    await page.clearLocationsButton.click();
    await page.scrollDown(500);
    await page.searchFilter.click();
    const countryOptions = await page.getCountryOptions();
    await countryOptions.clickElementByText('Kazakhstan');
    const textsAreCorrect = await page
        .cityOptions.verifyTexts(expectedCityNames);
    expect(textsAreCorrect).to.be.true;
  });

  it('correct names for Indian cities in search filter', async function() {
    const expectedCityNames =
        ['Hyderabad', 'Pune', 'Gurgaon', 'Chennai', 'Bangalore'];
    await page.clearLocationsButton.click();
    await page.scrollDown(500);
    await page.searchFilter.click();
    const countryOptions = await page.getCountryOptions();
    await countryOptions.clickElementByText('India');
    const textsAreCorrect = await page
        .cityOptions.verifyTexts(expectedCityNames);
    expect(textsAreCorrect).to.be.true;
  });

  // eslint-disable-next-line max-len
  it('shows selected location filters for trainings as applied', async function() {
    const countryInput = 'Kazakhstan';
    const citiesInput = ['Nur-Sultan', 'Karaganda'];

    await page.clearLocationsButton.click();
    await page.scrollDown(500);

    await page.searchFilter.click();
    const countryOptions = await page.getCountryOptions();
    await countryOptions.clickElementByText(countryInput);
    await page.cityOptions.clickAllByTexts(citiesInput);

    await page.searchFilter.click();

    const selectedLocationsAreShown =
        await page.selectedLocations.verifyTexts(citiesInput, true);
    expect(selectedLocationsAreShown).to.be.true;
  });

  // eslint-disable-next-line max-len
  it('shows selected skills filters for trainings as applied', async function() {
    const skillsInput = ['Automated Testing', 'Data & Analytics'];

    await page.clearLocationsButton.click();
    await page.scrollDown(500);

    await page.searchFilter.click();
    await page.getCountryOptions();
    await page.skillsTabButton.click();
    await page.skillOptions.clickAllByTexts(skillsInput);

    await page.searchFilter.click();

    const selectedSkillsAreShown =
        await page.selectedSkills.verifyTexts(skillsInput, true);
    expect(selectedSkillsAreShown).to.be.true;
  });

  it('shows selected types filters for trainings as applied', async function() {
    const typesInput = ['Training', 'English', 'Russian'];

    await page.clearLocationsButton.click();
    await page.scrollDown(500);

    await page.searchFilter.click();
    await page.getCountryOptions();
    await page.typesTabButton.click();
    await page.typeOptions.clickAllByTexts(typesInput);

    await page.searchFilter.click();

    const selectedTypesAreShown =
        await page.selectedTypes.verifyTexts(typesInput, true);
    expect(selectedTypesAreShown).to.be.true;
  });
});

const BasePage = require('./base_page/base_page');
const Element = require('./base_elements/base_element');
const Collection = require('./base_elements/base_collection');
const EC = protractor.ExpectedConditions;

/**
 * @class HomePage
 * @extends {BasePage}
 */
class HomePage extends BasePage {
  /**
   * Creates an instance of HomePage.
   * @memberof HomePage
   */
  constructor() {
    super();
    this.searchFilter = new Element('Search Filter Button',
        'model', 'searchFilter');
    this.cityOptions = new Collection('City Options', 'repeater',
        'city in activeCountryChooseCities | filter : searchFilter');
    this.clearLocationsButton = new Element('Clear Locations Button',
        'xpath', '//*[@ng-click="clearAllLocations(totalLocationList)"]');
    this.skillsTabButton =
        new Element('Skills Tab Button',
            'xpath', '//*[@ng-click="changeTab(\'Skill\')"]');
    this.typesTabButton =
        new Element('Types Tab Button',
            'xpath', '//*[@ng-click="changeTab(\'TrainingType\')"]');
    this.skillOptions = new Collection('Skill Options', 'repeater',
        'trainingItem in trainingsNames | filter : searchFilter');
    this.typeOptions = new Collection('Type Options', 'repeater',
        'trainingTypeItem in trainingTypeList | filter : searchFilter');
    this.selectedLocations = new Collection('Selected Locations', 'repeater',
        'location in totalLocationList');
    this.selectedSkills = new Collection('Selected Skills', 'repeater',
        'skillName in selectedSkills');
    this.selectedTypes = new Collection('Selected Types', 'css',
        '.filter-type-view__training-type');
  }
  /**
   * @return {Promise}
   * @memberof HomePage
   */
  open() {
    return super.open('https://training.by');
  }
  /**
   * @return {Promise} collection of elements
   * @memberof HomePage
   */
  async getCountryOptions() {
    const collection = new Collection('Country Options', 'repeater'
        , 'locations in locationNames | orderBy: \'Name\'');
    await browser.wait(EC.visibilityOf(collection.collection.get(0)), 15000);
    return collection;
  }
}


module.exports = HomePage;

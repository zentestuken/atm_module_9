const Element = require('../base_elements/base_element');
const InputField = require('./inputField');

/**
 * @class Header
 * @extends {Element}
 */
class feedbackWindow extends Element {
  /**
   * Creates an instance of Header.
   * @memberof Header
   */
  constructor() {
    super('Feedback Window', 'css', 'modal-content');
    this.email =
        new InputField('Feedback Email field',
            'css', 'span.popup-feedback-email__field');
    this.message =
        new InputField('Feedback Message field',
            'css', '.popup-feedback-message_filed');
  }
}


module.exports = feedbackWindow;

import ExtendableError from 'es6-error';

/**
 * Specific error to indicate that an event has occurred in an invalid state. Typically, this means that some
 * required precondition has not been satisfied before the event takes place.
 */
class StateError extends ExtendableError {

  /**
   * Constructor
   *
   * @param {String} message
   */
  constructor(message) {
    super(message);
  }

}

export default StateError;
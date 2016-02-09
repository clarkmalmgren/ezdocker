import ExtendableError from 'es6-error';

class StateError extends ExtendableError {

  constructor(message) {
    super(message);
  }

}

export default StateError;
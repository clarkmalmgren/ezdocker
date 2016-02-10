'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specific error to indicate that an event has occurred in an invalid state. Typically, this means that some
 * required precondition has not been satisfied before the event takes place.
 */

var StateError = function (_ExtendableError) {
  _inherits(StateError, _ExtendableError);

  /**
   * Constructor
   *
   * @param {String} message
   */

  function StateError(message) {
    _classCallCheck(this, StateError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StateError).call(this, message));
  }

  return StateError;
}(_es6Error2.default);

exports.default = StateError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTU07Ozs7Ozs7OztBQU9KLFdBUEksVUFPSixDQUFZLE9BQVosRUFBcUI7MEJBUGpCLFlBT2lCOztrRUFQakIsdUJBUUksVUFEYTtHQUFyQjs7U0FQSTs7O2tCQWFTIiwiZmlsZSI6InN0YXRlLWVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4dGVuZGFibGVFcnJvciBmcm9tICdlczYtZXJyb3InO1xuXG4vKipcbiAqIFNwZWNpZmljIGVycm9yIHRvIGluZGljYXRlIHRoYXQgYW4gZXZlbnQgaGFzIG9jY3VycmVkIGluIGFuIGludmFsaWQgc3RhdGUuIFR5cGljYWxseSwgdGhpcyBtZWFucyB0aGF0IHNvbWVcbiAqIHJlcXVpcmVkIHByZWNvbmRpdGlvbiBoYXMgbm90IGJlZW4gc2F0aXNmaWVkIGJlZm9yZSB0aGUgZXZlbnQgdGFrZXMgcGxhY2UuXG4gKi9cbmNsYXNzIFN0YXRlRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGVFcnJvcjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

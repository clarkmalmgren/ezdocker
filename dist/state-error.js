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

    return _possibleConstructorReturn(this, (StateError.__proto__ || Object.getPrototypeOf(StateError)).call(this, message));
  }

  return StateError;
}(_es6Error2.default);

exports.default = StateError;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlLWVycm9yLmpzIl0sIm5hbWVzIjpbIlN0YXRlRXJyb3IiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7O0FBRUo7Ozs7O0FBS0Esc0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQSxtSEFDYkEsT0FEYTtBQUVwQjs7Ozs7a0JBSVlELFUiLCJmaWxlIjoic3RhdGUtZXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXh0ZW5kYWJsZUVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5cbi8qKlxuICogU3BlY2lmaWMgZXJyb3IgdG8gaW5kaWNhdGUgdGhhdCBhbiBldmVudCBoYXMgb2NjdXJyZWQgaW4gYW4gaW52YWxpZCBzdGF0ZS4gVHlwaWNhbGx5LCB0aGlzIG1lYW5zIHRoYXQgc29tZVxuICogcmVxdWlyZWQgcHJlY29uZGl0aW9uIGhhcyBub3QgYmVlbiBzYXRpc2ZpZWQgYmVmb3JlIHRoZSBldmVudCB0YWtlcyBwbGFjZS5cbiAqL1xuY2xhc3MgU3RhdGVFcnJvciBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZUVycm9yOyJdfQ==

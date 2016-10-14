'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yargs = require('yargs');

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _repository = require('./repository');

var _repository2 = _interopRequireDefault(_repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * EZDocker provides easy to use access to builder-pattern classes for building images, removing images and pushing
 * images to a docker registry. See the README for more information on how to use.
 */
var EZDocker = function () {
  _createClass(EZDocker, null, [{
    key: 'createFromArgs',


    /**
     * Creates a EZDocker using command line arguments.
     *
     * @param {{}} [args=argv] the arguments that default to those from yargs.argv
     *
     * @return {EZDocker}
     */
    value: function createFromArgs() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _yargs.argv;

      return new EZDocker(args.docker);
    }

    /**
     * Constructs a new EZDocker. See the README for valid connectionOpts. `docker` and `tarUtils` are only for use
     * in unit-testing to inject mock dependencies.
     *
     * @param {Map<String,String>} connectionOpts configures the connection method to
     * @param {Docker} [docker] used for dependency injection, if set, connectionOpts are ignored
     */

  }]);

  function EZDocker(connectionOpts, docker) {
    _classCallCheck(this, EZDocker);

    this._docker = docker || new _dockerode2.default(connectionOpts);
  }

  /**
   *
   * @param {String} name the
   * @return {Repository}
   */


  _createClass(EZDocker, [{
    key: 'repository',
    value: function repository(name) {
      return new _repository2.default(name, this._docker);
    }
  }]);

  return EZDocker;
}();

exports.default = EZDocker;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV6ZG9ja2VyLmpzIl0sIm5hbWVzIjpbIkVaRG9ja2VyIiwiYXJncyIsImRvY2tlciIsImNvbm5lY3Rpb25PcHRzIiwiX2RvY2tlciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxROzs7OztBQUVKOzs7Ozs7O3FDQU9tQztBQUFBLFVBQWJDLElBQWE7O0FBQ2pDLGFBQU8sSUFBSUQsUUFBSixDQUFhQyxLQUFLQyxNQUFsQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7QUFPQSxvQkFBWUMsY0FBWixFQUE0QkQsTUFBNUIsRUFBb0M7QUFBQTs7QUFDbEMsU0FBS0UsT0FBTCxHQUFlRixVQUFVLHdCQUFXQyxjQUFYLENBQXpCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzsrQkFLV0UsSSxFQUFNO0FBQ2YsYUFBTyx5QkFBZUEsSUFBZixFQUFxQixLQUFLRCxPQUExQixDQUFQO0FBQ0Q7Ozs7OztrQkFHWUosUSIsImZpbGUiOiJlemRvY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFyZ3YgfSBmcm9tICd5YXJncyc7XG5pbXBvcnQgRG9ja2VyIGZyb20gJ2RvY2tlcm9kZSc7XG5pbXBvcnQgUmVwb3NpdG9yeSBmcm9tICcuL3JlcG9zaXRvcnknO1xuXG4vKipcbiAqIEVaRG9ja2VyIHByb3ZpZGVzIGVhc3kgdG8gdXNlIGFjY2VzcyB0byBidWlsZGVyLXBhdHRlcm4gY2xhc3NlcyBmb3IgYnVpbGRpbmcgaW1hZ2VzLCByZW1vdmluZyBpbWFnZXMgYW5kIHB1c2hpbmdcbiAqIGltYWdlcyB0byBhIGRvY2tlciByZWdpc3RyeS4gU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gaG93IHRvIHVzZS5cbiAqL1xuY2xhc3MgRVpEb2NrZXIge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRVpEb2NrZXIgdXNpbmcgY29tbWFuZCBsaW5lIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHt7fX0gW2FyZ3M9YXJndl0gdGhlIGFyZ3VtZW50cyB0aGF0IGRlZmF1bHQgdG8gdGhvc2UgZnJvbSB5YXJncy5hcmd2XG4gICAqXG4gICAqIEByZXR1cm4ge0VaRG9ja2VyfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUZyb21BcmdzKGFyZ3MgPSBhcmd2KSB7XG4gICAgcmV0dXJuIG5ldyBFWkRvY2tlcihhcmdzLmRvY2tlcik7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBFWkRvY2tlci4gU2VlIHRoZSBSRUFETUUgZm9yIHZhbGlkIGNvbm5lY3Rpb25PcHRzLiBgZG9ja2VyYCBhbmQgYHRhclV0aWxzYCBhcmUgb25seSBmb3IgdXNlXG4gICAqIGluIHVuaXQtdGVzdGluZyB0byBpbmplY3QgbW9jayBkZXBlbmRlbmNpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7TWFwPFN0cmluZyxTdHJpbmc+fSBjb25uZWN0aW9uT3B0cyBjb25maWd1cmVzIHRoZSBjb25uZWN0aW9uIG1ldGhvZCB0b1xuICAgKiBAcGFyYW0ge0RvY2tlcn0gW2RvY2tlcl0gdXNlZCBmb3IgZGVwZW5kZW5jeSBpbmplY3Rpb24sIGlmIHNldCwgY29ubmVjdGlvbk9wdHMgYXJlIGlnbm9yZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25PcHRzLCBkb2NrZXIpIHtcbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXIgfHwgbmV3IERvY2tlcihjb25uZWN0aW9uT3B0cyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgdGhlXG4gICAqIEByZXR1cm4ge1JlcG9zaXRvcnl9XG4gICAqL1xuICByZXBvc2l0b3J5KG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkobmFtZSwgdGhpcy5fZG9ja2VyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFWkRvY2tlcjsiXX0=

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      var args = arguments.length <= 0 || arguments[0] === undefined ? _yargs.argv : arguments[0];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV6ZG9ja2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFNOzs7Ozs7Ozs7OztxQ0FTK0I7VUFBYix3RkFBYTs7QUFDakMsYUFBTyxJQUFJLFFBQUosQ0FBYSxLQUFLLE1BQUwsQ0FBcEIsQ0FEaUM7Ozs7Ozs7Ozs7Ozs7QUFXbkMsV0FwQkksUUFvQkosQ0FBWSxjQUFaLEVBQTRCLE1BQTVCLEVBQW9DOzBCQXBCaEMsVUFvQmdDOztBQUNsQyxTQUFLLE9BQUwsR0FBZSxVQUFVLHdCQUFXLGNBQVgsQ0FBVixDQURtQjtHQUFwQzs7Ozs7Ozs7ZUFwQkk7OytCQTZCTyxNQUFNO0FBQ2YsYUFBTyx5QkFBZSxJQUFmLEVBQXFCLEtBQUssT0FBTCxDQUE1QixDQURlOzs7O1NBN0JiOzs7a0JBa0NTIiwiZmlsZSI6ImV6ZG9ja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXJndiB9IGZyb20gJ3lhcmdzJztcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcbmltcG9ydCBSZXBvc2l0b3J5IGZyb20gJy4vcmVwb3NpdG9yeSc7XG5cbi8qKlxuICogRVpEb2NrZXIgcHJvdmlkZXMgZWFzeSB0byB1c2UgYWNjZXNzIHRvIGJ1aWxkZXItcGF0dGVybiBjbGFzc2VzIGZvciBidWlsZGluZyBpbWFnZXMsIHJlbW92aW5nIGltYWdlcyBhbmQgcHVzaGluZ1xuICogaW1hZ2VzIHRvIGEgZG9ja2VyIHJlZ2lzdHJ5LiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBob3cgdG8gdXNlLlxuICovXG5jbGFzcyBFWkRvY2tlciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBFWkRvY2tlciB1c2luZyBjb21tYW5kIGxpbmUgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge3t9fSBbYXJncz1hcmd2XSB0aGUgYXJndW1lbnRzIHRoYXQgZGVmYXVsdCB0byB0aG9zZSBmcm9tIHlhcmdzLmFyZ3ZcbiAgICpcbiAgICogQHJldHVybiB7RVpEb2NrZXJ9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlRnJvbUFyZ3MoYXJncyA9IGFyZ3YpIHtcbiAgICByZXR1cm4gbmV3IEVaRG9ja2VyKGFyZ3MuZG9ja2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEVaRG9ja2VyLiBTZWUgdGhlIFJFQURNRSBmb3IgdmFsaWQgY29ubmVjdGlvbk9wdHMuIGBkb2NrZXJgIGFuZCBgdGFyVXRpbHNgIGFyZSBvbmx5IGZvciB1c2VcbiAgICogaW4gdW5pdC10ZXN0aW5nIHRvIGluamVjdCBtb2NrIGRlcGVuZGVuY2llcy5cbiAgICpcbiAgICogQHBhcmFtIHtNYXA8U3RyaW5nLFN0cmluZz59IGNvbm5lY3Rpb25PcHRzIGNvbmZpZ3VyZXMgdGhlIGNvbm5lY3Rpb24gbWV0aG9kIHRvXG4gICAqIEBwYXJhbSB7RG9ja2VyfSBbZG9ja2VyXSB1c2VkIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiwgaWYgc2V0LCBjb25uZWN0aW9uT3B0cyBhcmUgaWdub3JlZFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbk9wdHMsIGRvY2tlcikge1xuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlciB8fCBuZXcgRG9ja2VyKGNvbm5lY3Rpb25PcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGVcbiAgICogQHJldHVybiB7UmVwb3NpdG9yeX1cbiAgICovXG4gIHJlcG9zaXRvcnkobmFtZSkge1xuICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeShuYW1lLCB0aGlzLl9kb2NrZXIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVaRG9ja2VyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

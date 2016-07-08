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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV6ZG9ja2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztJQU1NLFE7Ozs7Ozs7Ozs7OztxQ0FTK0I7QUFBQSxVQUFiLElBQWE7O0FBQ2pDLGFBQU8sSUFBSSxRQUFKLENBQWEsS0FBSyxNQUFsQixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OztBQVNELG9CQUFZLGNBQVosRUFBNEIsTUFBNUIsRUFBb0M7QUFBQTs7QUFDbEMsU0FBSyxPQUFMLEdBQWUsVUFBVSx3QkFBVyxjQUFYLENBQXpCO0FBQ0Q7Ozs7Ozs7Ozs7OytCQU9VLEksRUFBTTtBQUNmLGFBQU8seUJBQWUsSUFBZixFQUFxQixLQUFLLE9BQTFCLENBQVA7QUFDRDs7Ozs7O2tCQUdZLFEiLCJmaWxlIjoiZXpkb2NrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcmd2IH0gZnJvbSAneWFyZ3MnO1xuaW1wb3J0IERvY2tlciBmcm9tICdkb2NrZXJvZGUnO1xuaW1wb3J0IFJlcG9zaXRvcnkgZnJvbSAnLi9yZXBvc2l0b3J5JztcblxuLyoqXG4gKiBFWkRvY2tlciBwcm92aWRlcyBlYXN5IHRvIHVzZSBhY2Nlc3MgdG8gYnVpbGRlci1wYXR0ZXJuIGNsYXNzZXMgZm9yIGJ1aWxkaW5nIGltYWdlcywgcmVtb3ZpbmcgaW1hZ2VzIGFuZCBwdXNoaW5nXG4gKiBpbWFnZXMgdG8gYSBkb2NrZXIgcmVnaXN0cnkuIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGhvdyB0byB1c2UuXG4gKi9cbmNsYXNzIEVaRG9ja2VyIHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIEVaRG9ja2VyIHVzaW5nIGNvbW1hbmQgbGluZSBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7e319IFthcmdzPWFyZ3ZdIHRoZSBhcmd1bWVudHMgdGhhdCBkZWZhdWx0IHRvIHRob3NlIGZyb20geWFyZ3MuYXJndlxuICAgKlxuICAgKiBAcmV0dXJuIHtFWkRvY2tlcn1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVGcm9tQXJncyhhcmdzID0gYXJndikge1xuICAgIHJldHVybiBuZXcgRVpEb2NrZXIoYXJncy5kb2NrZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgRVpEb2NrZXIuIFNlZSB0aGUgUkVBRE1FIGZvciB2YWxpZCBjb25uZWN0aW9uT3B0cy4gYGRvY2tlcmAgYW5kIGB0YXJVdGlsc2AgYXJlIG9ubHkgZm9yIHVzZVxuICAgKiBpbiB1bml0LXRlc3RpbmcgdG8gaW5qZWN0IG1vY2sgZGVwZW5kZW5jaWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge01hcDxTdHJpbmcsU3RyaW5nPn0gY29ubmVjdGlvbk9wdHMgY29uZmlndXJlcyB0aGUgY29ubmVjdGlvbiBtZXRob2QgdG9cbiAgICogQHBhcmFtIHtEb2NrZXJ9IFtkb2NrZXJdIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uLCBpZiBzZXQsIGNvbm5lY3Rpb25PcHRzIGFyZSBpZ25vcmVkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uT3B0cywgZG9ja2VyKSB7XG4gICAgdGhpcy5fZG9ja2VyID0gZG9ja2VyIHx8IG5ldyBEb2NrZXIoY29ubmVjdGlvbk9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIHRoZVxuICAgKiBAcmV0dXJuIHtSZXBvc2l0b3J5fVxuICAgKi9cbiAgcmVwb3NpdG9yeShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KG5hbWUsIHRoaXMuX2RvY2tlcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRVpEb2NrZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

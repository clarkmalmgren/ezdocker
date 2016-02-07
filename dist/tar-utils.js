'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os2 = require('os');

var _os3 = _interopRequireDefault(_os2);

var _del2 = require('del');

var _del3 = _interopRequireDefault(_del2);

var _tarFs = require('tar-fs');

var _tarFs2 = _interopRequireDefault(_tarFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Utilities for generating a more complex tar stream. Specifically, this allows for putting multiple
 * source folders into a single stream with potential custom mappings. This uses a temporary file for
 * intermediate staging which will be automatically cleaned up on process exit.
 *
 * @example
 * let tarUtils = new TarUtils();
 * let stream = tarUtils.all({
 *   '/fully/qualified/path' : '.',
 *   'relative/path' : 'subfolder'
 * });
 */

var TarUtils = function () {

  /**
   * Constructor with optional injection of dependencies for purposes of testing.
   *
   * @param {function} [_del=del]
   * @param {os} [_os=os]
   * @param {tar} [_tar=tar]
   * @param {process} [_process=process]
   */

  function TarUtils() {
    var _del = arguments.length <= 0 || arguments[0] === undefined ? _del3.default : arguments[0];

    var _os = arguments.length <= 1 || arguments[1] === undefined ? _os3.default : arguments[1];

    var _tar = arguments.length <= 2 || arguments[2] === undefined ? _tarFs2.default : arguments[2];

    var _process = arguments.length <= 3 || arguments[3] === undefined ? process : arguments[3];

    _classCallCheck(this, TarUtils);

    this._del = _del;
    this._os = _os;
    this._process = _process;
    this._tar = _tar;
  }

  /**
   * Generate a single tar stream that contains multiple inputs that can be mapped to relative paths.
   *
   * @param {{String, String}} mapping a map of source folders to target relative paths
   * @return {Promise<stream.Readable, Error>} a promise that resolves with the generated combined stream
   */

  _createClass(TarUtils, [{
    key: 'all',
    value: function all(mapping) {
      var _this = this;

      var temp = this.tempFolder();
      this.autoclean(temp);

      return this.copyAll(mapping, temp).then(function () {
        return _this._tar.pack(temp);
      });
    }

    /**
     * Generate a path for a temporary file that is appropriate for the current OS.
     *
     * @return {string} full-qualified folder path
     */

  }, {
    key: 'tempFolder',
    value: function tempFolder() {
      return this._os.tmpdir() + '/tar-utils__' + Math.floor(Math.random() * 10000);
    }

    /**
     * Recursively copy files from the source mapping onto the destination baseDir applying the additional subfoldering.
     *
     * @param {Map<String, String>} mapping a map of source folders to target relative paths
     * @param {String} baseDir the base output folder where all of the sources should be copied to
     * @return {Promise} a promise that resolves when all files have been copied
     */

  }, {
    key: 'copyAll',
    value: function copyAll(mapping, baseDir) {
      var _this2 = this;

      var promises = _lodash2.default.map(mapping, function (subDir, source) {
        return _this2.copy(source, baseDir + '/' + subDir);
      });

      return Promise.all(promises);
    }

    /**
     * Copy files from the source folder to the destination folder.
     *
     * @param {String} from the source folder
     * @param {String} to the destination folder
     * @return {Promise} a promise that resolves when all files have been copied
     */

  }, {
    key: 'copy',
    value: function copy(from, to) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var extract = _this3._tar.extract(to);
        extract.on('finish', function () {
          resolve();
        });
        _this3._tar.pack(from).pipe(extract);
      });
    }

    /**
     * Schedule the given folder to be automatically cleaned up when the JavaScript process finishes running.
     *
     * @param {String} folder the folder to cleanup
     */

  }, {
    key: 'autoclean',
    value: function autoclean(folder) {
      var _this4 = this;

      var cleanupStarted = false;

      this._process.on('beforeExit', function () {
        if (!cleanupStarted) {
          _this4._del(folder);
          cleanupStarted = true;
        }
      });
    }
  }]);

  return TarUtils;
}();

exports.default = TarUtils;
//# sourceMappingURL=tar-utils.js.map

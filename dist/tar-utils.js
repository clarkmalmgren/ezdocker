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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhci11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlCTTs7Ozs7Ozs7Ozs7QUFVSixXQVZJLFFBVUosR0FBa0U7UUFBdEQsMEZBQXNEOztRQUExQyx3RkFBMEM7O1FBQWhDLDRGQUFnQzs7UUFBcEIsaUVBQVcsdUJBQVM7OzBCQVY5RCxVQVU4RDs7QUFDaEUsU0FBSyxJQUFMLEdBQVksSUFBWixDQURnRTtBQUVoRSxTQUFLLEdBQUwsR0FBVyxHQUFYLENBRmdFO0FBR2hFLFNBQUssUUFBTCxHQUFnQixRQUFoQixDQUhnRTtBQUloRSxTQUFLLElBQUwsR0FBWSxJQUFaLENBSmdFO0dBQWxFOzs7Ozs7Ozs7ZUFWSTs7d0JBdUJBLFNBQVM7OztBQUNYLFVBQUksT0FBTyxLQUFLLFVBQUwsRUFBUCxDQURPO0FBRVgsV0FBSyxTQUFMLENBQWUsSUFBZixFQUZXOztBQUlYLGFBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixJQUF0QixFQUNKLElBREksQ0FDQyxZQUFNO0FBQUUsZUFBTyxNQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZixDQUFQLENBQUY7T0FBTixDQURSLENBSlc7Ozs7Ozs7Ozs7O2lDQWFBO0FBQ1gsYUFBTyxLQUFLLEdBQUwsQ0FBUyxNQUFULEtBQW9CLGNBQXBCLEdBQXFDLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixLQUFoQixDQUFoRCxDQURJOzs7Ozs7Ozs7Ozs7OzRCQVdMLFNBQVMsU0FBUzs7O0FBQ3hCLFVBQUksV0FBVyxpQkFBRSxHQUFGLENBQU0sT0FBTixFQUFlLFVBQUMsTUFBRCxFQUFTLE1BQVQsRUFBb0I7QUFDaEQsZUFBTyxPQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWtCLFVBQVUsR0FBVixHQUFnQixNQUFoQixDQUF6QixDQURnRDtPQUFwQixDQUExQixDQURvQjs7QUFLeEIsYUFBTyxRQUFRLEdBQVIsQ0FBWSxRQUFaLENBQVAsQ0FMd0I7Ozs7Ozs7Ozs7Ozs7eUJBZXJCLE1BQU0sSUFBSTs7O0FBQ2IsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQUksVUFBVSxPQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEVBQWxCLENBQVYsQ0FEa0M7QUFFdEMsZ0JBQVEsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBTTtBQUFFLG9CQUFGO1NBQU4sQ0FBckIsQ0FGc0M7QUFHdEMsZUFBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYsRUFBcUIsSUFBckIsQ0FBMEIsT0FBMUIsRUFIc0M7T0FBckIsQ0FBbkIsQ0FEYTs7Ozs7Ozs7Ozs7OEJBYUwsUUFBUTs7O0FBQ2hCLFVBQUksaUJBQWlCLEtBQWpCLENBRFk7O0FBR2hCLFdBQUssUUFBTCxDQUFjLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxZQUFJLENBQUMsY0FBRCxFQUFpQjtBQUNuQixpQkFBSyxJQUFMLENBQVUsTUFBVixFQURtQjtBQUVuQiwyQkFBaUIsSUFBakIsQ0FGbUI7U0FBckI7T0FENkIsQ0FBL0IsQ0FIZ0I7Ozs7U0EzRWQ7OztrQkF1RlMiLCJmaWxlIjoidGFyLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgZGVsIGZyb20gJ2RlbCc7XG5pbXBvcnQgdGFyIGZyb20gJ3Rhci1mcyc7XG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBnZW5lcmF0aW5nIGEgbW9yZSBjb21wbGV4IHRhciBzdHJlYW0uIFNwZWNpZmljYWxseSwgdGhpcyBhbGxvd3MgZm9yIHB1dHRpbmcgbXVsdGlwbGVcbiAqIHNvdXJjZSBmb2xkZXJzIGludG8gYSBzaW5nbGUgc3RyZWFtIHdpdGggcG90ZW50aWFsIGN1c3RvbSBtYXBwaW5ncy4gVGhpcyB1c2VzIGEgdGVtcG9yYXJ5IGZpbGUgZm9yXG4gKiBpbnRlcm1lZGlhdGUgc3RhZ2luZyB3aGljaCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgY2xlYW5lZCB1cCBvbiBwcm9jZXNzIGV4aXQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCB0YXJVdGlscyA9IG5ldyBUYXJVdGlscygpO1xuICogbGV0IHN0cmVhbSA9IHRhclV0aWxzLmFsbCh7XG4gKiAgICcvZnVsbHkvcXVhbGlmaWVkL3BhdGgnIDogJy4nLFxuICogICAncmVsYXRpdmUvcGF0aCcgOiAnc3ViZm9sZGVyJ1xuICogfSk7XG4gKi9cbmNsYXNzIFRhclV0aWxzIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3Igd2l0aCBvcHRpb25hbCBpbmplY3Rpb24gb2YgZGVwZW5kZW5jaWVzIGZvciBwdXJwb3NlcyBvZiB0ZXN0aW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbX2RlbD1kZWxdXG4gICAqIEBwYXJhbSB7b3N9IFtfb3M9b3NdXG4gICAqIEBwYXJhbSB7dGFyfSBbX3Rhcj10YXJdXG4gICAqIEBwYXJhbSB7cHJvY2Vzc30gW19wcm9jZXNzPXByb2Nlc3NdXG4gICAqL1xuICBjb25zdHJ1Y3RvcihfZGVsID0gZGVsLCBfb3MgPSBvcywgX3RhciA9IHRhciwgX3Byb2Nlc3MgPSBwcm9jZXNzKSB7XG4gICAgdGhpcy5fZGVsID0gX2RlbDtcbiAgICB0aGlzLl9vcyA9IF9vcztcbiAgICB0aGlzLl9wcm9jZXNzID0gX3Byb2Nlc3M7XG4gICAgdGhpcy5fdGFyID0gX3RhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHNpbmdsZSB0YXIgc3RyZWFtIHRoYXQgY29udGFpbnMgbXVsdGlwbGUgaW5wdXRzIHRoYXQgY2FuIGJlIG1hcHBlZCB0byByZWxhdGl2ZSBwYXRocy5cbiAgICpcbiAgICogQHBhcmFtIHt7U3RyaW5nLCBTdHJpbmd9fSBtYXBwaW5nIGEgbWFwIG9mIHNvdXJjZSBmb2xkZXJzIHRvIHRhcmdldCByZWxhdGl2ZSBwYXRoc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmVhbS5SZWFkYWJsZSwgRXJyb3I+fSBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBnZW5lcmF0ZWQgY29tYmluZWQgc3RyZWFtXG4gICAqL1xuICBhbGwobWFwcGluZykge1xuICAgIHZhciB0ZW1wID0gdGhpcy50ZW1wRm9sZGVyKCk7XG4gICAgdGhpcy5hdXRvY2xlYW4odGVtcCk7XG5cbiAgICByZXR1cm4gdGhpcy5jb3B5QWxsKG1hcHBpbmcsIHRlbXApXG4gICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLl90YXIucGFjayh0ZW1wKTsgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBwYXRoIGZvciBhIHRlbXBvcmFyeSBmaWxlIHRoYXQgaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBjdXJyZW50IE9TLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGZ1bGwtcXVhbGlmaWVkIGZvbGRlciBwYXRoXG4gICAqL1xuICB0ZW1wRm9sZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9vcy50bXBkaXIoKSArICcvdGFyLXV0aWxzX18nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGNvcHkgZmlsZXMgZnJvbSB0aGUgc291cmNlIG1hcHBpbmcgb250byB0aGUgZGVzdGluYXRpb24gYmFzZURpciBhcHBseWluZyB0aGUgYWRkaXRpb25hbCBzdWJmb2xkZXJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7TWFwPFN0cmluZywgU3RyaW5nPn0gbWFwcGluZyBhIG1hcCBvZiBzb3VyY2UgZm9sZGVycyB0byB0YXJnZXQgcmVsYXRpdmUgcGF0aHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJhc2VEaXIgdGhlIGJhc2Ugb3V0cHV0IGZvbGRlciB3aGVyZSBhbGwgb2YgdGhlIHNvdXJjZXMgc2hvdWxkIGJlIGNvcGllZCB0b1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGFsbCBmaWxlcyBoYXZlIGJlZW4gY29waWVkXG4gICAqL1xuICBjb3B5QWxsKG1hcHBpbmcsIGJhc2VEaXIpIHtcbiAgICB2YXIgcHJvbWlzZXMgPSBfLm1hcChtYXBwaW5nLCAoc3ViRGlyLCBzb3VyY2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmNvcHkoc291cmNlLCBiYXNlRGlyICsgJy8nICsgc3ViRGlyKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBmaWxlcyBmcm9tIHRoZSBzb3VyY2UgZm9sZGVyIHRvIHRoZSBkZXN0aW5hdGlvbiBmb2xkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIHRoZSBzb3VyY2UgZm9sZGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0byB0aGUgZGVzdGluYXRpb24gZm9sZGVyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIGZpbGVzIGhhdmUgYmVlbiBjb3BpZWRcbiAgICovXG4gIGNvcHkoZnJvbSwgdG8pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdmFyIGV4dHJhY3QgPSB0aGlzLl90YXIuZXh0cmFjdCh0byk7XG4gICAgICBleHRyYWN0Lm9uKCdmaW5pc2gnLCAoKSA9PiB7IHJlc29sdmUoKTsgfSk7XG4gICAgICB0aGlzLl90YXIucGFjayhmcm9tKS5waXBlKGV4dHJhY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlIHRoZSBnaXZlbiBmb2xkZXIgdG8gYmUgYXV0b21hdGljYWxseSBjbGVhbmVkIHVwIHdoZW4gdGhlIEphdmFTY3JpcHQgcHJvY2VzcyBmaW5pc2hlcyBydW5uaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZm9sZGVyIHRoZSBmb2xkZXIgdG8gY2xlYW51cFxuICAgKi9cbiAgYXV0b2NsZWFuKGZvbGRlcikge1xuICAgIHZhciBjbGVhbnVwU3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcHJvY2Vzcy5vbignYmVmb3JlRXhpdCcsICgpID0+IHtcbiAgICAgIGlmICghY2xlYW51cFN0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5fZGVsKGZvbGRlcik7XG4gICAgICAgIGNsZWFudXBTdGFydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXJVdGlscztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

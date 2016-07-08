'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhci11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjTSxROzs7Ozs7Ozs7OztBQVVKLHNCQUFrRTtBQUFBLFFBQXRELElBQXNEOztBQUFBLFFBQTFDLEdBQTBDOztBQUFBLFFBQWhDLElBQWdDOztBQUFBLFFBQXBCLFFBQW9CLHlEQUFULE9BQVM7O0FBQUE7O0FBQ2hFLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNEOzs7Ozs7Ozs7Ozs7d0JBUUcsTyxFQUFTO0FBQUE7O0FBQ1gsVUFBSSxPQUFPLEtBQUssVUFBTCxFQUFYO0FBQ0EsV0FBSyxTQUFMLENBQWUsSUFBZjs7QUFFQSxhQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsSUFBdEIsRUFDSixJQURJLENBQ0MsWUFBTTtBQUFFLGVBQU8sTUFBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYsQ0FBUDtBQUE4QixPQUR2QyxDQUFQO0FBRUQ7Ozs7Ozs7Ozs7aUNBT1k7QUFDWCxhQUFPLEtBQUssR0FBTCxDQUFTLE1BQVQsS0FBb0IsY0FBcEIsR0FBcUMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQTNCLENBQTVDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs0QkFTTyxPLEVBQVMsTyxFQUFTO0FBQUE7O0FBQ3hCLFVBQUksV0FBVyxpQkFBRSxHQUFGLENBQU0sT0FBTixFQUFlLFVBQUMsTUFBRCxFQUFTLE1BQVQsRUFBb0I7QUFDaEQsZUFBTyxPQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWtCLFVBQVUsR0FBVixHQUFnQixNQUFsQyxDQUFQO0FBQ0QsT0FGYyxDQUFmOztBQUlBLGFBQU8sUUFBUSxHQUFSLENBQVksUUFBWixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozt5QkFTSSxJLEVBQU0sRSxFQUFJO0FBQUE7O0FBQ2IsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQUksVUFBVSxPQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEVBQWxCLENBQWQ7QUFDQSxnQkFBUSxFQUFSLENBQVcsUUFBWCxFQUFxQixZQUFNO0FBQUU7QUFBWSxTQUF6QztBQUNBLGVBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQTBCLE9BQTFCO0FBQ0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7OEJBT1MsTSxFQUFRO0FBQUE7O0FBQ2hCLFVBQUksaUJBQWlCLEtBQXJCOztBQUVBLFdBQUssUUFBTCxDQUFjLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxZQUFJLENBQUMsY0FBTCxFQUFxQjtBQUNuQixpQkFBSyxJQUFMLENBQVUsTUFBVjtBQUNBLDJCQUFpQixJQUFqQjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7Ozs7a0JBR1ksUSIsImZpbGUiOiJ0YXItdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBkZWwgZnJvbSAnZGVsJztcbmltcG9ydCB0YXIgZnJvbSAndGFyLWZzJztcblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIGdlbmVyYXRpbmcgYSBtb3JlIGNvbXBsZXggdGFyIHN0cmVhbS4gU3BlY2lmaWNhbGx5LCB0aGlzIGFsbG93cyBmb3IgcHV0dGluZyBtdWx0aXBsZVxuICogc291cmNlIGZvbGRlcnMgaW50byBhIHNpbmdsZSBzdHJlYW0gd2l0aCBwb3RlbnRpYWwgY3VzdG9tIG1hcHBpbmdzLiBUaGlzIHVzZXMgYSB0ZW1wb3JhcnkgZmlsZSBmb3JcbiAqIGludGVybWVkaWF0ZSBzdGFnaW5nIHdoaWNoIHdpbGwgYmUgYXV0b21hdGljYWxseSBjbGVhbmVkIHVwIG9uIHByb2Nlc3MgZXhpdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHRhclV0aWxzID0gbmV3IFRhclV0aWxzKCk7XG4gKiBsZXQgc3RyZWFtID0gdGFyVXRpbHMuYWxsKHtcbiAqICAgJy9mdWxseS9xdWFsaWZpZWQvcGF0aCcgOiAnLicsXG4gKiAgICdyZWxhdGl2ZS9wYXRoJyA6ICdzdWJmb2xkZXInXG4gKiB9KTtcbiAqL1xuY2xhc3MgVGFyVXRpbHMge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciB3aXRoIG9wdGlvbmFsIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMgZm9yIHB1cnBvc2VzIG9mIHRlc3RpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtfZGVsPWRlbF1cbiAgICogQHBhcmFtIHtvc30gW19vcz1vc11cbiAgICogQHBhcmFtIHt0YXJ9IFtfdGFyPXRhcl1cbiAgICogQHBhcmFtIHtwcm9jZXNzfSBbX3Byb2Nlc3M9cHJvY2Vzc11cbiAgICovXG4gIGNvbnN0cnVjdG9yKF9kZWwgPSBkZWwsIF9vcyA9IG9zLCBfdGFyID0gdGFyLCBfcHJvY2VzcyA9IHByb2Nlc3MpIHtcbiAgICB0aGlzLl9kZWwgPSBfZGVsO1xuICAgIHRoaXMuX29zID0gX29zO1xuICAgIHRoaXMuX3Byb2Nlc3MgPSBfcHJvY2VzcztcbiAgICB0aGlzLl90YXIgPSBfdGFyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgc2luZ2xlIHRhciBzdHJlYW0gdGhhdCBjb250YWlucyBtdWx0aXBsZSBpbnB1dHMgdGhhdCBjYW4gYmUgbWFwcGVkIHRvIHJlbGF0aXZlIHBhdGhzLlxuICAgKlxuICAgKiBAcGFyYW0ge3tTdHJpbmcsIFN0cmluZ319IG1hcHBpbmcgYSBtYXAgb2Ygc291cmNlIGZvbGRlcnMgdG8gdGFyZ2V0IHJlbGF0aXZlIHBhdGhzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyZWFtLlJlYWRhYmxlLCBFcnJvcj59IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGdlbmVyYXRlZCBjb21iaW5lZCBzdHJlYW1cbiAgICovXG4gIGFsbChtYXBwaW5nKSB7XG4gICAgdmFyIHRlbXAgPSB0aGlzLnRlbXBGb2xkZXIoKTtcbiAgICB0aGlzLmF1dG9jbGVhbih0ZW1wKTtcblxuICAgIHJldHVybiB0aGlzLmNvcHlBbGwobWFwcGluZywgdGVtcClcbiAgICAgIC50aGVuKCgpID0+IHsgcmV0dXJuIHRoaXMuX3Rhci5wYWNrKHRlbXApOyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHBhdGggZm9yIGEgdGVtcG9yYXJ5IGZpbGUgdGhhdCBpcyBhcHByb3ByaWF0ZSBmb3IgdGhlIGN1cnJlbnQgT1MuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gZnVsbC1xdWFsaWZpZWQgZm9sZGVyIHBhdGhcbiAgICovXG4gIHRlbXBGb2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29zLnRtcGRpcigpICsgJy90YXItdXRpbHNfXycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgY29weSBmaWxlcyBmcm9tIHRoZSBzb3VyY2UgbWFwcGluZyBvbnRvIHRoZSBkZXN0aW5hdGlvbiBiYXNlRGlyIGFwcGx5aW5nIHRoZSBhZGRpdGlvbmFsIHN1YmZvbGRlcmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtNYXA8U3RyaW5nLCBTdHJpbmc+fSBtYXBwaW5nIGEgbWFwIG9mIHNvdXJjZSBmb2xkZXJzIHRvIHRhcmdldCByZWxhdGl2ZSBwYXRoc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gYmFzZURpciB0aGUgYmFzZSBvdXRwdXQgZm9sZGVyIHdoZXJlIGFsbCBvZiB0aGUgc291cmNlcyBzaG91bGQgYmUgY29waWVkIHRvXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gYWxsIGZpbGVzIGhhdmUgYmVlbiBjb3BpZWRcbiAgICovXG4gIGNvcHlBbGwobWFwcGluZywgYmFzZURpcikge1xuICAgIHZhciBwcm9taXNlcyA9IF8ubWFwKG1hcHBpbmcsIChzdWJEaXIsIHNvdXJjZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY29weShzb3VyY2UsIGJhc2VEaXIgKyAnLycgKyBzdWJEaXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IGZpbGVzIGZyb20gdGhlIHNvdXJjZSBmb2xkZXIgdG8gdGhlIGRlc3RpbmF0aW9uIGZvbGRlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZyb20gdGhlIHNvdXJjZSBmb2xkZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRvIHRoZSBkZXN0aW5hdGlvbiBmb2xkZXJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgZmlsZXMgaGF2ZSBiZWVuIGNvcGllZFxuICAgKi9cbiAgY29weShmcm9tLCB0bykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgZXh0cmFjdCA9IHRoaXMuX3Rhci5leHRyYWN0KHRvKTtcbiAgICAgIGV4dHJhY3Qub24oJ2ZpbmlzaCcsICgpID0+IHsgcmVzb2x2ZSgpOyB9KTtcbiAgICAgIHRoaXMuX3Rhci5wYWNrKGZyb20pLnBpcGUoZXh0cmFjdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2NoZWR1bGUgdGhlIGdpdmVuIGZvbGRlciB0byBiZSBhdXRvbWF0aWNhbGx5IGNsZWFuZWQgdXAgd2hlbiB0aGUgSmF2YVNjcmlwdCBwcm9jZXNzIGZpbmlzaGVzIHJ1bm5pbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmb2xkZXIgdGhlIGZvbGRlciB0byBjbGVhbnVwXG4gICAqL1xuICBhdXRvY2xlYW4oZm9sZGVyKSB7XG4gICAgdmFyIGNsZWFudXBTdGFydGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9wcm9jZXNzLm9uKCdiZWZvcmVFeGl0JywgKCkgPT4ge1xuICAgICAgaWYgKCFjbGVhbnVwU3RhcnRlZCkge1xuICAgICAgICB0aGlzLl9kZWwoZm9sZGVyKTtcbiAgICAgICAgY2xlYW51cFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhclV0aWxzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

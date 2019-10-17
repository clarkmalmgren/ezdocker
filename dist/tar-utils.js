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
    var _del = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _del3.default;

    var _os = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _os3.default;

    var _tar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _tarFs2.default;

    var _process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : process;

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
          _this4._del(folder + ' --force');
          cleanupStarted = true;
        }
      });
    }
  }]);

  return TarUtils;
}();

exports.default = TarUtils;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhci11dGlscy5qcyJdLCJuYW1lcyI6WyJUYXJVdGlscyIsIl9kZWwiLCJkZWwiLCJfb3MiLCJvcyIsIl90YXIiLCJ0YXIiLCJfcHJvY2VzcyIsInByb2Nlc3MiLCJtYXBwaW5nIiwidGVtcCIsInRlbXBGb2xkZXIiLCJhdXRvY2xlYW4iLCJjb3B5QWxsIiwidGhlbiIsInBhY2siLCJ0bXBkaXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJiYXNlRGlyIiwicHJvbWlzZXMiLCJfIiwibWFwIiwic3ViRGlyIiwic291cmNlIiwiY29weSIsIlByb21pc2UiLCJhbGwiLCJmcm9tIiwidG8iLCJyZXNvbHZlIiwicmVqZWN0IiwiZXh0cmFjdCIsIm9uIiwicGlwZSIsImZvbGRlciIsImNsZWFudXBTdGFydGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFZTUEsUTs7QUFFSjs7Ozs7Ozs7QUFRQSxzQkFBa0U7QUFBQSxRQUF0REMsSUFBc0QsdUVBQS9DQyxhQUErQzs7QUFBQSxRQUExQ0MsR0FBMEMsdUVBQXBDQyxZQUFvQzs7QUFBQSxRQUFoQ0MsSUFBZ0MsdUVBQXpCQyxlQUF5Qjs7QUFBQSxRQUFwQkMsUUFBb0IsdUVBQVRDLE9BQVM7O0FBQUE7O0FBQ2hFLFNBQUtQLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtFLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtJLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7d0JBTUlJLE8sRUFBUztBQUFBOztBQUNYLFVBQUlDLE9BQU8sS0FBS0MsVUFBTCxFQUFYO0FBQ0EsV0FBS0MsU0FBTCxDQUFlRixJQUFmOztBQUVBLGFBQU8sS0FBS0csT0FBTCxDQUFhSixPQUFiLEVBQXNCQyxJQUF0QixFQUNKSSxJQURJLENBQ0MsWUFBTTtBQUFFLGVBQU8sTUFBS1QsSUFBTCxDQUFVVSxJQUFWLENBQWVMLElBQWYsQ0FBUDtBQUE4QixPQUR2QyxDQUFQO0FBRUQ7O0FBRUQ7Ozs7Ozs7O2lDQUthO0FBQ1gsYUFBTyxLQUFLUCxHQUFMLENBQVNhLE1BQVQsS0FBb0IsY0FBcEIsR0FBcUNDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQixLQUEzQixDQUE1QztBQUNEOztBQUVEOzs7Ozs7Ozs7OzRCQU9RVixPLEVBQVNXLE8sRUFBUztBQUFBOztBQUN4QixVQUFJQyxXQUFXQyxpQkFBRUMsR0FBRixDQUFNZCxPQUFOLEVBQWUsVUFBQ2UsTUFBRCxFQUFTQyxNQUFULEVBQW9CO0FBQ2hELGVBQU8sT0FBS0MsSUFBTCxDQUFVRCxNQUFWLEVBQWtCTCxVQUFVLEdBQVYsR0FBZ0JJLE1BQWxDLENBQVA7QUFDRCxPQUZjLENBQWY7O0FBSUEsYUFBT0csUUFBUUMsR0FBUixDQUFZUCxRQUFaLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozt5QkFPS1EsSSxFQUFNQyxFLEVBQUk7QUFBQTs7QUFDYixhQUFPLElBQUlILE9BQUosQ0FBWSxVQUFDSSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBSUMsVUFBVSxPQUFLNUIsSUFBTCxDQUFVNEIsT0FBVixDQUFrQkgsRUFBbEIsQ0FBZDtBQUNBRyxnQkFBUUMsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBTTtBQUFFSDtBQUFZLFNBQXpDO0FBQ0EsZUFBSzFCLElBQUwsQ0FBVVUsSUFBVixDQUFlYyxJQUFmLEVBQXFCTSxJQUFyQixDQUEwQkYsT0FBMUI7QUFDRCxPQUpNLENBQVA7QUFLRDs7QUFFRDs7Ozs7Ozs7OEJBS1VHLE0sRUFBUTtBQUFBOztBQUNoQixVQUFJQyxpQkFBaUIsS0FBckI7O0FBRUEsV0FBSzlCLFFBQUwsQ0FBYzJCLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsWUFBTTtBQUNuQyxZQUFJLENBQUNHLGNBQUwsRUFBcUI7QUFDbkIsaUJBQUtwQyxJQUFMLENBQVVtQyxTQUFTLFVBQW5CO0FBQ0FDLDJCQUFpQixJQUFqQjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7Ozs7a0JBR1lyQyxRIiwiZmlsZSI6InRhci11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGRlbCBmcm9tICdkZWwnO1xuaW1wb3J0IHRhciBmcm9tICd0YXItZnMnO1xuXG4vKipcbiAqIFV0aWxpdGllcyBmb3IgZ2VuZXJhdGluZyBhIG1vcmUgY29tcGxleCB0YXIgc3RyZWFtLiBTcGVjaWZpY2FsbHksIHRoaXMgYWxsb3dzIGZvciBwdXR0aW5nIG11bHRpcGxlXG4gKiBzb3VyY2UgZm9sZGVycyBpbnRvIGEgc2luZ2xlIHN0cmVhbSB3aXRoIHBvdGVudGlhbCBjdXN0b20gbWFwcGluZ3MuIFRoaXMgdXNlcyBhIHRlbXBvcmFyeSBmaWxlIGZvclxuICogaW50ZXJtZWRpYXRlIHN0YWdpbmcgd2hpY2ggd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGNsZWFuZWQgdXAgb24gcHJvY2VzcyBleGl0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgdGFyVXRpbHMgPSBuZXcgVGFyVXRpbHMoKTtcbiAqIGxldCBzdHJlYW0gPSB0YXJVdGlscy5hbGwoe1xuICogICAnL2Z1bGx5L3F1YWxpZmllZC9wYXRoJyA6ICcuJyxcbiAqICAgJ3JlbGF0aXZlL3BhdGgnIDogJ3N1YmZvbGRlcidcbiAqIH0pO1xuICovXG5jbGFzcyBUYXJVdGlscyB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIHdpdGggb3B0aW9uYWwgaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcyBmb3IgcHVycG9zZXMgb2YgdGVzdGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW19kZWw9ZGVsXVxuICAgKiBAcGFyYW0ge29zfSBbX29zPW9zXVxuICAgKiBAcGFyYW0ge3Rhcn0gW190YXI9dGFyXVxuICAgKiBAcGFyYW0ge3Byb2Nlc3N9IFtfcHJvY2Vzcz1wcm9jZXNzXVxuICAgKi9cbiAgY29uc3RydWN0b3IoX2RlbCA9IGRlbCwgX29zID0gb3MsIF90YXIgPSB0YXIsIF9wcm9jZXNzID0gcHJvY2Vzcykge1xuICAgIHRoaXMuX2RlbCA9IF9kZWw7XG4gICAgdGhpcy5fb3MgPSBfb3M7XG4gICAgdGhpcy5fcHJvY2VzcyA9IF9wcm9jZXNzO1xuICAgIHRoaXMuX3RhciA9IF90YXI7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBzaW5nbGUgdGFyIHN0cmVhbSB0aGF0IGNvbnRhaW5zIG11bHRpcGxlIGlucHV0cyB0aGF0IGNhbiBiZSBtYXBwZWQgdG8gcmVsYXRpdmUgcGF0aHMuXG4gICAqXG4gICAqIEBwYXJhbSB7e1N0cmluZywgU3RyaW5nfX0gbWFwcGluZyBhIG1hcCBvZiBzb3VyY2UgZm9sZGVycyB0byB0YXJnZXQgcmVsYXRpdmUgcGF0aHNcbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJlYW0uUmVhZGFibGUsIEVycm9yPn0gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZ2VuZXJhdGVkIGNvbWJpbmVkIHN0cmVhbVxuICAgKi9cbiAgYWxsKG1hcHBpbmcpIHtcbiAgICB2YXIgdGVtcCA9IHRoaXMudGVtcEZvbGRlcigpO1xuICAgIHRoaXMuYXV0b2NsZWFuKHRlbXApO1xuXG4gICAgcmV0dXJuIHRoaXMuY29weUFsbChtYXBwaW5nLCB0ZW1wKVxuICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4gdGhpcy5fdGFyLnBhY2sodGVtcCk7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgcGF0aCBmb3IgYSB0ZW1wb3JhcnkgZmlsZSB0aGF0IGlzIGFwcHJvcHJpYXRlIGZvciB0aGUgY3VycmVudCBPUy5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBmdWxsLXF1YWxpZmllZCBmb2xkZXIgcGF0aFxuICAgKi9cbiAgdGVtcEZvbGRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3MudG1wZGlyKCkgKyAnL3Rhci11dGlsc19fJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBjb3B5IGZpbGVzIGZyb20gdGhlIHNvdXJjZSBtYXBwaW5nIG9udG8gdGhlIGRlc3RpbmF0aW9uIGJhc2VEaXIgYXBwbHlpbmcgdGhlIGFkZGl0aW9uYWwgc3ViZm9sZGVyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge01hcDxTdHJpbmcsIFN0cmluZz59IG1hcHBpbmcgYSBtYXAgb2Ygc291cmNlIGZvbGRlcnMgdG8gdGFyZ2V0IHJlbGF0aXZlIHBhdGhzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlRGlyIHRoZSBiYXNlIG91dHB1dCBmb2xkZXIgd2hlcmUgYWxsIG9mIHRoZSBzb3VyY2VzIHNob3VsZCBiZSBjb3BpZWQgdG9cbiAgICogQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgZmlsZXMgaGF2ZSBiZWVuIGNvcGllZFxuICAgKi9cbiAgY29weUFsbChtYXBwaW5nLCBiYXNlRGlyKSB7XG4gICAgdmFyIHByb21pc2VzID0gXy5tYXAobWFwcGluZywgKHN1YkRpciwgc291cmNlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jb3B5KHNvdXJjZSwgYmFzZURpciArICcvJyArIHN1YkRpcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgZmlsZXMgZnJvbSB0aGUgc291cmNlIGZvbGRlciB0byB0aGUgZGVzdGluYXRpb24gZm9sZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZnJvbSB0aGUgc291cmNlIGZvbGRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdG8gdGhlIGRlc3RpbmF0aW9uIGZvbGRlclxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGFsbCBmaWxlcyBoYXZlIGJlZW4gY29waWVkXG4gICAqL1xuICBjb3B5KGZyb20sIHRvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBleHRyYWN0ID0gdGhpcy5fdGFyLmV4dHJhY3QodG8pO1xuICAgICAgZXh0cmFjdC5vbignZmluaXNoJywgKCkgPT4geyByZXNvbHZlKCk7IH0pO1xuICAgICAgdGhpcy5fdGFyLnBhY2soZnJvbSkucGlwZShleHRyYWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2hlZHVsZSB0aGUgZ2l2ZW4gZm9sZGVyIHRvIGJlIGF1dG9tYXRpY2FsbHkgY2xlYW5lZCB1cCB3aGVuIHRoZSBKYXZhU2NyaXB0IHByb2Nlc3MgZmluaXNoZXMgcnVubmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGZvbGRlciB0aGUgZm9sZGVyIHRvIGNsZWFudXBcbiAgICovXG4gIGF1dG9jbGVhbihmb2xkZXIpIHtcbiAgICB2YXIgY2xlYW51cFN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX3Byb2Nlc3Mub24oJ2JlZm9yZUV4aXQnLCAoKSA9PiB7XG4gICAgICBpZiAoIWNsZWFudXBTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuX2RlbChmb2xkZXIgKyAnIC0tZm9yY2UnKTtcbiAgICAgICAgY2xlYW51cFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhclV0aWxzO1xuIl19

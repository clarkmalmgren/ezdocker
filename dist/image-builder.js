'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _pledge = require('./pledge');

var _pledge2 = _interopRequireDefault(_pledge);

var _stateError = require('./state-error');

var _stateError2 = _interopRequireDefault(_stateError);

var _streamParser = require('./stream-parser');

var _streamParser2 = _interopRequireDefault(_streamParser);

var _tarUtils = require('./tar-utils');

var _tarUtils2 = _interopRequireDefault(_tarUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageBuilder = function (_Pledge) {
  _inherits(ImageBuilder, _Pledge);

  function ImageBuilder(docker, repositoryName) {
    var tarUtils = arguments.length <= 2 || arguments[2] === undefined ? new _tarUtils2.default() : arguments[2];

    _classCallCheck(this, ImageBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageBuilder).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;
    _this._tarUtils = tarUtils;

    _this._paths = {};

    /**
     * Language chain. Returns this.
     *
     * @type {ImageBuilder}
     */
    _this.and = _this;

    /**
     * Language chain. Returns this.
     *
     * @type {ImageBuilder}
     */
    _this.with = _this;
    return _this;
  }

  /**
   * @param {String} tag
   * @return {ImageBuilder} this
   */

  _createClass(ImageBuilder, [{
    key: 'tag',
    value: function tag(_tag) {
      this._tag = _tag;
      return this;
    }

    /**
     * Add a path with an optional mapping onto a sub-folder path for a destination. These folders will be recursively
     * passed to the Docker image according to this mapping.  By default, the dest will be '.' meaning that it is the
     * root folder from the perspective of the docker build process. The Dockerfile should always be put into this
     * default root ('.') folder.
     *
     * @param {String} src the source folder
     * @param {String} [dest='.'] the destination folder
     * @return {ImageBuilder} this
     */

  }, {
    key: 'path',
    value: function path(src) {
      var dest = arguments.length <= 1 || arguments[1] === undefined ? '.' : arguments[1];

      this._paths[src] = dest;
      return this;
    }

    /**
     * Actually build the image.
     *
     * @param resolve
     * @param reject
     */

  }, {
    key: 'start',
    value: function start(resolve, reject) {
      var _this2 = this;

      if (!this._tag) {
        reject(new Error('Must include a tag to build image'));
        return;
      }

      var name = this._repositoryName + ':' + this._tag;

      this._tarUtils.all(this._paths).then(function (stream) {
        _this2._docker.buildImage(stream, { t: name }, function (error, response) {
          if (error) {
            reject(error);
          } else {
            response.pipe(_streamParser2.default);
            response.on('end', function () {
              resolve();
            });
          }
        });
      }).catch(function (error) {
        reject(error);
      });
    }
  }]);

  return ImageBuilder;
}(_pledge2.default);

exports.default = ImageBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTU07OztBQUVKLFdBRkksWUFFSixDQUFZLE1BQVosRUFBb0IsY0FBcEIsRUFBK0Q7UUFBM0IsaUVBQVcsd0NBQWdCOzswQkFGM0QsY0FFMkQ7O3VFQUYzRCwwQkFFMkQ7O0FBRzdELFVBQUssT0FBTCxHQUFlLE1BQWYsQ0FINkQ7QUFJN0QsVUFBSyxlQUFMLEdBQXVCLGNBQXZCLENBSjZEO0FBSzdELFVBQUssU0FBTCxHQUFpQixRQUFqQixDQUw2RDs7QUFPN0QsVUFBSyxNQUFMLEdBQWMsRUFBZDs7Ozs7OztBQVA2RCxTQWM3RCxDQUFLLEdBQUw7Ozs7Ozs7QUFkNkQsU0FxQjdELENBQUssSUFBTCxTQXJCNkQ7O0dBQS9EOzs7Ozs7O2VBRkk7O3dCQStCQSxNQUFLO0FBQ1AsV0FBSyxJQUFMLEdBQVksSUFBWixDQURPO0FBRVAsYUFBTyxJQUFQLENBRk87Ozs7Ozs7Ozs7Ozs7Ozs7eUJBZUosS0FBaUI7VUFBWiw2REFBTyxtQkFBSzs7QUFDcEIsV0FBSyxNQUFMLENBQVksR0FBWixJQUFtQixJQUFuQixDQURvQjtBQUVwQixhQUFPLElBQVAsQ0FGb0I7Ozs7Ozs7Ozs7OzswQkFXaEIsU0FBUyxRQUFROzs7QUFDckIsVUFBSSxDQUFDLEtBQUssSUFBTCxFQUFXO0FBQ2QsZUFBTyxJQUFJLEtBQUosQ0FBVSxtQ0FBVixDQUFQLEVBRGM7QUFFZCxlQUZjO09BQWhCOztBQUtBLFVBQUksT0FBVSxLQUFLLGVBQUwsU0FBd0IsS0FBSyxJQUFMLENBTmpCOztBQVFyQixXQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLEtBQUssTUFBTCxDQUFuQixDQUNHLElBREgsQ0FDUSxVQUFDLE1BQUQsRUFBWTtBQUNoQixlQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLE1BQXhCLEVBQWdDLEVBQUMsR0FBRyxJQUFILEVBQWpDLEVBQTJDLFVBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDOUQsY0FBSSxLQUFKLEVBQVc7QUFDVCxtQkFBTyxLQUFQLEVBRFM7V0FBWCxNQUVPO0FBQ0wscUJBQVMsSUFBVCx5QkFESztBQUVMLHFCQUFTLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQU07QUFDdkIsd0JBRHVCO2FBQU4sQ0FBbkIsQ0FGSztXQUZQO1NBRHlDLENBQTNDLENBRGdCO09BQVosQ0FEUixDQWFHLEtBYkgsQ0FhUyxVQUFDLEtBQUQsRUFBVztBQUNoQixlQUFPLEtBQVAsRUFEZ0I7T0FBWCxDQWJULENBUnFCOzs7O1NBekRuQjs7O2tCQXFGUyIsImZpbGUiOiJpbWFnZS1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgUGxlZGdlIGZyb20gJy4vcGxlZGdlJztcbmltcG9ydCBTdGF0ZUVycm9yIGZyb20gJy4vc3RhdGUtZXJyb3InO1xuaW1wb3J0IHN0cmVhbV9wYXJzZXIgZnJvbSAnLi9zdHJlYW0tcGFyc2VyJztcbmltcG9ydCBUYXJVdGlscyBmcm9tICcuL3Rhci11dGlscyc7XG5cbmNsYXNzIEltYWdlQnVpbGRlciBleHRlbmRzIFBsZWRnZSB7XG5cbiAgY29uc3RydWN0b3IoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSwgdGFyVXRpbHMgPSBuZXcgVGFyVXRpbHMoKSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXI7XG4gICAgdGhpcy5fcmVwb3NpdG9yeU5hbWUgPSByZXBvc2l0b3J5TmFtZTtcbiAgICB0aGlzLl90YXJVdGlscyA9IHRhclV0aWxzO1xuXG4gICAgdGhpcy5fcGF0aHMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIExhbmd1YWdlIGNoYWluLiBSZXR1cm5zIHRoaXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7SW1hZ2VCdWlsZGVyfVxuICAgICAqL1xuICAgIHRoaXMuYW5kID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIExhbmd1YWdlIGNoYWluLiBSZXR1cm5zIHRoaXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7SW1hZ2VCdWlsZGVyfVxuICAgICAqL1xuICAgIHRoaXMud2l0aCA9IHRoaXM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gICAqIEByZXR1cm4ge0ltYWdlQnVpbGRlcn0gdGhpc1xuICAgKi9cbiAgdGFnKHRhZykge1xuICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBwYXRoIHdpdGggYW4gb3B0aW9uYWwgbWFwcGluZyBvbnRvIGEgc3ViLWZvbGRlciBwYXRoIGZvciBhIGRlc3RpbmF0aW9uLiBUaGVzZSBmb2xkZXJzIHdpbGwgYmUgcmVjdXJzaXZlbHlcbiAgICogcGFzc2VkIHRvIHRoZSBEb2NrZXIgaW1hZ2UgYWNjb3JkaW5nIHRvIHRoaXMgbWFwcGluZy4gIEJ5IGRlZmF1bHQsIHRoZSBkZXN0IHdpbGwgYmUgJy4nIG1lYW5pbmcgdGhhdCBpdCBpcyB0aGVcbiAgICogcm9vdCBmb2xkZXIgZnJvbSB0aGUgcGVyc3BlY3RpdmUgb2YgdGhlIGRvY2tlciBidWlsZCBwcm9jZXNzLiBUaGUgRG9ja2VyZmlsZSBzaG91bGQgYWx3YXlzIGJlIHB1dCBpbnRvIHRoaXNcbiAgICogZGVmYXVsdCByb290ICgnLicpIGZvbGRlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNyYyB0aGUgc291cmNlIGZvbGRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2Rlc3Q9Jy4nXSB0aGUgZGVzdGluYXRpb24gZm9sZGVyXG4gICAqIEByZXR1cm4ge0ltYWdlQnVpbGRlcn0gdGhpc1xuICAgKi9cbiAgcGF0aChzcmMsIGRlc3QgPSAnLicpIHtcbiAgICB0aGlzLl9wYXRoc1tzcmNdID0gZGVzdDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSBidWlsZCB0aGUgaW1hZ2UuXG4gICAqXG4gICAqIEBwYXJhbSByZXNvbHZlXG4gICAqIEBwYXJhbSByZWplY3RcbiAgICovXG4gIHN0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICghdGhpcy5fdGFnKSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdNdXN0IGluY2x1ZGUgYSB0YWcgdG8gYnVpbGQgaW1hZ2UnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG5hbWUgPSBgJHt0aGlzLl9yZXBvc2l0b3J5TmFtZX06JHt0aGlzLl90YWd9YDtcblxuICAgIHRoaXMuX3RhclV0aWxzLmFsbCh0aGlzLl9wYXRocylcbiAgICAgIC50aGVuKChzdHJlYW0pID0+IHtcbiAgICAgICAgdGhpcy5fZG9ja2VyLmJ1aWxkSW1hZ2Uoc3RyZWFtLCB7dDogbmFtZX0sIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnBpcGUoc3RyZWFtX3BhcnNlcik7XG4gICAgICAgICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VCdWlsZGVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

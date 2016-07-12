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

/**
 * Both a promise and a builder pattern for creating images. The builder pattern allows for adding a tag
 * and paths.
 */

var ImageBuilder = function (_Pledge) {
  _inherits(ImageBuilder, _Pledge);

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryName
   * @param {TarUtils} [tarUtils=new TarUtils()]
   */

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
     * @private
     */

  }, {
    key: '_start',
    value: function _start(resolve, reject) {
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
            response.pipe((0, _streamParser2.default)());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVTTs7Ozs7Ozs7Ozs7QUFTSixXQVRJLFlBU0osQ0FBWSxNQUFaLEVBQW9CLGNBQXBCLEVBQStEO1FBQTNCLGlFQUFXLHdDQUFnQjs7MEJBVDNELGNBUzJEOzt1RUFUM0QsMEJBUzJEOztBQUc3RCxVQUFLLE9BQUwsR0FBZSxNQUFmLENBSDZEO0FBSTdELFVBQUssZUFBTCxHQUF1QixjQUF2QixDQUo2RDtBQUs3RCxVQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FMNkQ7O0FBTzdELFVBQUssTUFBTCxHQUFjLEVBQWQ7Ozs7Ozs7QUFQNkQsU0FjN0QsQ0FBSyxHQUFMOzs7Ozs7O0FBZDZELFNBcUI3RCxDQUFLLElBQUwsU0FyQjZEOztHQUEvRDs7Ozs7OztlQVRJOzt3QkFzQ0EsTUFBSztBQUNQLFdBQUssSUFBTCxHQUFZLElBQVosQ0FETztBQUVQLGFBQU8sSUFBUCxDQUZPOzs7Ozs7Ozs7Ozs7Ozs7O3lCQWVKLEtBQWlCO1VBQVosNkRBQU8sbUJBQUs7O0FBQ3BCLFdBQUssTUFBTCxDQUFZLEdBQVosSUFBbUIsSUFBbkIsQ0FEb0I7QUFFcEIsYUFBTyxJQUFQLENBRm9COzs7Ozs7Ozs7Ozs7OzJCQVlmLFNBQVMsUUFBUTs7O0FBQ3RCLFVBQUksQ0FBQyxLQUFLLElBQUwsRUFBVztBQUNkLGVBQU8sSUFBSSxLQUFKLENBQVUsbUNBQVYsQ0FBUCxFQURjO0FBRWQsZUFGYztPQUFoQjs7QUFLQSxVQUFJLE9BQVUsS0FBSyxlQUFMLFNBQXdCLEtBQUssSUFBTCxDQU5oQjs7QUFRdEIsV0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFLLE1BQUwsQ0FBbkIsQ0FDRyxJQURILENBQ1EsVUFBQyxNQUFELEVBQVk7QUFDaEIsZUFBSyxPQUFMLENBQWEsVUFBYixDQUF3QixNQUF4QixFQUFnQyxFQUFDLEdBQUcsSUFBSCxFQUFqQyxFQUEyQyxVQUFDLEtBQUQsRUFBUSxRQUFSLEVBQXFCO0FBQzlELGNBQUksS0FBSixFQUFXO0FBQ1QsbUJBQU8sS0FBUCxFQURTO1dBQVgsTUFFTztBQUNMLHFCQUFTLElBQVQsQ0FBYyw2QkFBZCxFQURLO0FBRUwscUJBQVMsRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBTTtBQUN2Qix3QkFEdUI7YUFBTixDQUFuQixDQUZLO1dBRlA7U0FEeUMsQ0FBM0MsQ0FEZ0I7T0FBWixDQURSLENBYUcsS0FiSCxDQWFTLFVBQUMsS0FBRCxFQUFXO0FBQ2hCLGVBQU8sS0FBUCxFQURnQjtPQUFYLENBYlQsQ0FSc0I7Ozs7U0FqRXBCOzs7a0JBNkZTIiwiZmlsZSI6ImltYWdlLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBQbGVkZ2UgZnJvbSAnLi9wbGVkZ2UnO1xuaW1wb3J0IFN0YXRlRXJyb3IgZnJvbSAnLi9zdGF0ZS1lcnJvcic7XG5pbXBvcnQgc3RyZWFtX3BhcnNlciBmcm9tICcuL3N0cmVhbS1wYXJzZXInO1xuaW1wb3J0IFRhclV0aWxzIGZyb20gJy4vdGFyLXV0aWxzJztcblxuLyoqXG4gKiBCb3RoIGEgcHJvbWlzZSBhbmQgYSBidWlsZGVyIHBhdHRlcm4gZm9yIGNyZWF0aW5nIGltYWdlcy4gVGhlIGJ1aWxkZXIgcGF0dGVybiBhbGxvd3MgZm9yIGFkZGluZyBhIHRhZ1xuICogYW5kIHBhdGhzLlxuICovXG5jbGFzcyBJbWFnZUJ1aWxkZXIgZXh0ZW5kcyBQbGVkZ2Uge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge0RvY2tlcn0gZG9ja2VyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZXBvc2l0b3J5TmFtZVxuICAgKiBAcGFyYW0ge1RhclV0aWxzfSBbdGFyVXRpbHM9bmV3IFRhclV0aWxzKCldXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lLCB0YXJVdGlscyA9IG5ldyBUYXJVdGlscygpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgICB0aGlzLl9yZXBvc2l0b3J5TmFtZSA9IHJlcG9zaXRvcnlOYW1lO1xuICAgIHRoaXMuX3RhclV0aWxzID0gdGFyVXRpbHM7XG5cbiAgICB0aGlzLl9wYXRocyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogTGFuZ3VhZ2UgY2hhaW4uIFJldHVybnMgdGhpcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtJbWFnZUJ1aWxkZXJ9XG4gICAgICovXG4gICAgdGhpcy5hbmQgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogTGFuZ3VhZ2UgY2hhaW4uIFJldHVybnMgdGhpcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtJbWFnZUJ1aWxkZXJ9XG4gICAgICovXG4gICAgdGhpcy53aXRoID0gdGhpcztcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAgICogQHJldHVybiB7SW1hZ2VCdWlsZGVyfSB0aGlzXG4gICAqL1xuICB0YWcodGFnKSB7XG4gICAgdGhpcy5fdGFnID0gdGFnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBhdGggd2l0aCBhbiBvcHRpb25hbCBtYXBwaW5nIG9udG8gYSBzdWItZm9sZGVyIHBhdGggZm9yIGEgZGVzdGluYXRpb24uIFRoZXNlIGZvbGRlcnMgd2lsbCBiZSByZWN1cnNpdmVseVxuICAgKiBwYXNzZWQgdG8gdGhlIERvY2tlciBpbWFnZSBhY2NvcmRpbmcgdG8gdGhpcyBtYXBwaW5nLiAgQnkgZGVmYXVsdCwgdGhlIGRlc3Qgd2lsbCBiZSAnLicgbWVhbmluZyB0aGF0IGl0IGlzIHRoZVxuICAgKiByb290IGZvbGRlciBmcm9tIHRoZSBwZXJzcGVjdGl2ZSBvZiB0aGUgZG9ja2VyIGJ1aWxkIHByb2Nlc3MuIFRoZSBEb2NrZXJmaWxlIHNob3VsZCBhbHdheXMgYmUgcHV0IGludG8gdGhpc1xuICAgKiBkZWZhdWx0IHJvb3QgKCcuJykgZm9sZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjIHRoZSBzb3VyY2UgZm9sZGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZGVzdD0nLiddIHRoZSBkZXN0aW5hdGlvbiBmb2xkZXJcbiAgICogQHJldHVybiB7SW1hZ2VCdWlsZGVyfSB0aGlzXG4gICAqL1xuICBwYXRoKHNyYywgZGVzdCA9ICcuJykge1xuICAgIHRoaXMuX3BhdGhzW3NyY10gPSBkZXN0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IGJ1aWxkIHRoZSBpbWFnZS5cbiAgICpcbiAgICogQHBhcmFtIHJlc29sdmVcbiAgICogQHBhcmFtIHJlamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICghdGhpcy5fdGFnKSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdNdXN0IGluY2x1ZGUgYSB0YWcgdG8gYnVpbGQgaW1hZ2UnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG5hbWUgPSBgJHt0aGlzLl9yZXBvc2l0b3J5TmFtZX06JHt0aGlzLl90YWd9YDtcblxuICAgIHRoaXMuX3RhclV0aWxzLmFsbCh0aGlzLl9wYXRocylcbiAgICAgIC50aGVuKChzdHJlYW0pID0+IHtcbiAgICAgICAgdGhpcy5fZG9ja2VyLmJ1aWxkSW1hZ2Uoc3RyZWFtLCB7dDogbmFtZX0sIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnBpcGUoc3RyZWFtX3BhcnNlcigpKTtcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUJ1aWxkZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

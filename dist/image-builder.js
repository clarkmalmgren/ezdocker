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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWJ1aWxkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVTTs7Ozs7Ozs7Ozs7QUFTSixXQVRJLFlBU0osQ0FBWSxNQUFaLEVBQW9CLGNBQXBCLEVBQStEO1FBQTNCLGlFQUFXLHdDQUFnQjs7MEJBVDNELGNBUzJEOzt1RUFUM0QsMEJBUzJEOztBQUc3RCxVQUFLLE9BQUwsR0FBZSxNQUFmLENBSDZEO0FBSTdELFVBQUssZUFBTCxHQUF1QixjQUF2QixDQUo2RDtBQUs3RCxVQUFLLFNBQUwsR0FBaUIsUUFBakIsQ0FMNkQ7O0FBTzdELFVBQUssTUFBTCxHQUFjLEVBQWQ7Ozs7Ozs7QUFQNkQsU0FjN0QsQ0FBSyxHQUFMOzs7Ozs7O0FBZDZELFNBcUI3RCxDQUFLLElBQUwsU0FyQjZEOztHQUEvRDs7Ozs7OztlQVRJOzt3QkFzQ0EsTUFBSztBQUNQLFdBQUssSUFBTCxHQUFZLElBQVosQ0FETztBQUVQLGFBQU8sSUFBUCxDQUZPOzs7Ozs7Ozs7Ozs7Ozs7O3lCQWVKLEtBQWlCO1VBQVosNkRBQU8sbUJBQUs7O0FBQ3BCLFdBQUssTUFBTCxDQUFZLEdBQVosSUFBbUIsSUFBbkIsQ0FEb0I7QUFFcEIsYUFBTyxJQUFQLENBRm9COzs7Ozs7Ozs7Ozs7OzJCQVlmLFNBQVMsUUFBUTs7O0FBQ3RCLFVBQUksQ0FBQyxLQUFLLElBQUwsRUFBVztBQUNkLGVBQU8sSUFBSSxLQUFKLENBQVUsbUNBQVYsQ0FBUCxFQURjO0FBRWQsZUFGYztPQUFoQjs7QUFLQSxVQUFJLE9BQVUsS0FBSyxlQUFMLFNBQXdCLEtBQUssSUFBTCxDQU5oQjs7QUFRdEIsV0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFLLE1BQUwsQ0FBbkIsQ0FDRyxJQURILENBQ1EsVUFBQyxNQUFELEVBQVk7QUFDaEIsZUFBSyxPQUFMLENBQWEsVUFBYixDQUF3QixNQUF4QixFQUFnQyxFQUFDLEdBQUcsSUFBSCxFQUFqQyxFQUEyQyxVQUFDLEtBQUQsRUFBUSxRQUFSLEVBQXFCO0FBQzlELGNBQUksS0FBSixFQUFXO0FBQ1QsbUJBQU8sS0FBUCxFQURTO1dBQVgsTUFFTztBQUNMLHFCQUFTLElBQVQseUJBREs7QUFFTCxxQkFBUyxFQUFULENBQVksS0FBWixFQUFtQixZQUFNO0FBQ3ZCLHdCQUR1QjthQUFOLENBQW5CLENBRks7V0FGUDtTQUR5QyxDQUEzQyxDQURnQjtPQUFaLENBRFIsQ0FhRyxLQWJILENBYVMsVUFBQyxLQUFELEVBQVc7QUFDaEIsZUFBTyxLQUFQLEVBRGdCO09BQVgsQ0FiVCxDQVJzQjs7OztTQWpFcEI7OztrQkE2RlMiLCJmaWxlIjoiaW1hZ2UtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IFBsZWRnZSBmcm9tICcuL3BsZWRnZSc7XG5pbXBvcnQgU3RhdGVFcnJvciBmcm9tICcuL3N0YXRlLWVycm9yJztcbmltcG9ydCBzdHJlYW1fcGFyc2VyIGZyb20gJy4vc3RyZWFtLXBhcnNlcic7XG5pbXBvcnQgVGFyVXRpbHMgZnJvbSAnLi90YXItdXRpbHMnO1xuXG4vKipcbiAqIEJvdGggYSBwcm9taXNlIGFuZCBhIGJ1aWxkZXIgcGF0dGVybiBmb3IgY3JlYXRpbmcgaW1hZ2VzLiBUaGUgYnVpbGRlciBwYXR0ZXJuIGFsbG93cyBmb3IgYWRkaW5nIGEgdGFnXG4gKiBhbmQgcGF0aHMuXG4gKi9cbmNsYXNzIEltYWdlQnVpbGRlciBleHRlbmRzIFBsZWRnZSB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7RG9ja2VyfSBkb2NrZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlcG9zaXRvcnlOYW1lXG4gICAqIEBwYXJhbSB7VGFyVXRpbHN9IFt0YXJVdGlscz1uZXcgVGFyVXRpbHMoKV1cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRvY2tlciwgcmVwb3NpdG9yeU5hbWUsIHRhclV0aWxzID0gbmV3IFRhclV0aWxzKCkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fZG9ja2VyID0gZG9ja2VyO1xuICAgIHRoaXMuX3JlcG9zaXRvcnlOYW1lID0gcmVwb3NpdG9yeU5hbWU7XG4gICAgdGhpcy5fdGFyVXRpbHMgPSB0YXJVdGlscztcblxuICAgIHRoaXMuX3BhdGhzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBMYW5ndWFnZSBjaGFpbi4gUmV0dXJucyB0aGlzLlxuICAgICAqXG4gICAgICogQHR5cGUge0ltYWdlQnVpbGRlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFuZCA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBMYW5ndWFnZSBjaGFpbi4gUmV0dXJucyB0aGlzLlxuICAgICAqXG4gICAgICogQHR5cGUge0ltYWdlQnVpbGRlcn1cbiAgICAgKi9cbiAgICB0aGlzLndpdGggPSB0aGlzO1xuICB9XG5cblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRhZ1xuICAgKiBAcmV0dXJuIHtJbWFnZUJ1aWxkZXJ9IHRoaXNcbiAgICovXG4gIHRhZyh0YWcpIHtcbiAgICB0aGlzLl90YWcgPSB0YWc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcGF0aCB3aXRoIGFuIG9wdGlvbmFsIG1hcHBpbmcgb250byBhIHN1Yi1mb2xkZXIgcGF0aCBmb3IgYSBkZXN0aW5hdGlvbi4gVGhlc2UgZm9sZGVycyB3aWxsIGJlIHJlY3Vyc2l2ZWx5XG4gICAqIHBhc3NlZCB0byB0aGUgRG9ja2VyIGltYWdlIGFjY29yZGluZyB0byB0aGlzIG1hcHBpbmcuICBCeSBkZWZhdWx0LCB0aGUgZGVzdCB3aWxsIGJlICcuJyBtZWFuaW5nIHRoYXQgaXQgaXMgdGhlXG4gICAqIHJvb3QgZm9sZGVyIGZyb20gdGhlIHBlcnNwZWN0aXZlIG9mIHRoZSBkb2NrZXIgYnVpbGQgcHJvY2Vzcy4gVGhlIERvY2tlcmZpbGUgc2hvdWxkIGFsd2F5cyBiZSBwdXQgaW50byB0aGlzXG4gICAqIGRlZmF1bHQgcm9vdCAoJy4nKSBmb2xkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzcmMgdGhlIHNvdXJjZSBmb2xkZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtkZXN0PScuJ10gdGhlIGRlc3RpbmF0aW9uIGZvbGRlclxuICAgKiBAcmV0dXJuIHtJbWFnZUJ1aWxkZXJ9IHRoaXNcbiAgICovXG4gIHBhdGgoc3JjLCBkZXN0ID0gJy4nKSB7XG4gICAgdGhpcy5fcGF0aHNbc3JjXSA9IGRlc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgYnVpbGQgdGhlIGltYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzb2x2ZVxuICAgKiBAcGFyYW0gcmVqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3RhcnQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKCF0aGlzLl90YWcpIHtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ011c3QgaW5jbHVkZSBhIHRhZyB0byBidWlsZCBpbWFnZScpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbmFtZSA9IGAke3RoaXMuX3JlcG9zaXRvcnlOYW1lfToke3RoaXMuX3RhZ31gO1xuXG4gICAgdGhpcy5fdGFyVXRpbHMuYWxsKHRoaXMuX3BhdGhzKVxuICAgICAgLnRoZW4oKHN0cmVhbSkgPT4ge1xuICAgICAgICB0aGlzLl9kb2NrZXIuYnVpbGRJbWFnZShzdHJlYW0sIHt0OiBuYW1lfSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UucGlwZShzdHJlYW1fcGFyc2VyKTtcbiAgICAgICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUJ1aWxkZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

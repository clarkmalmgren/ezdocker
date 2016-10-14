'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _pledge = require('./pledge');

var _pledge2 = _interopRequireDefault(_pledge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Promise to list images.
 */
var ImageLister = function (_Pledge) {
  _inherits(ImageLister, _Pledge);

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryNames
   */
  function ImageLister(docker, repositoryName) {
    _classCallCheck(this, ImageLister);

    var _this = _possibleConstructorReturn(this, (ImageLister.__proto__ || Object.getPrototypeOf(ImageLister)).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;
    return _this;
  }

  /**
   * Actually list the images
   *
   * @param {function} resolve
   * @param {function} reject
   * @private
   */


  _createClass(ImageLister, [{
    key: '_start',
    value: function _start(resolve, reject) {
      this._docker.listImages({ filter: this._repositoryName }, function (error, response) {
        if (error) {
          _log2.default.error('Listing Docker Images Failed: ' + error.message);
          reject(error);
        } else {
          resolve(response);
        }
      });
    }
  }]);

  return ImageLister;
}(_pledge2.default);

exports.default = ImageLister;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWxpc3Rlci5qcyJdLCJuYW1lcyI6WyJJbWFnZUxpc3RlciIsImRvY2tlciIsInJlcG9zaXRvcnlOYW1lIiwiX2RvY2tlciIsIl9yZXBvc2l0b3J5TmFtZSIsInJlc29sdmUiLCJyZWplY3QiLCJsaXN0SW1hZ2VzIiwiZmlsdGVyIiwiZXJyb3IiLCJyZXNwb25zZSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxXOzs7QUFFSjs7Ozs7O0FBTUEsdUJBQVlDLE1BQVosRUFBb0JDLGNBQXBCLEVBQW9DO0FBQUE7O0FBQUE7O0FBR2xDLFVBQUtDLE9BQUwsR0FBZUYsTUFBZjtBQUNBLFVBQUtHLGVBQUwsR0FBdUJGLGNBQXZCO0FBSmtDO0FBS25DOztBQUVEOzs7Ozs7Ozs7OzsyQkFPT0csTyxFQUFTQyxNLEVBQVE7QUFDdEIsV0FBS0gsT0FBTCxDQUFhSSxVQUFiLENBQXdCLEVBQUNDLFFBQVEsS0FBS0osZUFBZCxFQUF4QixFQUF3RCxVQUFDSyxLQUFELEVBQVFDLFFBQVIsRUFBcUI7QUFDM0UsWUFBSUQsS0FBSixFQUFXO0FBQ1Qsd0JBQUlBLEtBQUosQ0FBVSxtQ0FBbUNBLE1BQU1FLE9BQW5EO0FBQ0FMLGlCQUFPRyxLQUFQO0FBQ0QsU0FIRCxNQUdPO0FBQ0xKLGtCQUFRSyxRQUFSO0FBQ0Q7QUFDRixPQVBEO0FBUUQ7Ozs7OztrQkFHWVYsVyIsImZpbGUiOiJpbWFnZS1saXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBQbGVkZ2UgZnJvbSAnLi9wbGVkZ2UnO1xuXG4vKipcbiAqIFByb21pc2UgdG8gbGlzdCBpbWFnZXMuXG4gKi9cbmNsYXNzIEltYWdlTGlzdGVyIGV4dGVuZHMgUGxlZGdlIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtEb2NrZXJ9IGRvY2tlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwb3NpdG9yeU5hbWVzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgICB0aGlzLl9yZXBvc2l0b3J5TmFtZSA9IHJlcG9zaXRvcnlOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IGxpc3QgdGhlIGltYWdlc1xuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRoaXMuX2RvY2tlci5saXN0SW1hZ2VzKHtmaWx0ZXI6IHRoaXMuX3JlcG9zaXRvcnlOYW1lfSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIExvZy5lcnJvcignTGlzdGluZyBEb2NrZXIgSW1hZ2VzIEZhaWxlZDogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0ZXI7Il19

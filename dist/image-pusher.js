'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _pledge = require('./pledge');

var _pledge2 = _interopRequireDefault(_pledge);

var _streamParser = require('./stream-parser');

var _streamParser2 = _interopRequireDefault(_streamParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Promise to push images.
 */

var ImagePusher = function (_Pledge) {
  _inherits(ImagePusher, _Pledge);

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryName
   */

  function ImagePusher(docker, repositoryName) {
    _classCallCheck(this, ImagePusher);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImagePusher).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;
    return _this;
  }

  /**
   * Actually push the images
   *
   * @param {function} resolve
   * @param {function} reject
   * @private
   */

  _createClass(ImagePusher, [{
    key: '_start',
    value: function _start(resolve, reject) {
      this._docker.getImage(this._repositoryName).push({}, function (error, response) {
        if (error) {
          _log2.default.error('Pushing Docker Image(s) Failed: ' + error.message);
          reject(error);
        } else {
          response.pipe(_streamParser2.default);
          response.on('end', function () {
            resolve();
          });
        }
      });
    }
  }]);

  return ImagePusher;
}(_pledge2.default);

exports.default = ImagePusher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXB1c2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9NOzs7Ozs7Ozs7O0FBUUosV0FSSSxXQVFKLENBQVksTUFBWixFQUFvQixjQUFwQixFQUFvQzswQkFSaEMsYUFRZ0M7O3VFQVJoQyx5QkFRZ0M7O0FBR2xDLFVBQUssT0FBTCxHQUFlLE1BQWYsQ0FIa0M7QUFJbEMsVUFBSyxlQUFMLEdBQXVCLGNBQXZCLENBSmtDOztHQUFwQzs7Ozs7Ozs7OztlQVJJOzsyQkFzQkcsU0FBUyxRQUFRO0FBQ3RCLFdBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsS0FBSyxlQUFMLENBQXRCLENBQTRDLElBQTVDLENBQWlELEVBQWpELEVBQXFELFVBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDeEUsWUFBSSxLQUFKLEVBQVc7QUFDVCx3QkFBSSxLQUFKLENBQVUscUNBQXFDLE1BQU0sT0FBTixDQUEvQyxDQURTO0FBRVQsaUJBQU8sS0FBUCxFQUZTO1NBQVgsTUFHTztBQUNMLG1CQUFTLElBQVQseUJBREs7QUFFTCxtQkFBUyxFQUFULENBQVksS0FBWixFQUFtQixZQUFNO0FBQ3ZCLHNCQUR1QjtXQUFOLENBQW5CLENBRks7U0FIUDtPQURtRCxDQUFyRCxDQURzQjs7OztTQXRCcEI7OztrQkFzQ1MiLCJmaWxlIjoiaW1hZ2UtcHVzaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgUGxlZGdlIGZyb20gJy4vcGxlZGdlJztcbmltcG9ydCBzdHJlYW1fcGFyc2VyIGZyb20gJy4vc3RyZWFtLXBhcnNlcic7XG5cbi8qKlxuICogUHJvbWlzZSB0byBwdXNoIGltYWdlcy5cbiAqL1xuY2xhc3MgSW1hZ2VQdXNoZXIgZXh0ZW5kcyBQbGVkZ2Uge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge0RvY2tlcn0gZG9ja2VyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZXBvc2l0b3J5TmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXI7XG4gICAgdGhpcy5fcmVwb3NpdG9yeU5hbWUgPSByZXBvc2l0b3J5TmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSBwdXNoIHRoZSBpbWFnZXNcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZWplY3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdGFydChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0aGlzLl9kb2NrZXIuZ2V0SW1hZ2UodGhpcy5fcmVwb3NpdG9yeU5hbWUpLnB1c2goe30sIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBMb2cuZXJyb3IoJ1B1c2hpbmcgRG9ja2VyIEltYWdlKHMpIEZhaWxlZDogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2UucGlwZShzdHJlYW1fcGFyc2VyKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VQdXNoZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

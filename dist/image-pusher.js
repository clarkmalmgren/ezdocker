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
          response.pipe((0, _streamParser2.default)());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXB1c2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9NOzs7Ozs7Ozs7O0FBUUosV0FSSSxXQVFKLENBQVksTUFBWixFQUFvQixjQUFwQixFQUFvQzswQkFSaEMsYUFRZ0M7O3VFQVJoQyx5QkFRZ0M7O0FBR2xDLFVBQUssT0FBTCxHQUFlLE1BQWYsQ0FIa0M7QUFJbEMsVUFBSyxlQUFMLEdBQXVCLGNBQXZCLENBSmtDOztHQUFwQzs7Ozs7Ozs7OztlQVJJOzsyQkFzQkcsU0FBUyxRQUFRO0FBQ3RCLFdBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsS0FBSyxlQUFMLENBQXRCLENBQTRDLElBQTVDLENBQWlELEVBQWpELEVBQXFELFVBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDeEUsWUFBSSxLQUFKLEVBQVc7QUFDVCx3QkFBSSxLQUFKLENBQVUscUNBQXFDLE1BQU0sT0FBTixDQUEvQyxDQURTO0FBRVQsaUJBQU8sS0FBUCxFQUZTO1NBQVgsTUFHTztBQUNMLG1CQUFTLElBQVQsQ0FBYyw2QkFBZCxFQURLO0FBRUwsbUJBQVMsRUFBVCxDQUFZLEtBQVosRUFBbUIsWUFBTTtBQUN2QixzQkFEdUI7V0FBTixDQUFuQixDQUZLO1NBSFA7T0FEbUQsQ0FBckQsQ0FEc0I7Ozs7U0F0QnBCOzs7a0JBc0NTIiwiZmlsZSI6ImltYWdlLXB1c2hlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IFBsZWRnZSBmcm9tICcuL3BsZWRnZSc7XG5pbXBvcnQgc3RyZWFtX3BhcnNlciBmcm9tICcuL3N0cmVhbS1wYXJzZXInO1xuXG4vKipcbiAqIFByb21pc2UgdG8gcHVzaCBpbWFnZXMuXG4gKi9cbmNsYXNzIEltYWdlUHVzaGVyIGV4dGVuZHMgUGxlZGdlIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtEb2NrZXJ9IGRvY2tlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwb3NpdG9yeU5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRvY2tlciwgcmVwb3NpdG9yeU5hbWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fZG9ja2VyID0gZG9ja2VyO1xuICAgIHRoaXMuX3JlcG9zaXRvcnlOYW1lID0gcmVwb3NpdG9yeU5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgcHVzaCB0aGUgaW1hZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3RhcnQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdGhpcy5fZG9ja2VyLmdldEltYWdlKHRoaXMuX3JlcG9zaXRvcnlOYW1lKS5wdXNoKHt9LCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgTG9nLmVycm9yKCdQdXNoaW5nIERvY2tlciBJbWFnZShzKSBGYWlsZWQ6ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlLnBpcGUoc3RyZWFtX3BhcnNlcigpKTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VQdXNoZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

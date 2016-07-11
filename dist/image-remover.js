'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _imageLister = require('./image-lister');

var _imageLister2 = _interopRequireDefault(_imageLister);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _pledge = require('./pledge');

var _pledge2 = _interopRequireDefault(_pledge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Promise to remove images.
 */

var ImageRemover = function (_Pledge) {
  _inherits(ImageRemover, _Pledge);

  /**
   * Constructor
   *
   * @param {Docker} docker
   * @param {String} repositoryName
   * @param {ImageLister} [imageLister=new ImageLister(docker, repositoryName)]
   */

  function ImageRemover(docker, repositoryName, imageLister) {
    _classCallCheck(this, ImageRemover);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageRemover).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;

    _this._imageLister = imageLister || new _imageLister2.default(docker, repositoryName);
    return _this;
  }

  /**
   * Actually remove the images.
   *
   * @param resolve ignored
   * @param reject ignored
   * @private
   */


  _createClass(ImageRemover, [{
    key: '_start',
    value: function _start(resolve, reject) {
      var _this2 = this;

      return this._imageLister.then(function (images) {
        return Promise.all(_lodash2.default.map(images, function (imageInfo) {
          return _this2.removeSingleImage(imageInfo.Id);
        }));
      });
    }

    /**
     * Remove a single image by hex id (short or long).
     *
     * @param {String} id hex id for the image
     * @return {Promise<null,Error>} promise that resolves after the image has been removed
     */

  }, {
    key: 'removeSingleImage',
    value: function removeSingleImage(id) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._docker.getImage(id).remove({}, function (error, response) {
          if (error) {
            if (error.statusCode == 404) {
              _log2.default.info('No docker images to remove.');
              resolve();
            } else {
              _log2.default.error('Removing Docker Image Failed: ' + error.message);
              reject(error);
            }
          } else {
            _log2.default.info('Removing Image ' + id);
            _lodash2.default.forEach(response, function (step) {
              _lodash2.default.forEach(step, function (target, action) {
                _log2.default.info('  ' + action + ' ' + target);
              });
            });
            resolve();
          }
        });
      });
    }
  }]);

  return ImageRemover;
}(_pledge2.default);

exports.default = ImageRemover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXJlbW92ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUtNLFk7Ozs7Ozs7Ozs7O0FBU0osd0JBQVksTUFBWixFQUFvQixjQUFwQixFQUFvQyxXQUFwQyxFQUFpRDtBQUFBOztBQUFBOztBQUcvQyxVQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsVUFBSyxlQUFMLEdBQXVCLGNBQXZCOztBQUVBLFVBQUssWUFBTCxHQUFvQixlQUFlLDBCQUFnQixNQUFoQixFQUF3QixjQUF4QixDQUFuQztBQU4rQztBQU9oRDs7Ozs7Ozs7Ozs7OzsyQkFTTSxPLEVBQVMsTSxFQUFRO0FBQUE7O0FBQ3RCLGFBQU8sS0FBSyxZQUFMLENBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLGVBQU8sUUFBUSxHQUFSLENBQVksaUJBQUUsR0FBRixDQUFNLE1BQU4sRUFBYyxVQUFDLFNBQUQsRUFBZTtBQUM5QyxpQkFBTyxPQUFLLGlCQUFMLENBQXVCLFVBQVUsRUFBakMsQ0FBUDtBQUNELFNBRmtCLENBQVosQ0FBUDtBQUdELE9BTEksQ0FBUDtBQU1EOzs7Ozs7Ozs7OztzQ0FRaUIsRSxFQUFJO0FBQUE7O0FBQ3BCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEVBQXRCLEVBQTBCLE1BQTFCLENBQWlDLEVBQWpDLEVBQXFDLFVBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDeEQsY0FBSSxLQUFKLEVBQVc7QUFDVCxnQkFBSSxNQUFNLFVBQU4sSUFBb0IsR0FBeEIsRUFBNkI7QUFDM0IsNEJBQUksSUFBSixDQUFTLDZCQUFUO0FBQ0E7QUFDRCxhQUhELE1BR087QUFDTCw0QkFBSSxLQUFKLENBQVUsbUNBQW1DLE1BQU0sT0FBbkQ7QUFDQSxxQkFBTyxLQUFQO0FBQ0Q7QUFDRixXQVJELE1BUU87QUFDTCwwQkFBSSxJQUFKLENBQVMsb0JBQW9CLEVBQTdCO0FBQ0EsNkJBQUUsT0FBRixDQUFVLFFBQVYsRUFBb0IsVUFBQyxJQUFELEVBQVU7QUFDNUIsK0JBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsVUFBQyxNQUFELEVBQVMsTUFBVCxFQUFvQjtBQUNsQyw4QkFBSSxJQUFKLENBQVMsT0FBTyxNQUFQLEdBQWdCLEdBQWhCLEdBQXNCLE1BQS9CO0FBQ0QsZUFGRDtBQUdELGFBSkQ7QUFLQTtBQUNEO0FBQ0YsU0FsQkQ7QUFtQkQsT0FwQk0sQ0FBUDtBQXFCRDs7Ozs7O2tCQUdZLFkiLCJmaWxlIjoiaW1hZ2UtcmVtb3Zlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgSW1hZ2VMaXN0ZXIgZnJvbSAnLi9pbWFnZS1saXN0ZXInO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgUGxlZGdlIGZyb20gJy4vcGxlZGdlJztcblxuLyoqXG4gKiBQcm9taXNlIHRvIHJlbW92ZSBpbWFnZXMuXG4gKi9cbmNsYXNzIEltYWdlUmVtb3ZlciBleHRlbmRzIFBsZWRnZSB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7RG9ja2VyfSBkb2NrZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlcG9zaXRvcnlOYW1lXG4gICAqIEBwYXJhbSB7SW1hZ2VMaXN0ZXJ9IFtpbWFnZUxpc3Rlcj1uZXcgSW1hZ2VMaXN0ZXIoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSldXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lLCBpbWFnZUxpc3Rlcikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXI7XG4gICAgdGhpcy5fcmVwb3NpdG9yeU5hbWUgPSByZXBvc2l0b3J5TmFtZTtcblxuICAgIHRoaXMuX2ltYWdlTGlzdGVyID0gaW1hZ2VMaXN0ZXIgfHwgbmV3IEltYWdlTGlzdGVyKGRvY2tlciwgcmVwb3NpdG9yeU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IHJlbW92ZSB0aGUgaW1hZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzb2x2ZSBpZ25vcmVkXG4gICAqIEBwYXJhbSByZWplY3QgaWdub3JlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJldHVybiB0aGlzLl9pbWFnZUxpc3RlclxuICAgICAgLnRoZW4oKGltYWdlcykgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXy5tYXAoaW1hZ2VzLCAoaW1hZ2VJbmZvKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlU2luZ2xlSW1hZ2UoaW1hZ2VJbmZvLklkKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgc2luZ2xlIGltYWdlIGJ5IGhleCBpZCAoc2hvcnQgb3IgbG9uZykuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBoZXggaWQgZm9yIHRoZSBpbWFnZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG51bGwsRXJyb3I+fSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdGhlIGltYWdlIGhhcyBiZWVuIHJlbW92ZWRcbiAgICovXG4gIHJlbW92ZVNpbmdsZUltYWdlKGlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX2RvY2tlci5nZXRJbWFnZShpZCkucmVtb3ZlKHt9LCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXNDb2RlID09IDQwNCkge1xuICAgICAgICAgICAgTG9nLmluZm8oJ05vIGRvY2tlciBpbWFnZXMgdG8gcmVtb3ZlLicpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoJ1JlbW92aW5nIERvY2tlciBJbWFnZSBGYWlsZWQ6ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIExvZy5pbmZvKCdSZW1vdmluZyBJbWFnZSAnICsgaWQpO1xuICAgICAgICAgIF8uZm9yRWFjaChyZXNwb25zZSwgKHN0ZXApID0+IHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChzdGVwLCAodGFyZ2V0LCBhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgTG9nLmluZm8oJyAgJyArIGFjdGlvbiArICcgJyArIHRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVJlbW92ZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

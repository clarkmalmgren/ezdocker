'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */

var ImageRemover = function (_Pledge) {
  _inherits(ImageRemover, _Pledge);

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
   */

  _createClass(ImageRemover, [{
    key: 'start',
    value: function start(resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXJlbW92ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUU07OztBQUVKLFdBRkksWUFFSixDQUFZLE1BQVosRUFBb0IsY0FBcEIsRUFBb0MsV0FBcEMsRUFBaUQ7MEJBRjdDLGNBRTZDOzt1RUFGN0MsMEJBRTZDOztBQUcvQyxVQUFLLE9BQUwsR0FBZSxNQUFmLENBSCtDO0FBSS9DLFVBQUssZUFBTCxHQUF1QixjQUF2QixDQUorQzs7QUFNL0MsVUFBSyxZQUFMLEdBQW9CLGVBQWUsMEJBQWdCLE1BQWhCLEVBQXdCLGNBQXhCLENBQWYsQ0FOMkI7O0dBQWpEOzs7Ozs7Ozs7ZUFGSTs7MEJBaUJFLFNBQVMsUUFBUTs7O0FBQ3JCLGFBQU8sS0FBSyxZQUFMLENBQ0osSUFESSxDQUNDLFVBQUMsTUFBRCxFQUFZO0FBQ2hCLGVBQU8sUUFBUSxHQUFSLENBQVksaUJBQUUsR0FBRixDQUFNLE1BQU4sRUFBYyxVQUFDLFNBQUQsRUFBZTtBQUM5QyxpQkFBTyxPQUFLLGlCQUFMLENBQXVCLFVBQVUsRUFBVixDQUE5QixDQUQ4QztTQUFmLENBQTFCLENBQVAsQ0FEZ0I7T0FBWixDQURSLENBRHFCOzs7Ozs7Ozs7Ozs7c0NBZUwsSUFBSTs7O0FBQ3BCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEVBQXRCLEVBQTBCLE1BQTFCLENBQWlDLEVBQWpDLEVBQXFDLFVBQUMsS0FBRCxFQUFRLFFBQVIsRUFBcUI7QUFDeEQsY0FBSSxLQUFKLEVBQVc7QUFDVCxnQkFBSSxNQUFNLFVBQU4sSUFBb0IsR0FBcEIsRUFBeUI7QUFDM0IsNEJBQUksSUFBSixDQUFTLDZCQUFULEVBRDJCO0FBRTNCLHdCQUYyQjthQUE3QixNQUdPO0FBQ0wsNEJBQUksS0FBSixDQUFVLG1DQUFtQyxNQUFNLE9BQU4sQ0FBN0MsQ0FESztBQUVMLHFCQUFPLEtBQVAsRUFGSzthQUhQO1dBREYsTUFRTztBQUNMLDBCQUFJLElBQUosQ0FBUyxvQkFBb0IsRUFBcEIsQ0FBVCxDQURLO0FBRUwsNkJBQUUsT0FBRixDQUFVLFFBQVYsRUFBb0IsVUFBQyxJQUFELEVBQVU7QUFDNUIsK0JBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsVUFBQyxNQUFELEVBQVMsTUFBVCxFQUFvQjtBQUNsQyw4QkFBSSxJQUFKLENBQVMsT0FBTyxNQUFQLEdBQWdCLEdBQWhCLEdBQXNCLE1BQXRCLENBQVQsQ0FEa0M7ZUFBcEIsQ0FBaEIsQ0FENEI7YUFBVixDQUFwQixDQUZLO0FBT0wsc0JBUEs7V0FSUDtTQURtQyxDQUFyQyxDQURzQztPQUFyQixDQUFuQixDQURvQjs7OztTQWhDbEI7OztrQkF5RFMiLCJmaWxlIjoiaW1hZ2UtcmVtb3Zlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgSW1hZ2VMaXN0ZXIgZnJvbSAnLi9pbWFnZS1saXN0ZXInO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgUGxlZGdlIGZyb20gJy4vcGxlZGdlJztcblxuLyoqXG4gKiBCdWlsZGVyIHBhdHRlcm4gZm9yIHJlbW92aW5nIGltYWdlcy4gTm90ZSB0aGF0IHRhZ3MgYXJlIG5vdCByZXF1aXJlZCAoYW5kIGlnbm9yZWQpLlxuICovXG5jbGFzcyBJbWFnZVJlbW92ZXIgZXh0ZW5kcyBQbGVkZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGRvY2tlciwgcmVwb3NpdG9yeU5hbWUsIGltYWdlTGlzdGVyKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgICB0aGlzLl9yZXBvc2l0b3J5TmFtZSA9IHJlcG9zaXRvcnlOYW1lO1xuXG4gICAgdGhpcy5faW1hZ2VMaXN0ZXIgPSBpbWFnZUxpc3RlciB8fCBuZXcgSW1hZ2VMaXN0ZXIoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgcmVtb3ZlIHRoZSBpbWFnZXMuXG4gICAqXG4gICAqIEBwYXJhbSByZXNvbHZlIGlnbm9yZWRcbiAgICogQHBhcmFtIHJlamVjdCBpZ25vcmVkXG4gICAqL1xuICBzdGFydChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5faW1hZ2VMaXN0ZXJcbiAgICAgIC50aGVuKChpbWFnZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF8ubWFwKGltYWdlcywgKGltYWdlSW5mbykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVNpbmdsZUltYWdlKGltYWdlSW5mby5JZCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBpbWFnZSBieSBoZXggaWQgKHNob3J0IG9yIGxvbmcpLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgaGV4IGlkIGZvciB0aGUgaW1hZ2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxudWxsLEVycm9yPn0gcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBpbWFnZSBoYXMgYmVlbiByZW1vdmVkXG4gICAqL1xuICByZW1vdmVTaW5nbGVJbWFnZShpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9kb2NrZXIuZ2V0SW1hZ2UoaWQpLnJlbW92ZSh7fSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzQ29kZSA9PSA0MDQpIHtcbiAgICAgICAgICAgIExvZy5pbmZvKCdObyBkb2NrZXIgaW1hZ2VzIHRvIHJlbW92ZS4nKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTG9nLmVycm9yKCdSZW1vdmluZyBEb2NrZXIgSW1hZ2UgRmFpbGVkOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBMb2cuaW5mbygnUmVtb3ZpbmcgSW1hZ2UgJyArIGlkKTtcbiAgICAgICAgICBfLmZvckVhY2gocmVzcG9uc2UsIChzdGVwKSA9PiB7XG4gICAgICAgICAgICBfLmZvckVhY2goc3RlcCwgKHRhcmdldCwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIExvZy5pbmZvKCcgICcgKyBhY3Rpb24gKyAnICcgKyB0YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VSZW1vdmVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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

    var _this = _possibleConstructorReturn(this, (ImageRemover.__proto__ || Object.getPrototypeOf(ImageRemover)).call(this));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXJlbW92ZXIuanMiXSwibmFtZXMiOlsiSW1hZ2VSZW1vdmVyIiwiZG9ja2VyIiwicmVwb3NpdG9yeU5hbWUiLCJpbWFnZUxpc3RlciIsIl9kb2NrZXIiLCJfcmVwb3NpdG9yeU5hbWUiLCJfaW1hZ2VMaXN0ZXIiLCJyZXNvbHZlIiwicmVqZWN0IiwidGhlbiIsImltYWdlcyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpbWFnZUluZm8iLCJyZW1vdmVTaW5nbGVJbWFnZSIsIklkIiwiaWQiLCJnZXRJbWFnZSIsInJlbW92ZSIsImVycm9yIiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwiaW5mbyIsIm1lc3NhZ2UiLCJmb3JFYWNoIiwic3RlcCIsInRhcmdldCIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxZOzs7QUFFSjs7Ozs7OztBQU9BLHdCQUFZQyxNQUFaLEVBQW9CQyxjQUFwQixFQUFvQ0MsV0FBcEMsRUFBaUQ7QUFBQTs7QUFBQTs7QUFHL0MsVUFBS0MsT0FBTCxHQUFlSCxNQUFmO0FBQ0EsVUFBS0ksZUFBTCxHQUF1QkgsY0FBdkI7O0FBRUEsVUFBS0ksWUFBTCxHQUFvQkgsZUFBZSwwQkFBZ0JGLE1BQWhCLEVBQXdCQyxjQUF4QixDQUFuQztBQU4rQztBQU9oRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT09LLE8sRUFBU0MsTSxFQUFRO0FBQUE7O0FBQ3RCLGFBQU8sS0FBS0YsWUFBTCxDQUNKRyxJQURJLENBQ0MsVUFBQ0MsTUFBRCxFQUFZO0FBQ2hCLGVBQU9DLFFBQVFDLEdBQVIsQ0FBWSxpQkFBRUMsR0FBRixDQUFNSCxNQUFOLEVBQWMsVUFBQ0ksU0FBRCxFQUFlO0FBQzlDLGlCQUFPLE9BQUtDLGlCQUFMLENBQXVCRCxVQUFVRSxFQUFqQyxDQUFQO0FBQ0QsU0FGa0IsQ0FBWixDQUFQO0FBR0QsT0FMSSxDQUFQO0FBTUQ7O0FBRUQ7Ozs7Ozs7OztzQ0FNa0JDLEUsRUFBSTtBQUFBOztBQUNwQixhQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDSixPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsZUFBS0osT0FBTCxDQUFhYyxRQUFiLENBQXNCRCxFQUF0QixFQUEwQkUsTUFBMUIsQ0FBaUMsRUFBakMsRUFBcUMsVUFBQ0MsS0FBRCxFQUFRQyxRQUFSLEVBQXFCO0FBQ3hELGNBQUlELEtBQUosRUFBVztBQUNULGdCQUFJQSxNQUFNRSxVQUFOLElBQW9CLEdBQXhCLEVBQTZCO0FBQzNCLDRCQUFJQyxJQUFKLENBQVMsNkJBQVQ7QUFDQWhCO0FBQ0QsYUFIRCxNQUdPO0FBQ0wsNEJBQUlhLEtBQUosQ0FBVSxtQ0FBbUNBLE1BQU1JLE9BQW5EO0FBQ0FoQixxQkFBT1ksS0FBUDtBQUNEO0FBQ0YsV0FSRCxNQVFPO0FBQ0wsMEJBQUlHLElBQUosQ0FBUyxvQkFBb0JOLEVBQTdCO0FBQ0EsNkJBQUVRLE9BQUYsQ0FBVUosUUFBVixFQUFvQixVQUFDSyxJQUFELEVBQVU7QUFDNUIsK0JBQUVELE9BQUYsQ0FBVUMsSUFBVixFQUFnQixVQUFDQyxNQUFELEVBQVNDLE1BQVQsRUFBb0I7QUFDbEMsOEJBQUlMLElBQUosQ0FBUyxPQUFPSyxNQUFQLEdBQWdCLEdBQWhCLEdBQXNCRCxNQUEvQjtBQUNELGVBRkQ7QUFHRCxhQUpEO0FBS0FwQjtBQUNEO0FBQ0YsU0FsQkQ7QUFtQkQsT0FwQk0sQ0FBUDtBQXFCRDs7Ozs7O2tCQUdZUCxZIiwiZmlsZSI6ImltYWdlLXJlbW92ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEltYWdlTGlzdGVyIGZyb20gJy4vaW1hZ2UtbGlzdGVyJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IFBsZWRnZSBmcm9tICcuL3BsZWRnZSc7XG5cbi8qKlxuICogUHJvbWlzZSB0byByZW1vdmUgaW1hZ2VzLlxuICovXG5jbGFzcyBJbWFnZVJlbW92ZXIgZXh0ZW5kcyBQbGVkZ2Uge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0ge0RvY2tlcn0gZG9ja2VyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZXBvc2l0b3J5TmFtZVxuICAgKiBAcGFyYW0ge0ltYWdlTGlzdGVyfSBbaW1hZ2VMaXN0ZXI9bmV3IEltYWdlTGlzdGVyKGRvY2tlciwgcmVwb3NpdG9yeU5hbWUpXVxuICAgKi9cbiAgY29uc3RydWN0b3IoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSwgaW1hZ2VMaXN0ZXIpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fZG9ja2VyID0gZG9ja2VyO1xuICAgIHRoaXMuX3JlcG9zaXRvcnlOYW1lID0gcmVwb3NpdG9yeU5hbWU7XG5cbiAgICB0aGlzLl9pbWFnZUxpc3RlciA9IGltYWdlTGlzdGVyIHx8IG5ldyBJbWFnZUxpc3Rlcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSByZW1vdmUgdGhlIGltYWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHJlc29sdmUgaWdub3JlZFxuICAgKiBAcGFyYW0gcmVqZWN0IGlnbm9yZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdGFydChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5faW1hZ2VMaXN0ZXJcbiAgICAgIC50aGVuKChpbWFnZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF8ubWFwKGltYWdlcywgKGltYWdlSW5mbykgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVNpbmdsZUltYWdlKGltYWdlSW5mby5JZCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHNpbmdsZSBpbWFnZSBieSBoZXggaWQgKHNob3J0IG9yIGxvbmcpLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgaGV4IGlkIGZvciB0aGUgaW1hZ2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxudWxsLEVycm9yPn0gcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBpbWFnZSBoYXMgYmVlbiByZW1vdmVkXG4gICAqL1xuICByZW1vdmVTaW5nbGVJbWFnZShpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl9kb2NrZXIuZ2V0SW1hZ2UoaWQpLnJlbW92ZSh7fSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzQ29kZSA9PSA0MDQpIHtcbiAgICAgICAgICAgIExvZy5pbmZvKCdObyBkb2NrZXIgaW1hZ2VzIHRvIHJlbW92ZS4nKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTG9nLmVycm9yKCdSZW1vdmluZyBEb2NrZXIgSW1hZ2UgRmFpbGVkOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBMb2cuaW5mbygnUmVtb3ZpbmcgSW1hZ2UgJyArIGlkKTtcbiAgICAgICAgICBfLmZvckVhY2gocmVzcG9uc2UsIChzdGVwKSA9PiB7XG4gICAgICAgICAgICBfLmZvckVhY2goc3RlcCwgKHRhcmdldCwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIExvZy5pbmZvKCcgICcgKyBhY3Rpb24gKyAnICcgKyB0YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VSZW1vdmVyOyJdfQ==

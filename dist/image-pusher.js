'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXB1c2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUtNLFc7Ozs7Ozs7Ozs7QUFRSix1QkFBWSxNQUFaLEVBQW9CLGNBQXBCLEVBQW9DO0FBQUE7O0FBQUE7O0FBR2xDLFVBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxVQUFLLGVBQUwsR0FBdUIsY0FBdkI7QUFKa0M7QUFLbkM7Ozs7Ozs7Ozs7Ozs7MkJBU00sTyxFQUFTLE0sRUFBUTtBQUN0QixXQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEtBQUssZUFBM0IsRUFBNEMsSUFBNUMsQ0FBaUQsRUFBakQsRUFBcUQsVUFBQyxLQUFELEVBQVEsUUFBUixFQUFxQjtBQUN4RSxZQUFJLEtBQUosRUFBVztBQUNULHdCQUFJLEtBQUosQ0FBVSxxQ0FBcUMsTUFBTSxPQUFyRDtBQUNBLGlCQUFPLEtBQVA7QUFDRCxTQUhELE1BR087QUFDTCxtQkFBUyxJQUFULENBQWMsNkJBQWQ7QUFDQSxtQkFBUyxFQUFULENBQVksS0FBWixFQUFtQixZQUFNO0FBQ3ZCO0FBQ0QsV0FGRDtBQUdEO0FBQ0YsT0FWRDtBQVdEOzs7Ozs7a0JBSVksVyIsImZpbGUiOiJpbWFnZS1wdXNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBQbGVkZ2UgZnJvbSAnLi9wbGVkZ2UnO1xuaW1wb3J0IHN0cmVhbV9wYXJzZXIgZnJvbSAnLi9zdHJlYW0tcGFyc2VyJztcblxuLyoqXG4gKiBQcm9taXNlIHRvIHB1c2ggaW1hZ2VzLlxuICovXG5jbGFzcyBJbWFnZVB1c2hlciBleHRlbmRzIFBsZWRnZSB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7RG9ja2VyfSBkb2NrZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlcG9zaXRvcnlOYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgICB0aGlzLl9yZXBvc2l0b3J5TmFtZSA9IHJlcG9zaXRvcnlOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IHB1c2ggdGhlIGltYWdlc1xuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRoaXMuX2RvY2tlci5nZXRJbWFnZSh0aGlzLl9yZXBvc2l0b3J5TmFtZSkucHVzaCh7fSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIExvZy5lcnJvcignUHVzaGluZyBEb2NrZXIgSW1hZ2UocykgRmFpbGVkOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZS5waXBlKHN0cmVhbV9wYXJzZXIoKSk7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlUHVzaGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var ImageLister = function (_Pledge) {
  _inherits(ImageLister, _Pledge);

  function ImageLister(docker, repositoryName) {
    _classCallCheck(this, ImageLister);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageLister).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;
    return _this;
  }

  _createClass(ImageLister, [{
    key: 'start',
    value: function start(resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLWxpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTU07OztBQUVKLFdBRkksV0FFSixDQUFZLE1BQVosRUFBb0IsY0FBcEIsRUFBb0M7MEJBRmhDLGFBRWdDOzt1RUFGaEMseUJBRWdDOztBQUdsQyxVQUFLLE9BQUwsR0FBZSxNQUFmLENBSGtDO0FBSWxDLFVBQUssZUFBTCxHQUF1QixjQUF2QixDQUprQzs7R0FBcEM7O2VBRkk7OzBCQVNFLFNBQVMsUUFBUTtBQUNyQixXQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLEVBQUMsUUFBUSxLQUFLLGVBQUwsRUFBakMsRUFBd0QsVUFBQyxLQUFELEVBQVEsUUFBUixFQUFxQjtBQUMzRSxZQUFJLEtBQUosRUFBVztBQUNULHdCQUFJLEtBQUosQ0FBVSxtQ0FBbUMsTUFBTSxPQUFOLENBQTdDLENBRFM7QUFFVCxpQkFBTyxLQUFQLEVBRlM7U0FBWCxNQUdPO0FBQ0wsa0JBQVEsUUFBUixFQURLO1NBSFA7T0FEc0QsQ0FBeEQsQ0FEcUI7Ozs7U0FUbkI7OztrQkFxQlMiLCJmaWxlIjoiaW1hZ2UtbGlzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgUGxlZGdlIGZyb20gJy4vcGxlZGdlJztcblxuLyoqXG4gKiBCdWlsZGVyIHBhdHRlcm4gZm9yIHJlbW92aW5nIGltYWdlcy4gTm90ZSB0aGF0IHRhZ3MgYXJlIG5vdCByZXF1aXJlZCAoYW5kIGlnbm9yZWQpLlxuICovXG5jbGFzcyBJbWFnZUxpc3RlciBleHRlbmRzIFBsZWRnZSB7XG5cbiAgY29uc3RydWN0b3IoZG9ja2VyLCByZXBvc2l0b3J5TmFtZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXI7XG4gICAgdGhpcy5fcmVwb3NpdG9yeU5hbWUgPSByZXBvc2l0b3J5TmFtZTtcbiAgfVxuXG4gIHN0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRoaXMuX2RvY2tlci5saXN0SW1hZ2VzKHtmaWx0ZXI6IHRoaXMuX3JlcG9zaXRvcnlOYW1lfSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIExvZy5lcnJvcignTGlzdGluZyBEb2NrZXIgSW1hZ2VzIEZhaWxlZDogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMaXN0ZXI7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

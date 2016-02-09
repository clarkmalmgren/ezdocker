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
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */

var ImagePusher = function (_Pledge) {
  _inherits(ImagePusher, _Pledge);

  function ImagePusher(docker, repositoryName) {
    _classCallCheck(this, ImagePusher);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImagePusher).call(this));

    _this._docker = docker;
    _this._repositoryName = repositoryName;
    return _this;
  }

  _createClass(ImagePusher, [{
    key: 'start',
    value: function start(resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXB1c2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9NOzs7QUFFSixXQUZJLFdBRUosQ0FBWSxNQUFaLEVBQW9CLGNBQXBCLEVBQW9DOzBCQUZoQyxhQUVnQzs7dUVBRmhDLHlCQUVnQzs7QUFHbEMsVUFBSyxPQUFMLEdBQWUsTUFBZixDQUhrQztBQUlsQyxVQUFLLGVBQUwsR0FBdUIsY0FBdkIsQ0FKa0M7O0dBQXBDOztlQUZJOzswQkFTRSxTQUFTLFFBQVE7QUFDckIsV0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixLQUFLLGVBQUwsQ0FBdEIsQ0FBNEMsSUFBNUMsQ0FBaUQsRUFBakQsRUFBcUQsVUFBQyxLQUFELEVBQVEsUUFBUixFQUFxQjtBQUN4RSxZQUFJLEtBQUosRUFBVztBQUNULHdCQUFJLEtBQUosQ0FBVSxxQ0FBcUMsTUFBTSxPQUFOLENBQS9DLENBRFM7QUFFVCxpQkFBTyxLQUFQLEVBRlM7U0FBWCxNQUdPO0FBQ0wsbUJBQVMsSUFBVCx5QkFESztBQUVMLG1CQUFTLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQU07QUFDdkIsc0JBRHVCO1dBQU4sQ0FBbkIsQ0FGSztTQUhQO09BRG1ELENBQXJELENBRHFCOzs7O1NBVG5COzs7a0JBeUJTIiwiZmlsZSI6ImltYWdlLXB1c2hlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IFBsZWRnZSBmcm9tICcuL3BsZWRnZSc7XG5pbXBvcnQgc3RyZWFtX3BhcnNlciBmcm9tICcuL3N0cmVhbS1wYXJzZXInO1xuXG4vKipcbiAqIEJ1aWxkZXIgcGF0dGVybiBmb3IgcmVtb3ZpbmcgaW1hZ2VzLiBOb3RlIHRoYXQgdGFncyBhcmUgbm90IHJlcXVpcmVkIChhbmQgaWdub3JlZCkuXG4gKi9cbmNsYXNzIEltYWdlUHVzaGVyIGV4dGVuZHMgUGxlZGdlIHtcblxuICBjb25zdHJ1Y3Rvcihkb2NrZXIsIHJlcG9zaXRvcnlOYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgICB0aGlzLl9yZXBvc2l0b3J5TmFtZSA9IHJlcG9zaXRvcnlOYW1lO1xuICB9XG5cbiAgc3RhcnQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdGhpcy5fZG9ja2VyLmdldEltYWdlKHRoaXMuX3JlcG9zaXRvcnlOYW1lKS5wdXNoKHt9LCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgTG9nLmVycm9yKCdQdXNoaW5nIERvY2tlciBJbWFnZShzKSBGYWlsZWQ6ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlLnBpcGUoc3RyZWFtX3BhcnNlcik7XG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlUHVzaGVyOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

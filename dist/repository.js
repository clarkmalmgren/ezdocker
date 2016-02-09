'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imageBuilder = require('./image-builder');

var _imageBuilder2 = _interopRequireDefault(_imageBuilder);

var _imageLister = require('./image-lister');

var _imageLister2 = _interopRequireDefault(_imageLister);

var _imagePusher = require('./image-pusher');

var _imagePusher2 = _interopRequireDefault(_imagePusher);

var _imageRemover = require('./image-remover');

var _imageRemover2 = _interopRequireDefault(_imageRemover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
  function Repository(name, docker) {
    _classCallCheck(this, Repository);

    this._name = name;
    this._docker = docker;
  }

  _createClass(Repository, [{
    key: 'buildImage',
    value: function buildImage() {
      return new _imageBuilder2.default(this._docker, this._name);
    }
  }, {
    key: 'listImages',
    value: function listImages() {
      return new _imageLister2.default(this._docker, this._name);
    }
  }, {
    key: 'pushImages',
    value: function pushImages() {
      return new _imagePusher2.default(this._docker, this._name);
    }
  }, {
    key: 'removeImages',
    value: function removeImages() {
      return new _imageRemover2.default(this._docker, this._name);
    }
  }]);

  return Repository;
}();

exports.default = Repository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtNO0FBRUosV0FGSSxVQUVKLENBQVksSUFBWixFQUFrQixNQUFsQixFQUEwQjswQkFGdEIsWUFFc0I7O0FBQ3hCLFNBQUssS0FBTCxHQUFhLElBQWIsQ0FEd0I7QUFFeEIsU0FBSyxPQUFMLEdBQWUsTUFBZixDQUZ3QjtHQUExQjs7ZUFGSTs7aUNBT1M7QUFDWCxhQUFPLDJCQUFpQixLQUFLLE9BQUwsRUFBYyxLQUFLLEtBQUwsQ0FBdEMsQ0FEVzs7OztpQ0FJQTtBQUNYLGFBQU8sMEJBQWdCLEtBQUssT0FBTCxFQUFjLEtBQUssS0FBTCxDQUFyQyxDQURXOzs7O2lDQUlBO0FBQ1gsYUFBTywwQkFBZ0IsS0FBSyxPQUFMLEVBQWMsS0FBSyxLQUFMLENBQXJDLENBRFc7Ozs7bUNBSUU7QUFDYixhQUFPLDJCQUFpQixLQUFLLE9BQUwsRUFBYyxLQUFLLEtBQUwsQ0FBdEMsQ0FEYTs7OztTQW5CWDs7O2tCQXdCUyIsImZpbGUiOiJyZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlQnVpbGRlciBmcm9tICcuL2ltYWdlLWJ1aWxkZXInO1xuaW1wb3J0IEltYWdlTGlzdGVyIGZyb20gJy4vaW1hZ2UtbGlzdGVyJztcbmltcG9ydCBJbWFnZVB1c2hlciBmcm9tICcuL2ltYWdlLXB1c2hlcic7XG5pbXBvcnQgSW1hZ2VSZW1vdmVyIGZyb20gJy4vaW1hZ2UtcmVtb3Zlcic7XG5cbmNsYXNzIFJlcG9zaXRvcnkge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRvY2tlcikge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHRoaXMuX2RvY2tlciA9IGRvY2tlcjtcbiAgfVxuXG4gIGJ1aWxkSW1hZ2UoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZUJ1aWxkZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIGxpc3RJbWFnZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZUxpc3Rlcih0aGlzLl9kb2NrZXIsIHRoaXMuX25hbWUpO1xuICB9XG5cbiAgcHVzaEltYWdlcygpIHtcbiAgICByZXR1cm4gbmV3IEltYWdlUHVzaGVyKHRoaXMuX2RvY2tlciwgdGhpcy5fbmFtZSk7XG4gIH1cblxuICByZW1vdmVJbWFnZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZVJlbW92ZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXBvc2l0b3J5OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

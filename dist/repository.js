'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

/**
 * Manages all aspects of images related to a specific repository. This is denoted by the following name schema:
 *
 * REGISTRY[:PORT]/USER/REPO
 *
 */
var Repository = function () {

  /**
   * Constructor
   *
   * @param {String} name the well formed name of the registry (with optional port), user and repo
   * @param {Docker} docker the docker connector to use
   */
  function Repository(name, docker) {
    _classCallCheck(this, Repository);

    this._name = name;
    this._docker = docker;
  }

  /**
   * Create a builder language chain and promise to build an image.
   *
   * @return {ImageBuilder}
   */


  _createClass(Repository, [{
    key: 'buildImage',
    value: function buildImage() {
      return new _imageBuilder2.default(this._docker, this._name);
    }

    /**
     * Create promise to list images.
     *
     * @return {ImageLister}
     */

  }, {
    key: 'listImages',
    value: function listImages() {
      return new _imageLister2.default(this._docker, this._name);
    }

    /**
     * Create promise to push images.
     *
     * @return {ImagePusher}
     */

  }, {
    key: 'pushImages',
    value: function pushImages() {
      return new _imagePusher2.default(this._docker, this._name);
    }

    /**
     * Create promise to remove images.
     *
     * @return {ImageRemover}
     */

  }, {
    key: 'removeImages',
    value: function removeImages() {
      return new _imageRemover2.default(this._docker, this._name);
    }
  }]);

  return Repository;
}();

exports.default = Repository;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcnkuanMiXSwibmFtZXMiOlsiUmVwb3NpdG9yeSIsIm5hbWUiLCJkb2NrZXIiLCJfbmFtZSIsIl9kb2NrZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxVOztBQUVKOzs7Ozs7QUFNQSxzQkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEI7QUFBQTs7QUFDeEIsU0FBS0MsS0FBTCxHQUFhRixJQUFiO0FBQ0EsU0FBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OztpQ0FLYTtBQUNYLGFBQU8sMkJBQWlCLEtBQUtFLE9BQXRCLEVBQStCLEtBQUtELEtBQXBDLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLDBCQUFnQixLQUFLQyxPQUFyQixFQUE4QixLQUFLRCxLQUFuQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O2lDQUthO0FBQ1gsYUFBTywwQkFBZ0IsS0FBS0MsT0FBckIsRUFBOEIsS0FBS0QsS0FBbkMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OzttQ0FLZTtBQUNiLGFBQU8sMkJBQWlCLEtBQUtDLE9BQXRCLEVBQStCLEtBQUtELEtBQXBDLENBQVA7QUFDRDs7Ozs7O2tCQUdZSCxVIiwiZmlsZSI6InJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2VCdWlsZGVyIGZyb20gJy4vaW1hZ2UtYnVpbGRlcic7XG5pbXBvcnQgSW1hZ2VMaXN0ZXIgZnJvbSAnLi9pbWFnZS1saXN0ZXInO1xuaW1wb3J0IEltYWdlUHVzaGVyIGZyb20gJy4vaW1hZ2UtcHVzaGVyJztcbmltcG9ydCBJbWFnZVJlbW92ZXIgZnJvbSAnLi9pbWFnZS1yZW1vdmVyJztcblxuLyoqXG4gKiBNYW5hZ2VzIGFsbCBhc3BlY3RzIG9mIGltYWdlcyByZWxhdGVkIHRvIGEgc3BlY2lmaWMgcmVwb3NpdG9yeS4gVGhpcyBpcyBkZW5vdGVkIGJ5IHRoZSBmb2xsb3dpbmcgbmFtZSBzY2hlbWE6XG4gKlxuICogUkVHSVNUUllbOlBPUlRdL1VTRVIvUkVQT1xuICpcbiAqL1xuY2xhc3MgUmVwb3NpdG9yeSB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIHRoZSB3ZWxsIGZvcm1lZCBuYW1lIG9mIHRoZSByZWdpc3RyeSAod2l0aCBvcHRpb25hbCBwb3J0KSwgdXNlciBhbmQgcmVwb1xuICAgKiBAcGFyYW0ge0RvY2tlcn0gZG9ja2VyIHRoZSBkb2NrZXIgY29ubmVjdG9yIHRvIHVzZVxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgZG9ja2VyKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5fZG9ja2VyID0gZG9ja2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGJ1aWxkZXIgbGFuZ3VhZ2UgY2hhaW4gYW5kIHByb21pc2UgdG8gYnVpbGQgYW4gaW1hZ2UuXG4gICAqXG4gICAqIEByZXR1cm4ge0ltYWdlQnVpbGRlcn1cbiAgICovXG4gIGJ1aWxkSW1hZ2UoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZUJ1aWxkZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcHJvbWlzZSB0byBsaXN0IGltYWdlcy5cbiAgICpcbiAgICogQHJldHVybiB7SW1hZ2VMaXN0ZXJ9XG4gICAqL1xuICBsaXN0SW1hZ2VzKCkge1xuICAgIHJldHVybiBuZXcgSW1hZ2VMaXN0ZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcHJvbWlzZSB0byBwdXNoIGltYWdlcy5cbiAgICpcbiAgICogQHJldHVybiB7SW1hZ2VQdXNoZXJ9XG4gICAqL1xuICBwdXNoSW1hZ2VzKCkge1xuICAgIHJldHVybiBuZXcgSW1hZ2VQdXNoZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcHJvbWlzZSB0byByZW1vdmUgaW1hZ2VzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtJbWFnZVJlbW92ZXJ9XG4gICAqL1xuICByZW1vdmVJbWFnZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZVJlbW92ZXIodGhpcy5fZG9ja2VyLCB0aGlzLl9uYW1lKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXBvc2l0b3J5OyJdfQ==

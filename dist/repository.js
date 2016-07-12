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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFXTTs7Ozs7Ozs7O0FBUUosV0FSSSxVQVFKLENBQVksSUFBWixFQUFrQixNQUFsQixFQUEwQjswQkFSdEIsWUFRc0I7O0FBQ3hCLFNBQUssS0FBTCxHQUFhLElBQWIsQ0FEd0I7QUFFeEIsU0FBSyxPQUFMLEdBQWUsTUFBZixDQUZ3QjtHQUExQjs7Ozs7Ozs7ZUFSSTs7aUNBa0JTO0FBQ1gsYUFBTywyQkFBaUIsS0FBSyxPQUFMLEVBQWMsS0FBSyxLQUFMLENBQXRDLENBRFc7Ozs7Ozs7Ozs7O2lDQVNBO0FBQ1gsYUFBTywwQkFBZ0IsS0FBSyxPQUFMLEVBQWMsS0FBSyxLQUFMLENBQXJDLENBRFc7Ozs7Ozs7Ozs7O2lDQVNBO0FBQ1gsYUFBTywwQkFBZ0IsS0FBSyxPQUFMLEVBQWMsS0FBSyxLQUFMLENBQXJDLENBRFc7Ozs7Ozs7Ozs7O21DQVNFO0FBQ2IsYUFBTywyQkFBaUIsS0FBSyxPQUFMLEVBQWMsS0FBSyxLQUFMLENBQXRDLENBRGE7Ozs7U0E3Q1g7OztrQkFrRFMiLCJmaWxlIjoicmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbWFnZUJ1aWxkZXIgZnJvbSAnLi9pbWFnZS1idWlsZGVyJztcbmltcG9ydCBJbWFnZUxpc3RlciBmcm9tICcuL2ltYWdlLWxpc3Rlcic7XG5pbXBvcnQgSW1hZ2VQdXNoZXIgZnJvbSAnLi9pbWFnZS1wdXNoZXInO1xuaW1wb3J0IEltYWdlUmVtb3ZlciBmcm9tICcuL2ltYWdlLXJlbW92ZXInO1xuXG4vKipcbiAqIE1hbmFnZXMgYWxsIGFzcGVjdHMgb2YgaW1hZ2VzIHJlbGF0ZWQgdG8gYSBzcGVjaWZpYyByZXBvc2l0b3J5LiBUaGlzIGlzIGRlbm90ZWQgYnkgdGhlIGZvbGxvd2luZyBuYW1lIHNjaGVtYTpcbiAqXG4gKiBSRUdJU1RSWVs6UE9SVF0vVVNFUi9SRVBPXG4gKlxuICovXG5jbGFzcyBSZXBvc2l0b3J5IHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgdGhlIHdlbGwgZm9ybWVkIG5hbWUgb2YgdGhlIHJlZ2lzdHJ5ICh3aXRoIG9wdGlvbmFsIHBvcnQpLCB1c2VyIGFuZCByZXBvXG4gICAqIEBwYXJhbSB7RG9ja2VyfSBkb2NrZXIgdGhlIGRvY2tlciBjb25uZWN0b3IgdG8gdXNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkb2NrZXIpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9kb2NrZXIgPSBkb2NrZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgYnVpbGRlciBsYW5ndWFnZSBjaGFpbiBhbmQgcHJvbWlzZSB0byBidWlsZCBhbiBpbWFnZS5cbiAgICpcbiAgICogQHJldHVybiB7SW1hZ2VCdWlsZGVyfVxuICAgKi9cbiAgYnVpbGRJbWFnZSgpIHtcbiAgICByZXR1cm4gbmV3IEltYWdlQnVpbGRlcih0aGlzLl9kb2NrZXIsIHRoaXMuX25hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBwcm9taXNlIHRvIGxpc3QgaW1hZ2VzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtJbWFnZUxpc3Rlcn1cbiAgICovXG4gIGxpc3RJbWFnZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZUxpc3Rlcih0aGlzLl9kb2NrZXIsIHRoaXMuX25hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBwcm9taXNlIHRvIHB1c2ggaW1hZ2VzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtJbWFnZVB1c2hlcn1cbiAgICovXG4gIHB1c2hJbWFnZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBJbWFnZVB1c2hlcih0aGlzLl9kb2NrZXIsIHRoaXMuX25hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBwcm9taXNlIHRvIHJlbW92ZSBpbWFnZXMuXG4gICAqXG4gICAqIEByZXR1cm4ge0ltYWdlUmVtb3Zlcn1cbiAgICovXG4gIHJlbW92ZUltYWdlcygpIHtcbiAgICByZXR1cm4gbmV3IEltYWdlUmVtb3Zlcih0aGlzLl9kb2NrZXIsIHRoaXMuX25hbWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcG9zaXRvcnk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

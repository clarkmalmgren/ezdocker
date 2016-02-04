'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stream_parser = exports.Log = exports.EZDocker = exports.ImagePusher = exports.ImageRemover = exports.ImageBuilder = exports.NameBuilder = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _yargs = require('yargs');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _tarUtils = require('./tar-utils');

var _tarUtils2 = _interopRequireDefault(_tarUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Builder pattern for building up images names following the convention: `REGISTRY[:PORT]/USER/REPO[:TAG]`.
 */

var NameBuilder = function () {

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */

  function NameBuilder(ezdocker) {
    _classCallCheck(this, NameBuilder);

    this._ezdocker = ezdocker;

    this._registry = undefined;
    this._port = undefined;
    this._user = undefined;
    this._repo = undefined;
    this._tag = undefined;
  }

  /**
   * @param {String} registry
   * @return {NameBuilder} this
   */

  _createClass(NameBuilder, [{
    key: 'registry',
    value: function registry(_registry) {
      this._registry = _registry;
      return this;
    }

    /**
     * @param {String} port
     * @return {NameBuilder} this
     */

  }, {
    key: 'port',
    value: function port(_port) {
      this._port = _port;
      return this;
    }

    /**
     * @param {String} user
     * @return {NameBuilder} this
     */

  }, {
    key: 'user',
    value: function user(_user) {
      this._user = _user;
      return this;
    }

    /**
     * @param {String} repo
     * @return {NameBuilder} this
     */

  }, {
    key: 'repo',
    value: function repo(_repo) {
      this._repo = _repo;
      return this;
    }

    /**
     * @param {String} tag
     * @return {NameBuilder} this
     */

  }, {
    key: 'tag',
    value: function tag(_tag) {
      this._tag = _tag;
      return this;
    }

    /**
     * Get the short name (excluding tag) following the convention: `REGISTRY[:PORT]/USER/REPO`
     *
     * @return {String} the short name
     */

  }, {
    key: 'getShortName',
    value: function getShortName() {
      var name = this._registry;
      if (this._port) {
        name += ':' + this._port;
      }
      name += '/' + this._user + '/' + this._repo;

      return name;
    }

    /**
     * Get the full name (indluding tag) following the convention: `REGISTRY[:PORT]/USER/REPO[:TAG]`
     *
     * @return {String} the short name
     */

  }, {
    key: 'getFullName',
    value: function getFullName() {
      return this.getShortName() + ':' + this._tag;
    }
  }]);

  return NameBuilder;
}();

/**
 * Builder pattern for creating images.
 */

var ImageBuilder = function (_NameBuilder) {
  _inherits(ImageBuilder, _NameBuilder);

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */

  function ImageBuilder(ezdocker) {
    _classCallCheck(this, ImageBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageBuilder).call(this, ezdocker));

    _this._paths = {};
    return _this;
  }

  /**
   * Add a path with an optional mapping onto a sub-folder path for a destination. These folders will be recursively
   * passed to the Docker image according to this mapping.  By default, the dest will be '.' meaning that it is the
   * root folder from the perspective of the docker build process. The Dockerfile should always be put into this
   * default root ('.') folder.
   *
   * @param {String} src the source folder
   * @param {String} [dest='.'] the destination folder
   * @return {ImageBuilder} this
   */

  _createClass(ImageBuilder, [{
    key: 'addPath',
    value: function addPath(src) {
      var dest = arguments.length <= 1 || arguments[1] === undefined ? '.' : arguments[1];

      this._paths[src] = dest;
      return this;
    }

    /**
     * Actually build the image using the paths and naming as recorded with this builder. This will actually
     * send the mapped folders (and the Dockerfile contained within) to the docker host for building. This returns
     * a Promise that will resolve when the build finishes or reject with the associated error on failure.
     *
     * @return {Promise<null,Error>} a promise that will resolve when the build finishes
     */

  }, {
    key: 'build',
    value: function build() {
      return this._ezdocker._buildImage(this);
    }
  }]);

  return ImageBuilder;
}(NameBuilder);

/**
 * Builder pattern for removing images. Note that tags are not required (and ignored).
 */

var ImageRemover = function (_NameBuilder2) {
  _inherits(ImageRemover, _NameBuilder2);

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */

  function ImageRemover(ezdocker) {
    _classCallCheck(this, ImageRemover);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageRemover).call(this, ezdocker));
  }

  /**
   * Remove images that match the built name from the docker host.
   *
   * @return {Promise<null,Error>} a promise that will resolve when the removal finishes
   */

  _createClass(ImageRemover, [{
    key: 'remove',
    value: function remove() {
      return this._ezdocker._removeImages(this);
    }
  }]);

  return ImageRemover;
}(NameBuilder);

/**
 * Builder pattern for pushing images. Note that tags are not required (and ignored).
 */

var ImagePusher = function (_NameBuilder3) {
  _inherits(ImagePusher, _NameBuilder3);

  /**
   * Constructor
   *
   * @param {EZDocker} ezdocker
   */

  function ImagePusher(ezdocker) {
    _classCallCheck(this, ImagePusher);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImagePusher).call(this, ezdocker));
  }

  /**
   * Push images from the docker host to the named docker registry.
   *
   * @return {Promise<null,Error>} a promise that will resolve when the pushing finishes
   */

  _createClass(ImagePusher, [{
    key: 'push',
    value: function push() {
      return this._ezdocker._pushImages(this);
    }
  }]);

  return ImagePusher;
}(NameBuilder);

/**
 * EZDocker provides easy to use access to builder-pattern classes for building images, removing images and pushing
 * images to a docker registry. See the README for more information on how to use.
 */

var EZDocker = function () {
  _createClass(EZDocker, null, [{
    key: 'createFromArgs',

    /**
     * Creates a EZDocker using command line arguments.
     *
     * @param {{}} [args=argv] the arguments that default to those from yargs.argv
     *
     * @return {EZDocker}
     */
    value: function createFromArgs() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? _yargs.argv : arguments[0];

      return new EZDocker(args.docker);
    }

    /**
     * Constructs a new EZDocker. See the README for valid connectionOpts. `docker` and `tarUtils` are only for use
     * in unit-testing to inject mock dependencies.
     *
     * @param {Map<String,String>} connectionOpts configures the connection method to
     * @param {Docker} [docker] used for dependency injection, if set, connectionOpts are ignored
     * @param {TarUtils} [tarUtils=new TarUtils()] used for dependency injection
     */

  }]);

  function EZDocker(connectionOpts, docker) {
    var tarUtils = arguments.length <= 2 || arguments[2] === undefined ? new _tarUtils2.default() : arguments[2];

    _classCallCheck(this, EZDocker);

    this._docker = docker || new _dockerode2.default(connectionOpts);
    this._tarUtils = tarUtils;
  }

  /**
   * Creates a new image builder.
   *
   * @return {ImageBuilder}
   */

  _createClass(EZDocker, [{
    key: 'imageBuilder',
    value: function imageBuilder() {
      return new ImageBuilder(this);
    }

    /**
     * Creates a new image remover.
     *
     * @return {ImageRemover}
     */

  }, {
    key: 'imageRemover',
    value: function imageRemover() {
      return new ImageRemover(this);
    }

    /**
     * Creates a new image pusher.
     *
     * @return {ImagePusher}
     */

  }, {
    key: 'imagePusher',
    value: function imagePusher() {
      return new ImagePusher(this);
    }

    /**
     * Build the image. This creates a single tar stream of all the paths and sends it to the docker host for building.
     *
     * @param {ImageBuilder} imageBuilder the image builder
     * @return {Promise<null,Error>}
     * @private
     */

  }, {
    key: '_buildImage',
    value: function _buildImage(imageBuilder) {
      var _this4 = this;

      return this._tarUtils.all(imageBuilder._paths).then(function (stream) {
        return new Promise(function (resolve, reject) {
          _this4._docker.buildImage(stream, { t: imageBuilder.getFullName() }, function (error, response) {
            if (error) {
              reject(error);
            } else {
              response.pipe(stream_parser);
              response.on('end', function () {
                resolve();
              });
            }
          });
        });
      });
    }

    /**
     * Remove images.
     *
     * @param {ImageRemover} imageRemover the image remover
     * @return {Promise<null,Error>}
     * @private
     */

  }, {
    key: '_removeImages',
    value: function _removeImages(imageRemover) {
      var _this5 = this;

      return this._listImages(imageRemover.getShortName()).then(function (images) {
        return Promise.all(_lodash2.default.map(images, function (imageInfo) {
          return _this5.removeImage(imageInfo.Id);
        }));
      });
    }

    /**
     * Lists images on the docker host by short name (no tag).
     *
     * @param {String} shortName the short name
     * @return {Promise<[{}],Error>} a promise that resolves with an array of maps containing image info
     * @private
     */

  }, {
    key: '_listImages',
    value: function _listImages(shortName) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6._docker.listImages({ filter: shortName }, function (error, response) {
          if (error) {
            Log.error('Listing Docker Images Failed: ' + error.message);
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    }

    /**
     * Remove a single image by hex id (short or long).
     *
     * @param {String} id hex id for the image
     * @return {Promise<null,Error>} promise that resolves after the image has been removed
     */

  }, {
    key: 'removeImage',
    value: function removeImage(id) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7._docker.getImage(id).remove({}, function (error, response) {
          if (error) {
            if (error.statusCode == 404) {
              Log.info('No docker images to remove.');
            } else {
              Log.error('Removing Docker Image Failed: ' + error.message);
              reject(error);
            }
          } else {
            Log.info('Removing Image ' + id);
            _lodash2.default.forEach(response, function (step) {
              _lodash2.default.forEach(step, function (target, action) {
                Log.info('  ' + action + ' ' + target);
              });
            });
            resolve();
          }
        });
      });
    }
  }, {
    key: '_pushImages',

    /**
     * Push images.
     *
     * @param {ImagePusher} imagePusher the image pusher
     * @return {Promise<null,Error>}
     * @private
     */
    value: function _pushImages(imagePusher) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8._docker.getImage(imagePusher.getShortName()).push({}, function (error, response) {
          if (error) {
            Log.error('Pushing Docker Image(s) Failed: ' + error.message);
            reject(error);
          } else {
            response.pipe(stream_parser);
            response.on('end', function () {
              resolve();
            });
          }
        });
      });
    }
  }]);

  return EZDocker;
}();

/**
 * Writable output stream that reads and transposes messages from the docker host into readable messages
 * that get printed out to STDOUT.
 *
 * @type {stream.Writable}
 */

var stream_parser = new _stream2.default.Writable({
  write: function write(chunk, encoding, next) {
    var data = JSON.parse(chunk.toString());

    if (data.stream) {
      data.stream = data.stream.replace(/\n$/, '');
      Log.info(data.stream);
    } else {
      Log.info(_chalk2.default.blue('RAW: ') + JSON.stringify(data));
    }

    next();
  }
});

/**
 * Log writing system.
 */

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: 'info',

    /**
     * Log a message with blue (Docker) prefix. The message will not be chalked automatically.
     *
     * @param msg the message
     */
    value: function info(msg) {
      Log._log(_chalk2.default.blue('(Docker) ') + msg);
    }

    /**
     * Log a message with red (Docker) prefix. The msg will also be red.
     *
     * @param msg the message
     */

  }, {
    key: 'error',
    value: function error(msg) {
      Log._log(_chalk2.default.red('(Docker) ' + msg));
    }

    /**
     * Log the msg and prepend it with a timestamp in the format of [HH:mm:ss].
     *
     * @param msg the message
     * @private
     */

  }, {
    key: '_log',
    value: function _log(msg) {
      var time = (0, _moment2.default)().format('HH:mm:ss');
      console.log('[' + _chalk2.default.gray(time) + '] ' + msg);
    }
  }]);

  return Log;
}();

exports.NameBuilder = NameBuilder;
exports.ImageBuilder = ImageBuilder;
exports.ImageRemover = ImageRemover;
exports.ImagePusher = ImagePusher;
exports.EZDocker = EZDocker;
exports.Log = Log;
exports.stream_parser = stream_parser;
exports.default = EZDocker;
//# sourceMappingURL=ezdocker.js.map

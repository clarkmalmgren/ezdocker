'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tarUtils = require('./tar-utils');

var _tarUtils2 = _interopRequireDefault(_tarUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageBuilder = function () {
  function ImageBuilder(ezdocker) {
    _classCallCheck(this, ImageBuilder);

    this._repo = undefined;
    this._tag = undefined;
    this._paths = {};
    this._ezdocker = ezdocker;
  }

  _createClass(ImageBuilder, [{
    key: 'repository',
    value: function repository(repo) {
      this._repo = repo;
      return this;
    }
  }, {
    key: 'tag',
    value: function tag(_tag) {
      this._tag = _tag;
      return this;
    }
  }, {
    key: 'addPath',
    value: function addPath(src, dest) {
      this._paths[src] = dest || '.';
      return this;
    }
  }, {
    key: 'getFullTag',
    value: function getFullTag() {
      return this._repo + ':' + this._tag;
    }
  }, {
    key: 'build',
    value: function build() {
      return this._ezdocker.buildImage(this);
    }
  }]);

  return ImageBuilder;
}();

var EZDocker = function () {
  function EZDocker(connectionOpts, docker) {
    var tarUtils = arguments.length <= 2 || arguments[2] === undefined ? new _tarUtils2.default() : arguments[2];

    _classCallCheck(this, EZDocker);

    this._docker = docker || new _dockerode2.default(connectionOpts);
    this._tarUtils = tarUtils;
  }

  _createClass(EZDocker, [{
    key: 'imageBuilder',
    value: function imageBuilder() {
      return new ImageBuilder(this);
    }
  }, {
    key: 'buildImage',
    value: function buildImage(imageBuilder) {
      var _this = this;

      return this._tarUtils.all(imageBuilder._paths).then(function (stream) {
        return new Promise(function (resolve, reject) {
          _this._docker.buildImage(stream, { t: imageBuilder.getFullTag() }, function (error, response) {
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
  }, {
    key: 'removeImages',
    value: function removeImages(repository) {
      var _this2 = this;

      return this.listImages(repository).then(function (images) {
        return Promise.all(_lodash2.default.map(images, function (imageInfo) {
          return _this2.removeImage(imageInfo.Id);
        }));
      });
    }
  }, {
    key: 'listImages',
    value: function listImages(repository) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._docker.listImages({ filter: repository }, function (error, response) {
          if (error) {
            console.log(_chalk2.default.red('(Docker) Listing Docker Images Failed: ' + error.message));
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
    }
  }, {
    key: 'removeImage',
    value: function removeImage(id) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._docker.getImage(id).remove({}, function (error, response) {
          if (error) {
            if (error.statusCode == 404) {
              console.log(_chalk2.default.blue('(Docker) ') + 'No docker images to remove.');
            } else {
              console.log(_chalk2.default.red('(Docker) Removing Docker Image Failed: ' + error.message));
              reject(error);
            }
          } else {
            console.log(_chalk2.default.blue('(Docker) ') + 'Removing Image ' + id);
            _lodash2.default.forEach(response, function (step) {
              _lodash2.default.forEach(step, function (target, action) {
                console.log(_chalk2.default.blue('(Docker)   ') + action + ' ' + target);
              });
            });
            resolve();
          }
        });
      });
    }
  }, {
    key: 'pushImages',
    value: function pushImages(repository) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5._docker.getImage(repository).push({}, function (error, response) {
          if (error) {
            console.log(_chalk2.default.red('(Docker) Pushing Docker Image(s) Failed: ' + error.message));
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

var stream_parser = new _stream2.default.Writable({
  write: function write(chunk, encoding, next) {
    var data = JSON.parse(chunk.toString());

    var msg = '';
    if (data.stream) {
      data.stream = data.stream.replace(/\n$/, '');
      msg += _chalk2.default.blue('(Docker) ') + data.stream;
    } else {
      msg += _chalk2.default.blue('(Docker RAW) ') + JSON.stringify(data);
    }

    console.log(msg);
    next();
  }
});

/* TODO: Figure out how to do this with a proper ES6 export */
module.exports = EZDocker;
//# sourceMappingURL=ezdocker.js.map

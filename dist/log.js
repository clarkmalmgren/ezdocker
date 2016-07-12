'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

exports.default = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNTTs7Ozs7Ozs7Ozs7Ozt5QkFPUSxLQUFLO0FBQ2YsVUFBSSxJQUFKLENBQVMsZ0JBQU0sSUFBTixDQUFXLFdBQVgsSUFBMEIsR0FBMUIsQ0FBVCxDQURlOzs7Ozs7Ozs7OzswQkFTSixLQUFLO0FBQ2hCLFVBQUksSUFBSixDQUFTLGdCQUFNLEdBQU4sQ0FBVSxjQUFjLEdBQWQsQ0FBbkIsRUFEZ0I7Ozs7Ozs7Ozs7Ozt5QkFVTixLQUFLO0FBQ2YsVUFBSSxPQUFPLHdCQUFTLE1BQVQsQ0FBZ0IsVUFBaEIsQ0FBUCxDQURXO0FBRWYsY0FBUSxHQUFSLE9BQWdCLGdCQUFNLElBQU4sQ0FBVyxJQUFYLFdBQXFCLEdBQXJDLEVBRmU7Ozs7U0ExQmI7OztrQkFnQ1MiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuLyoqXG4gKiBMb2cgd3JpdGluZyBzeXN0ZW0uXG4gKi9cbmNsYXNzIExvZyB7XG5cbiAgLyoqXG4gICAqIExvZyBhIG1lc3NhZ2Ugd2l0aCBibHVlIChEb2NrZXIpIHByZWZpeC4gVGhlIG1lc3NhZ2Ugd2lsbCBub3QgYmUgY2hhbGtlZCBhdXRvbWF0aWNhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgaW5mbyhtc2cpIHtcbiAgICBMb2cuX2xvZyhjaGFsay5ibHVlKCcoRG9ja2VyKSAnKSArIG1zZyk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgbWVzc2FnZSB3aXRoIHJlZCAoRG9ja2VyKSBwcmVmaXguIFRoZSBtc2cgd2lsbCBhbHNvIGJlIHJlZC5cbiAgICpcbiAgICogQHBhcmFtIG1zZyB0aGUgbWVzc2FnZVxuICAgKi9cbiAgc3RhdGljIGVycm9yKG1zZykge1xuICAgIExvZy5fbG9nKGNoYWxrLnJlZCgnKERvY2tlcikgJyArIG1zZykpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyB0aGUgbXNnIGFuZCBwcmVwZW5kIGl0IHdpdGggYSB0aW1lc3RhbXAgaW4gdGhlIGZvcm1hdCBvZiBbSEg6bW06c3NdLlxuICAgKlxuICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGF0aWMgX2xvZyhtc2cpIHtcbiAgICBsZXQgdGltZSA9IG1vbWVudCgpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICBjb25zb2xlLmxvZyhgWyR7Y2hhbGsuZ3JheSh0aW1lKX1dICR7bXNnfWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZzsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

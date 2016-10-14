'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZy5qcyJdLCJuYW1lcyI6WyJMb2ciLCJtc2ciLCJfbG9nIiwiYmx1ZSIsInJlZCIsInRpbWUiLCJmb3JtYXQiLCJjb25zb2xlIiwibG9nIiwiZ3JheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7SUFHTUEsRzs7Ozs7Ozs7O0FBRUo7Ozs7O3lCQUtZQyxHLEVBQUs7QUFDZkQsVUFBSUUsSUFBSixDQUFTLGdCQUFNQyxJQUFOLENBQVcsV0FBWCxJQUEwQkYsR0FBbkM7QUFDRDs7QUFFRDs7Ozs7Ozs7MEJBS2FBLEcsRUFBSztBQUNoQkQsVUFBSUUsSUFBSixDQUFTLGdCQUFNRSxHQUFOLENBQVUsY0FBY0gsR0FBeEIsQ0FBVDtBQUNEOztBQUVEOzs7Ozs7Ozs7eUJBTVlBLEcsRUFBSztBQUNmLFVBQUlJLE9BQU8sd0JBQVNDLE1BQVQsQ0FBZ0IsVUFBaEIsQ0FBWDtBQUNBQyxjQUFRQyxHQUFSLE9BQWdCLGdCQUFNQyxJQUFOLENBQVdKLElBQVgsQ0FBaEIsVUFBcUNKLEdBQXJDO0FBQ0Q7Ozs7OztrQkFHWUQsRyIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG4vKipcbiAqIExvZyB3cml0aW5nIHN5c3RlbS5cbiAqL1xuY2xhc3MgTG9nIHtcblxuICAvKipcbiAgICogTG9nIGEgbWVzc2FnZSB3aXRoIGJsdWUgKERvY2tlcikgcHJlZml4LiBUaGUgbWVzc2FnZSB3aWxsIG5vdCBiZSBjaGFsa2VkIGF1dG9tYXRpY2FsbHkuXG4gICAqXG4gICAqIEBwYXJhbSBtc2cgdGhlIG1lc3NhZ2VcbiAgICovXG4gIHN0YXRpYyBpbmZvKG1zZykge1xuICAgIExvZy5fbG9nKGNoYWxrLmJsdWUoJyhEb2NrZXIpICcpICsgbXNnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2cgYSBtZXNzYWdlIHdpdGggcmVkIChEb2NrZXIpIHByZWZpeC4gVGhlIG1zZyB3aWxsIGFsc28gYmUgcmVkLlxuICAgKlxuICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgTG9nLl9sb2coY2hhbGsucmVkKCcoRG9ja2VyKSAnICsgbXNnKSk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIHRoZSBtc2cgYW5kIHByZXBlbmQgaXQgd2l0aCBhIHRpbWVzdGFtcCBpbiB0aGUgZm9ybWF0IG9mIFtISDptbTpzc10uXG4gICAqXG4gICAqIEBwYXJhbSBtc2cgdGhlIG1lc3NhZ2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXRpYyBfbG9nKG1zZykge1xuICAgIGxldCB0aW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgIGNvbnNvbGUubG9nKGBbJHtjaGFsay5ncmF5KHRpbWUpfV0gJHttc2d9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nOyJdfQ==

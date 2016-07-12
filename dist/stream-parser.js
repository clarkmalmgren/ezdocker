'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return new _stream2.default.Writable({
    write: function write(chunk, encoding, next) {
      var data = JSON.parse(chunk.toString());

      if (data.stream) {
        data.stream = data.stream.replace(/\n$/, '');
        _log2.default.info(data.stream);
      } else {
        _log2.default.info(_chalk2.default.blue('RAW: ') + JSON.stringify(data));
      }

      next();
    }
  });
};

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1wYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQVVlLFlBQVU7QUFDdkIsU0FBTyxJQUFJLGlCQUFPLFFBQVAsQ0FBZ0I7QUFDekIsV0FBTyxlQUFVLEtBQVYsRUFBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDdEMsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQU0sUUFBTixFQUFYLENBQVAsQ0FEa0M7O0FBR3RDLFVBQUksS0FBSyxNQUFMLEVBQWE7QUFDZixhQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLEtBQXBCLEVBQTJCLEVBQTNCLENBQWQsQ0FEZTtBQUVmLHNCQUFJLElBQUosQ0FBUyxLQUFLLE1BQUwsQ0FBVCxDQUZlO09BQWpCLE1BR087QUFDTCxzQkFBSSxJQUFKLENBQVMsZ0JBQU0sSUFBTixDQUFXLE9BQVgsSUFBc0IsS0FBSyxTQUFMLENBQWUsSUFBZixDQUF0QixDQUFULENBREs7T0FIUDs7QUFPQSxhQVZzQztLQUFqQztHQURGLENBQVAsQ0FEdUI7Q0FBViIsImZpbGUiOiJzdHJlYW0tcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHN0cmVhbSBmcm9tICdzdHJlYW0nO1xuXG4vKipcbiAqIFdyaXRhYmxlIG91dHB1dCBzdHJlYW0gdGhhdCByZWFkcyBhbmQgdHJhbnNwb3NlcyBtZXNzYWdlcyBmcm9tIHRoZSBkb2NrZXIgaG9zdCBpbnRvIHJlYWRhYmxlIG1lc3NhZ2VzXG4gKiB0aGF0IGdldCBwcmludGVkIG91dCB0byBTVERPVVQuXG4gKlxuICogQHR5cGUge3N0cmVhbS5Xcml0YWJsZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIG5ldyBzdHJlYW0uV3JpdGFibGUoe1xuICAgIHdyaXRlOiBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBuZXh0KSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoY2h1bmsudG9TdHJpbmcoKSk7XG5cbiAgICAgIGlmIChkYXRhLnN0cmVhbSkge1xuICAgICAgICBkYXRhLnN0cmVhbSA9IGRhdGEuc3RyZWFtLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICAgIExvZy5pbmZvKGRhdGEuc3RyZWFtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIExvZy5pbmZvKGNoYWxrLmJsdWUoJ1JBVzogJykgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICB9XG5cbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

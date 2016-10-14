'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return new _stream2.default.Writable({
    write: function write(chunk, encoding, next) {
      chunk.toString().trim().split('\n').forEach(function (line) {
        var data = JSON.parse(line);

        if (data.stream) {
          data.stream = data.stream.replace(/\n$/, '');
          _log2.default.info(data.stream);
        } else {
          _log2.default.info(_chalk2.default.blue('RAW: ') + JSON.stringify(data));
        }
      });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1wYXJzZXIuanMiXSwibmFtZXMiOlsiV3JpdGFibGUiLCJ3cml0ZSIsImNodW5rIiwiZW5jb2RpbmciLCJuZXh0IiwidG9TdHJpbmciLCJ0cmltIiwic3BsaXQiLCJmb3JFYWNoIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImxpbmUiLCJzdHJlYW0iLCJyZXBsYWNlIiwiaW5mbyIsImJsdWUiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFVZSxZQUFVO0FBQ3ZCLFNBQU8sSUFBSSxpQkFBT0EsUUFBWCxDQUFvQjtBQUN6QkMsV0FBTyxlQUFVQyxLQUFWLEVBQWlCQyxRQUFqQixFQUEyQkMsSUFBM0IsRUFBaUM7QUFDdENGLFlBQU1HLFFBQU4sR0FBaUJDLElBQWpCLEdBQXdCQyxLQUF4QixDQUE4QixJQUE5QixFQUFvQ0MsT0FBcEMsQ0FBNEMsZ0JBQVE7QUFDbEQsWUFBSUMsT0FBT0MsS0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQVg7O0FBRUEsWUFBSUgsS0FBS0ksTUFBVCxFQUFpQjtBQUNmSixlQUFLSSxNQUFMLEdBQWNKLEtBQUtJLE1BQUwsQ0FBWUMsT0FBWixDQUFvQixLQUFwQixFQUEyQixFQUEzQixDQUFkO0FBQ0Esd0JBQUlDLElBQUosQ0FBU04sS0FBS0ksTUFBZDtBQUNELFNBSEQsTUFHTztBQUNMLHdCQUFJRSxJQUFKLENBQVMsZ0JBQU1DLElBQU4sQ0FBVyxPQUFYLElBQXNCTixLQUFLTyxTQUFMLENBQWVSLElBQWYsQ0FBL0I7QUFDRDtBQUNGLE9BVEQ7O0FBV0FMO0FBQ0Q7QUFkd0IsR0FBcEIsQ0FBUDtBQWdCRCxDOztBQTNCRDs7OztBQUNBOzs7O0FBQ0EiLCJmaWxlIjoic3RyZWFtLXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBzdHJlYW0gZnJvbSAnc3RyZWFtJztcblxuLyoqXG4gKiBXcml0YWJsZSBvdXRwdXQgc3RyZWFtIHRoYXQgcmVhZHMgYW5kIHRyYW5zcG9zZXMgbWVzc2FnZXMgZnJvbSB0aGUgZG9ja2VyIGhvc3QgaW50byByZWFkYWJsZSBtZXNzYWdlc1xuICogdGhhdCBnZXQgcHJpbnRlZCBvdXQgdG8gU1RET1VULlxuICpcbiAqIEB0eXBlIHtzdHJlYW0uV3JpdGFibGV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCl7XG4gIHJldHVybiBuZXcgc3RyZWFtLldyaXRhYmxlKHtcbiAgICB3cml0ZTogZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgbmV4dCkge1xuICAgICAgY2h1bmsudG9TdHJpbmcoKS50cmltKCkuc3BsaXQoJ1xcbicpLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShsaW5lKTtcblxuICAgICAgICBpZiAoZGF0YS5zdHJlYW0pIHtcbiAgICAgICAgICBkYXRhLnN0cmVhbSA9IGRhdGEuc3RyZWFtLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICAgICAgTG9nLmluZm8oZGF0YS5zdHJlYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIExvZy5pbmZvKGNoYWxrLmJsdWUoJ1JBVzogJykgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==

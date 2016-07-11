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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1wYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQVVlLFlBQVU7QUFDdkIsU0FBTyxJQUFJLGlCQUFPLFFBQVgsQ0FBb0I7QUFDekIsV0FBTyxlQUFVLEtBQVYsRUFBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDdEMsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQU0sUUFBTixFQUFYLENBQVg7O0FBRUEsVUFBSSxLQUFLLE1BQVQsRUFBaUI7QUFDZixhQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLEtBQXBCLEVBQTJCLEVBQTNCLENBQWQ7QUFDQSxzQkFBSSxJQUFKLENBQVMsS0FBSyxNQUFkO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsc0JBQUksSUFBSixDQUFTLGdCQUFNLElBQU4sQ0FBVyxPQUFYLElBQXNCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBL0I7QUFDRDs7QUFFRDtBQUNEO0FBWndCLEdBQXBCLENBQVA7QUFjRCxDOztBQXpCRDs7OztBQUNBOzs7O0FBQ0EiLCJmaWxlIjoic3RyZWFtLXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBzdHJlYW0gZnJvbSAnc3RyZWFtJztcblxuLyoqXG4gKiBXcml0YWJsZSBvdXRwdXQgc3RyZWFtIHRoYXQgcmVhZHMgYW5kIHRyYW5zcG9zZXMgbWVzc2FnZXMgZnJvbSB0aGUgZG9ja2VyIGhvc3QgaW50byByZWFkYWJsZSBtZXNzYWdlc1xuICogdGhhdCBnZXQgcHJpbnRlZCBvdXQgdG8gU1RET1VULlxuICpcbiAqIEB0eXBlIHtzdHJlYW0uV3JpdGFibGV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCl7XG4gIHJldHVybiBuZXcgc3RyZWFtLldyaXRhYmxlKHtcbiAgICB3cml0ZTogZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgbmV4dCkge1xuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGNodW5rLnRvU3RyaW5nKCkpO1xuXG4gICAgICBpZiAoZGF0YS5zdHJlYW0pIHtcbiAgICAgICAgZGF0YS5zdHJlYW0gPSBkYXRhLnN0cmVhbS5yZXBsYWNlKC9cXG4kLywgJycpO1xuICAgICAgICBMb2cuaW5mbyhkYXRhLnN0cmVhbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMb2cuaW5mbyhjaGFsay5ibHVlKCdSQVc6ICcpICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgfVxuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

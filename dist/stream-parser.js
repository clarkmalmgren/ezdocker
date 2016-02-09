'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Writable output stream that reads and transposes messages from the docker host into readable messages
 * that get printed out to STDOUT.
 *
 * @type {stream.Writable}
 */
exports.default = new _stream2.default.Writable({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1wYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBVWUsSUFBSSxpQkFBTyxRQUFQLENBQWdCO0FBQ2pDLFNBQU8sZUFBVSxLQUFWLEVBQWlCLFFBQWpCLEVBQTJCLElBQTNCLEVBQWlDO0FBQ3RDLFFBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFNLFFBQU4sRUFBWCxDQUFQLENBRGtDOztBQUd0QyxRQUFJLEtBQUssTUFBTCxFQUFhO0FBQ2YsV0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixLQUFwQixFQUEyQixFQUEzQixDQUFkLENBRGU7QUFFZixvQkFBSSxJQUFKLENBQVMsS0FBSyxNQUFMLENBQVQsQ0FGZTtLQUFqQixNQUdPO0FBQ0wsb0JBQUksSUFBSixDQUFTLGdCQUFNLElBQU4sQ0FBVyxPQUFYLElBQXNCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBdEIsQ0FBVCxDQURLO0tBSFA7O0FBT0EsV0FWc0M7R0FBakM7Q0FETSIsImZpbGUiOiJzdHJlYW0tcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHN0cmVhbSBmcm9tICdzdHJlYW0nO1xuXG4vKipcbiAqIFdyaXRhYmxlIG91dHB1dCBzdHJlYW0gdGhhdCByZWFkcyBhbmQgdHJhbnNwb3NlcyBtZXNzYWdlcyBmcm9tIHRoZSBkb2NrZXIgaG9zdCBpbnRvIHJlYWRhYmxlIG1lc3NhZ2VzXG4gKiB0aGF0IGdldCBwcmludGVkIG91dCB0byBTVERPVVQuXG4gKlxuICogQHR5cGUge3N0cmVhbS5Xcml0YWJsZX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgbmV3IHN0cmVhbS5Xcml0YWJsZSh7XG4gIHdyaXRlOiBmdW5jdGlvbiAoY2h1bmssIGVuY29kaW5nLCBuZXh0KSB7XG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGNodW5rLnRvU3RyaW5nKCkpO1xuXG4gICAgaWYgKGRhdGEuc3RyZWFtKSB7XG4gICAgICBkYXRhLnN0cmVhbSA9IGRhdGEuc3RyZWFtLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICBMb2cuaW5mbyhkYXRhLnN0cmVhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIExvZy5pbmZvKGNoYWxrLmJsdWUoJ1JBVzogJykgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

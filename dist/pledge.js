'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Extensible abstract class that provides promise functionality. Implementations must override and implement
 * the `start(resolve, reject)` function.
 *
 * @example
 * class ExamplePromise extends Pledge {
 *
 *   name(name) {
 *     this._name = name;
 *     return this;
 *   }
 *
 *   start(resolve, reject) {
 *     resolve(this._name);
 *   }
 * }
 *
 * new ExamplePromise()
 *    .name('George Washington')
 *    .then((name) => { console.log(`Name: ${name}`) } );
 */

var Pledge = function () {

  /**
   * Constructor
   */

  function Pledge() {
    var _this = this;

    _classCallCheck(this, Pledge);

    this._promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        _this._execute(resolve, reject);
      }, 1);
    });
  }

  /**
   * Chain an action to occur after this promise is resolved (or rejected). No more
   * non-promise-specific language chains can occur after this.
   *
   * @param {function} [onFulfilled] executed on fulfillment
   * @param {function} [onRejected] executed on rejection
   * @return {Pledge} this
   */

  _createClass(Pledge, [{
    key: 'then',
    value: function then(onFulfilled, onRejected) {
      return this._promise.then(onFulfilled, onRejected);
    }

    /**
     * Chain an action to occur after this promise is rejected. No more
     * non-promise-specific language chains can occur after this.
     *
     * @param {function} [onRejected] executed on rejection
     * @return {Promise} the underlying promise
     */

  }, {
    key: 'catch',
    value: function _catch(onRejected) {
      return this._promise.catch(onFulfilled, onRejected);
    }

    /**
     *
     * @param {function} resolve invoke this function to resolve the promise
     * @param {function} reject invoke this function to reject the promise
     * @private
     */

  }, {
    key: '_execute',
    value: function _execute(resolve, reject) {
      try {
        var response = this._start(resolve, reject);

        if (response && typeof response.then == 'function') {
          response.then(function (data) {
            return resolve(data);
          }).catch(function (error) {
            return reject(error);
          });
        }
      } catch (e) {
        reject(e);
      }
    }

    /**
     * Either needs to return a promise or call resolve/reject. If this returns a
     * promise, Pledge will automatically wire it up so that the pledge resolves when
     * the returned promise resolves and rejects when the returned promise rejects.
     *
     * @param {function} resolve invoke this function to resolve the promise
     * @param {function} reject invoke this function to reject the promise
     *
     * @abstract
     * @private
     */

  }, {
    key: '_start',
    value: function _start(resolve, reject) {
      reject(new TypeError('Must override start function'));
    }
  }]);

  return Pledge;
}();

exports.default = Pledge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsZWRnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCTTs7Ozs7O0FBS0osV0FMSSxNQUtKLEdBQWM7OzswQkFMVixRQUtVOztBQUNaLFNBQUssUUFBTCxHQUFnQixJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLGlCQUFXLFlBQU07QUFBRSxjQUFLLFFBQUwsQ0FBYyxPQUFkLEVBQXVCLE1BQXZCLEVBQUY7T0FBTixFQUEyQyxDQUF0RCxFQUQrQztLQUFyQixDQUE1QixDQURZO0dBQWQ7Ozs7Ozs7Ozs7O2VBTEk7O3lCQW1CQyxhQUFhLFlBQVk7QUFDNUIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLFVBQWhDLENBQVAsQ0FENEI7Ozs7Ozs7Ozs7Ozs7MkJBV3hCLFlBQVk7QUFDaEIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFdBQXBCLEVBQWlDLFVBQWpDLENBQVAsQ0FEZ0I7Ozs7Ozs7Ozs7Ozs2QkFVVCxTQUFTLFFBQVE7QUFDeEIsVUFBSTtBQUNGLFlBQUksV0FBVyxLQUFLLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLE1BQXJCLENBQVgsQ0FERjs7QUFHRixZQUFJLFlBQVksT0FBTyxTQUFTLElBQVQsSUFBaUIsVUFBeEIsRUFBb0M7QUFDbEQsbUJBQ0csSUFESCxDQUNRLFVBQUMsSUFBRDttQkFBVSxRQUFRLElBQVI7V0FBVixDQURSLENBRUcsS0FGSCxDQUVTLFVBQUMsS0FBRDttQkFBVyxPQUFPLEtBQVA7V0FBWCxDQUZULENBRGtEO1NBQXBEO09BSEYsQ0FRRSxPQUFPLENBQVAsRUFBVTtBQUNWLGVBQU8sQ0FBUCxFQURVO09BQVY7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQWdCRyxTQUFTLFFBQVE7QUFDdEIsYUFBTyxJQUFJLFNBQUosQ0FBYyw4QkFBZCxDQUFQLEVBRHNCOzs7O1NBakVwQjs7O2tCQXVFUyIsImZpbGUiOiJwbGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVuc2libGUgYWJzdHJhY3QgY2xhc3MgdGhhdCBwcm92aWRlcyBwcm9taXNlIGZ1bmN0aW9uYWxpdHkuIEltcGxlbWVudGF0aW9ucyBtdXN0IG92ZXJyaWRlIGFuZCBpbXBsZW1lbnRcbiAqIHRoZSBgc3RhcnQocmVzb2x2ZSwgcmVqZWN0KWAgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGNsYXNzIEV4YW1wbGVQcm9taXNlIGV4dGVuZHMgUGxlZGdlIHtcbiAqXG4gKiAgIG5hbWUobmFtZSkge1xuICogICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICogICAgIHJldHVybiB0aGlzO1xuICogICB9XG4gKlxuICogICBzdGFydChyZXNvbHZlLCByZWplY3QpIHtcbiAqICAgICByZXNvbHZlKHRoaXMuX25hbWUpO1xuICogICB9XG4gKiB9XG4gKlxuICogbmV3IEV4YW1wbGVQcm9taXNlKClcbiAqICAgIC5uYW1lKCdHZW9yZ2UgV2FzaGluZ3RvbicpXG4gKiAgICAudGhlbigobmFtZSkgPT4geyBjb25zb2xlLmxvZyhgTmFtZTogJHtuYW1lfWApIH0gKTtcbiAqL1xuY2xhc3MgUGxlZGdlIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5fZXhlY3V0ZShyZXNvbHZlLCByZWplY3QpOyB9LCAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFpbiBhbiBhY3Rpb24gdG8gb2NjdXIgYWZ0ZXIgdGhpcyBwcm9taXNlIGlzIHJlc29sdmVkIChvciByZWplY3RlZCkuIE5vIG1vcmVcbiAgICogbm9uLXByb21pc2Utc3BlY2lmaWMgbGFuZ3VhZ2UgY2hhaW5zIGNhbiBvY2N1ciBhZnRlciB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25GdWxmaWxsZWRdIGV4ZWN1dGVkIG9uIGZ1bGZpbGxtZW50XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvblJlamVjdGVkXSBleGVjdXRlZCBvbiByZWplY3Rpb25cbiAgICogQHJldHVybiB7UGxlZGdlfSB0aGlzXG4gICAqL1xuICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhaW4gYW4gYWN0aW9uIHRvIG9jY3VyIGFmdGVyIHRoaXMgcHJvbWlzZSBpcyByZWplY3RlZC4gTm8gbW9yZVxuICAgKiBub24tcHJvbWlzZS1zcGVjaWZpYyBsYW5ndWFnZSBjaGFpbnMgY2FuIG9jY3VyIGFmdGVyIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvblJlamVjdGVkXSBleGVjdXRlZCBvbiByZWplY3Rpb25cbiAgICogQHJldHVybiB7UHJvbWlzZX0gdGhlIHVuZGVybHlpbmcgcHJvbWlzZVxuICAgKi9cbiAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlLmNhdGNoKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlIGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIHByb21pc2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVqZWN0IGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V4ZWN1dGUocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuX3N0YXJ0KHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiB0eXBlb2YgcmVzcG9uc2UudGhlbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3BvbnNlXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVqZWN0KGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFaXRoZXIgbmVlZHMgdG8gcmV0dXJuIGEgcHJvbWlzZSBvciBjYWxsIHJlc29sdmUvcmVqZWN0LiBJZiB0aGlzIHJldHVybnMgYVxuICAgKiBwcm9taXNlLCBQbGVkZ2Ugd2lsbCBhdXRvbWF0aWNhbGx5IHdpcmUgaXQgdXAgc28gdGhhdCB0aGUgcGxlZGdlIHJlc29sdmVzIHdoZW5cbiAgICogdGhlIHJldHVybmVkIHByb21pc2UgcmVzb2x2ZXMgYW5kIHJlamVjdHMgd2hlbiB0aGUgcmV0dXJuZWQgcHJvbWlzZSByZWplY3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlIGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIHByb21pc2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVqZWN0IGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdGFydChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWplY3QobmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSBzdGFydCBmdW5jdGlvbicpKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsZWRnZTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

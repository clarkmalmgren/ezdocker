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
        var response = this.start(resolve, reject);

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
     */

  }, {
    key: 'start',
    value: function start(resolve, reject) {
      reject(new TypeError('Must override start function'));
    }
  }]);

  return Pledge;
}();

exports.default = Pledge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsZWRnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCTTs7Ozs7O0FBS0osV0FMSSxNQUtKLEdBQWM7OzswQkFMVixRQUtVOztBQUNaLFNBQUssUUFBTCxHQUFnQixJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLGlCQUFXLFlBQU07QUFBRSxjQUFLLFFBQUwsQ0FBYyxPQUFkLEVBQXVCLE1BQXZCLEVBQUY7T0FBTixFQUEyQyxDQUF0RCxFQUQrQztLQUFyQixDQUE1QixDQURZO0dBQWQ7Ozs7Ozs7Ozs7O2VBTEk7O3lCQW1CQyxhQUFhLFlBQVk7QUFDNUIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFdBQW5CLEVBQWdDLFVBQWhDLENBQVAsQ0FENEI7Ozs7Ozs7Ozs7Ozs7MkJBV3hCLFlBQVk7QUFDaEIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFdBQXBCLEVBQWlDLFVBQWpDLENBQVAsQ0FEZ0I7Ozs7Ozs7Ozs7Ozs2QkFVVCxTQUFTLFFBQVE7QUFDeEIsVUFBSTtBQUNGLFlBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CLE1BQXBCLENBQVgsQ0FERjs7QUFHRixZQUFJLFlBQVksT0FBTyxTQUFTLElBQVQsSUFBaUIsVUFBeEIsRUFBb0M7QUFDbEQsbUJBQ0csSUFESCxDQUNRLFVBQUMsSUFBRDttQkFBVSxRQUFRLElBQVI7V0FBVixDQURSLENBRUcsS0FGSCxDQUVTLFVBQUMsS0FBRDttQkFBVyxPQUFPLEtBQVA7V0FBWCxDQUZULENBRGtEO1NBQXBEO09BSEYsQ0FRRSxPQUFPLENBQVAsRUFBVTtBQUNWLGVBQU8sQ0FBUCxFQURVO09BQVY7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBZUUsU0FBUyxRQUFRO0FBQ3JCLGFBQU8sSUFBSSxTQUFKLENBQWMsOEJBQWQsQ0FBUCxFQURxQjs7OztTQWhFbkI7OztrQkFzRVMiLCJmaWxlIjoicGxlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlbnNpYmxlIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgcHJvbWlzZSBmdW5jdGlvbmFsaXR5LiBJbXBsZW1lbnRhdGlvbnMgbXVzdCBvdmVycmlkZSBhbmQgaW1wbGVtZW50XG4gKiB0aGUgYHN0YXJ0KHJlc29sdmUsIHJlamVjdClgIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjbGFzcyBFeGFtcGxlUHJvbWlzZSBleHRlbmRzIFBsZWRnZSB7XG4gKlxuICogICBuYW1lKG5hbWUpIHtcbiAqICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAqICAgICByZXR1cm4gdGhpcztcbiAqICAgfVxuICpcbiAqICAgc3RhcnQocmVzb2x2ZSwgcmVqZWN0KSB7XG4gKiAgICAgcmVzb2x2ZSh0aGlzLl9uYW1lKTtcbiAqICAgfVxuICogfVxuICpcbiAqIG5ldyBFeGFtcGxlUHJvbWlzZSgpXG4gKiAgICAubmFtZSgnR2VvcmdlIFdhc2hpbmd0b24nKVxuICogICAgLnRoZW4oKG5hbWUpID0+IHsgY29uc29sZS5sb2coYE5hbWU6ICR7bmFtZX1gKSB9ICk7XG4gKi9cbmNsYXNzIFBsZWRnZSB7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuX2V4ZWN1dGUocmVzb2x2ZSwgcmVqZWN0KTsgfSwgMSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhaW4gYW4gYWN0aW9uIHRvIG9jY3VyIGFmdGVyIHRoaXMgcHJvbWlzZSBpcyByZXNvbHZlZCAob3IgcmVqZWN0ZWQpLiBObyBtb3JlXG4gICAqIG5vbi1wcm9taXNlLXNwZWNpZmljIGxhbmd1YWdlIGNoYWlucyBjYW4gb2NjdXIgYWZ0ZXIgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29uRnVsZmlsbGVkXSBleGVjdXRlZCBvbiBmdWxmaWxsbWVudFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25SZWplY3RlZF0gZXhlY3V0ZWQgb24gcmVqZWN0aW9uXG4gICAqIEByZXR1cm4ge1BsZWRnZX0gdGhpc1xuICAgKi9cbiAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYWluIGFuIGFjdGlvbiB0byBvY2N1ciBhZnRlciB0aGlzIHByb21pc2UgaXMgcmVqZWN0ZWQuIE5vIG1vcmVcbiAgICogbm9uLXByb21pc2Utc3BlY2lmaWMgbGFuZ3VhZ2UgY2hhaW5zIGNhbiBvY2N1ciBhZnRlciB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb25SZWplY3RlZF0gZXhlY3V0ZWQgb24gcmVqZWN0aW9uXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IHRoZSB1bmRlcmx5aW5nIHByb21pc2VcbiAgICovXG4gIGNhdGNoKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS5jYXRjaChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZSBpbnZva2UgdGhpcyBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBwcm9taXNlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlamVjdCBpbnZva2UgdGhpcyBmdW5jdGlvbiB0byByZWplY3QgdGhlIHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9leGVjdXRlKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnN0YXJ0KHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiB0eXBlb2YgcmVzcG9uc2UudGhlbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3BvbnNlXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVqZWN0KGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFaXRoZXIgbmVlZHMgdG8gcmV0dXJuIGEgcHJvbWlzZSBvciBjYWxsIHJlc29sdmUvcmVqZWN0LiBJZiB0aGlzIHJldHVybnMgYVxuICAgKiBwcm9taXNlLCBQbGVkZ2Ugd2lsbCBhdXRvbWF0aWNhbGx5IHdpcmUgaXQgdXAgc28gdGhhdCB0aGUgcGxlZGdlIHJlc29sdmVzIHdoZW5cbiAgICogdGhlIHJldHVybmVkIHByb21pc2UgcmVzb2x2ZXMgYW5kIHJlamVjdHMgd2hlbiB0aGUgcmV0dXJuZWQgcHJvbWlzZSByZWplY3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlIGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIHByb21pc2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVqZWN0IGludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHJlamVjdCB0aGUgcHJvbWlzZVxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICovXG4gIHN0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdNdXN0IG92ZXJyaWRlIHN0YXJ0IGZ1bmN0aW9uJykpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxlZGdlOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

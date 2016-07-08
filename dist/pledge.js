'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsZWRnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCTSxNOzs7Ozs7QUFLSixvQkFBYztBQUFBOztBQUFBOztBQUNaLFNBQUssUUFBTCxHQUFnQixJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQy9DLGlCQUFXLFlBQU07QUFBRSxjQUFLLFFBQUwsQ0FBYyxPQUFkLEVBQXVCLE1BQXZCO0FBQWlDLE9BQXBELEVBQXNELENBQXREO0FBQ0QsS0FGZSxDQUFoQjtBQUdEOzs7Ozs7Ozs7Ozs7Ozt5QkFVSSxXLEVBQWEsVSxFQUFZO0FBQzVCLGFBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixXQUFuQixFQUFnQyxVQUFoQyxDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OzsyQkFTSyxVLEVBQVk7QUFDaEIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFdBQXBCLEVBQWlDLFVBQWpDLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7NkJBUVEsTyxFQUFTLE0sRUFBUTtBQUN4QixVQUFJO0FBQ0YsWUFBSSxXQUFXLEtBQUssTUFBTCxDQUFZLE9BQVosRUFBcUIsTUFBckIsQ0FBZjs7QUFFQSxZQUFJLFlBQVksT0FBTyxTQUFTLElBQWhCLElBQXdCLFVBQXhDLEVBQW9EO0FBQ2xELG1CQUNHLElBREgsQ0FDUSxVQUFDLElBQUQ7QUFBQSxtQkFBVSxRQUFRLElBQVIsQ0FBVjtBQUFBLFdBRFIsRUFFRyxLQUZILENBRVMsVUFBQyxLQUFEO0FBQUEsbUJBQVcsT0FBTyxLQUFQLENBQVg7QUFBQSxXQUZUO0FBR0Q7QUFDRixPQVJELENBUUUsT0FBTyxDQUFQLEVBQVU7QUFDVixlQUFPLENBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OzJCQWFNLE8sRUFBUyxNLEVBQVE7QUFDdEIsYUFBTyxJQUFJLFNBQUosQ0FBYyw4QkFBZCxDQUFQO0FBQ0Q7Ozs7OztrQkFJWSxNIiwiZmlsZSI6InBsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZW5zaWJsZSBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIHByb21pc2UgZnVuY3Rpb25hbGl0eS4gSW1wbGVtZW50YXRpb25zIG11c3Qgb3ZlcnJpZGUgYW5kIGltcGxlbWVudFxuICogdGhlIGBzdGFydChyZXNvbHZlLCByZWplY3QpYCBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogY2xhc3MgRXhhbXBsZVByb21pc2UgZXh0ZW5kcyBQbGVkZ2Uge1xuICpcbiAqICAgbmFtZShuYW1lKSB7XG4gKiAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gKiAgICAgcmV0dXJuIHRoaXM7XG4gKiAgIH1cbiAqXG4gKiAgIHN0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICogICAgIHJlc29sdmUodGhpcy5fbmFtZSk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBuZXcgRXhhbXBsZVByb21pc2UoKVxuICogICAgLm5hbWUoJ0dlb3JnZSBXYXNoaW5ndG9uJylcbiAqICAgIC50aGVuKChuYW1lKSA9PiB7IGNvbnNvbGUubG9nKGBOYW1lOiAke25hbWV9YCkgfSApO1xuICovXG5jbGFzcyBQbGVkZ2Uge1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLl9leGVjdXRlKHJlc29sdmUsIHJlamVjdCk7IH0sIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYWluIGFuIGFjdGlvbiB0byBvY2N1ciBhZnRlciB0aGlzIHByb21pc2UgaXMgcmVzb2x2ZWQgKG9yIHJlamVjdGVkKS4gTm8gbW9yZVxuICAgKiBub24tcHJvbWlzZS1zcGVjaWZpYyBsYW5ndWFnZSBjaGFpbnMgY2FuIG9jY3VyIGFmdGVyIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvbkZ1bGZpbGxlZF0gZXhlY3V0ZWQgb24gZnVsZmlsbG1lbnRcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29uUmVqZWN0ZWRdIGV4ZWN1dGVkIG9uIHJlamVjdGlvblxuICAgKiBAcmV0dXJuIHtQbGVkZ2V9IHRoaXNcbiAgICovXG4gIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFpbiBhbiBhY3Rpb24gdG8gb2NjdXIgYWZ0ZXIgdGhpcyBwcm9taXNlIGlzIHJlamVjdGVkLiBObyBtb3JlXG4gICAqIG5vbi1wcm9taXNlLXNwZWNpZmljIGxhbmd1YWdlIGNoYWlucyBjYW4gb2NjdXIgYWZ0ZXIgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW29uUmVqZWN0ZWRdIGV4ZWN1dGVkIG9uIHJlamVjdGlvblxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSB0aGUgdW5kZXJseWluZyBwcm9taXNlXG4gICAqL1xuICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2UuY2F0Y2gob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmUgaW52b2tlIHRoaXMgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZWplY3QgaW52b2tlIHRoaXMgZnVuY3Rpb24gdG8gcmVqZWN0IHRoZSBwcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXhlY3V0ZShyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fc3RhcnQocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgICAgaWYgKHJlc3BvbnNlICYmIHR5cGVvZiByZXNwb25zZS50aGVuID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3QoZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVpdGhlciBuZWVkcyB0byByZXR1cm4gYSBwcm9taXNlIG9yIGNhbGwgcmVzb2x2ZS9yZWplY3QuIElmIHRoaXMgcmV0dXJucyBhXG4gICAqIHByb21pc2UsIFBsZWRnZSB3aWxsIGF1dG9tYXRpY2FsbHkgd2lyZSBpdCB1cCBzbyB0aGF0IHRoZSBwbGVkZ2UgcmVzb2x2ZXMgd2hlblxuICAgKiB0aGUgcmV0dXJuZWQgcHJvbWlzZSByZXNvbHZlcyBhbmQgcmVqZWN0cyB3aGVuIHRoZSByZXR1cm5lZCBwcm9taXNlIHJlamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmUgaW52b2tlIHRoaXMgZnVuY3Rpb24gdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZWplY3QgaW52b2tlIHRoaXMgZnVuY3Rpb24gdG8gcmVqZWN0IHRoZSBwcm9taXNlXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0YXJ0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdNdXN0IG92ZXJyaWRlIHN0YXJ0IGZ1bmN0aW9uJykpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxlZGdlOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

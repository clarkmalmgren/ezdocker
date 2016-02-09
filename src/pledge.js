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
class Pledge {

  /**
   * Constructor
   */
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      setTimeout(() => { this._execute(resolve, reject); }, 1);
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
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }

  /**
   * Chain an action to occur after this promise is rejected. No more
   * non-promise-specific language chains can occur after this.
   *
   * @param {function} [onRejected] executed on rejection
   * @return {Promise} the underlying promise
   */
  catch(onRejected) {
    return this._promise.catch(onFulfilled, onRejected);
  }

  /**
   *
   * @param {function} resolve invoke this function to resolve the promise
   * @param {function} reject invoke this function to reject the promise
   * @private
   */
  _execute(resolve, reject) {
    try {
      let response = this._start(resolve, reject);

      if (response && typeof response.then == 'function') {
        response
          .then((data) => resolve(data))
          .catch((error) => reject(error));
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
  _start(resolve, reject) {
    reject(new TypeError('Must override start function'));
  }

}

export default Pledge;
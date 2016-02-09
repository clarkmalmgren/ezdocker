import { expect, sinon } from './test_dependencies';
import Pledge from '../dist/pledge';

class SimplePledge extends Pledge {

  thatFails() {
    this._fails = true;
    return this;
  }

  withPayload(payload) {
    this._payload = payload;
    return this;
  }

  start(resolve, reject) {
    if (this._fails) {
      reject(new Error(this._payload));
    } else {
      resolve(this._payload);
    }
  }
}

class PromisePledge extends Pledge {

  thatFails() {
    this._fails = true;
    return this;
  }

  withPayload(payload) {
    this._payload = payload;
    return this;
  }

  start() {
    return new Promise((resolve, reject) => {
      if (this._fails) {
        reject(new Error(this._payload));
      } else {
        resolve(this._payload);
      }
    })
  }
}

describe('Pledge', () => {

  describe('using just the start function', () => {

    it('should support success', () => {
      return new SimplePledge().withPayload('apple')
        .should.eventually.equal('apple');
    });

    it('should support failure', () => {
      return new SimplePledge().thatFails().withPayload('banana')
        .should.eventually.be.rejectedWith(Error, 'banana');
    });

  });

  describe('returning a promise of its own', () => {

    it('should support success', () => {
      return new PromisePledge().withPayload('apple')
        .should.eventually.equal('apple');
    });

    it('should support failure', () => {
      return new PromisePledge().thatFails().withPayload('banana')
        .should.eventually.be.rejectedWith(Error, 'banana');
    });

  });

  describe('base class', () => {

    it('cannot be called as a function', () => {
      expect(Pledge).to.throw(TypeError);
    });

    it('will automatically fail if start is not overwritten', () => {
      return new Pledge().should.eventually.be.rejectedWith(TypeError, 'Must override start function');
    });
  });

});
import { expect, sinon } from './test_dependencies';
import ImagePusher from '../dist/image-pusher';
import Log from '../dist/log';

describe('ImagePusher', () => {

  beforeEach(() => {
    if (Log._log.restore) {
      Log._log.restore();
    }
    sinon.stub(Log, '_log');
  });

  it('should succeed as a promise', () => {
    // given:
    let response = {
      pipe: sinon.spy(),
      on: sinon.stub().withArgs('end').callsArg(1)
    };

    let image = {
      push: sinon.stub().callsArgWith(1, undefined, response)
    };

    let docker = {
      getImage: sinon.stub().withArgs('gurl').returns(image)
    };

    // when:
    let pusher = new ImagePusher(docker, 'gurl');

    // then:
    return pusher.should.eventually.be.fulfilled
      .then(() => {
        return response.on.should.have.been.called;
      });
  });

  it('should fail as a promise', () => {
    // given:
    let image = {
      push: sinon.stub().callsArgWith(1, new Error('darn'))
    };

    let docker = {
      getImage: sinon.stub().withArgs('gurl').returns(image)
    };

    // when:
    let pusher = new ImagePusher(docker, 'gurl');

    // then:
    return pusher.should.eventually.be.rejectedWith(Error, 'darn');
  });

});
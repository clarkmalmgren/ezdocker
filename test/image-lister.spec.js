import { expect, sinon } from './test_dependencies';
import ImageLister from '../dist/image-lister';
import Log from '../dist/log';

describe('ImageLister', () => {

  beforeEach(() => {
    if (Log._log.restore) {
      Log._log.restore();
    }
    sinon.stub(Log, '_log');
  });

  it('should succeed as a promise', () => {
    // given:
    let images = 'my list of dudes';

    let docker = {
      listImages: sinon.stub()
        .withArgs({filter: 'dude'})
        .callsArgWith(1, undefined, images)
    };

    // when:
    let lister = new ImageLister(docker, 'dude');

    // then:
    return lister.should.eventually.equal('my list of dudes');
  });

  it('should reject as a promise', () => {
    // given:
    let docker = {
      listImages: sinon.stub()
        .withArgs({filter: 'dude'})
        .callsArgWith(1, new Error('blah'))
    };

    // when:
    let lister = new ImageLister(docker, 'dude');


    // then:
    return lister.should.eventually.be.rejectedWith(Error, 'blah');
  });

});
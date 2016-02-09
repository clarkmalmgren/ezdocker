import { expect, sinon } from './test_dependencies';
import ImageRemover from '../dist/image-remover';
import Log from '../dist/log';

describe('ImageRemover', () => {

  beforeEach(() => {
    if (Log._log.restore) {
      Log._log.restore();
    }
    sinon.stub(Log, '_log');
  });

  it('should succeed as a promise', () => {
    // given:
    let images = [
      { Id: 'a' },
      { Id: 'b' }
    ];
    let lister = sinon.stub().resolves(images)();

    let responseA = [
      { '9a34b': 'removed'},
      { '1.1.1': 'un-tagged'}
    ];

    let responseB = [
      { '9a3s3': 'removed'},
      { '1.1.2': 'un-tagged'}
    ];

    let imageA = {
      remove: sinon.stub().callsArgWith(1, undefined, responseA)
    };

    let imageB = {
      remove: sinon.stub().callsArgWith(1, undefined, responseB)
    };

    let docker = {
      getImage: sinon.stub()
    };
    docker.getImage.onCall(0).returns(imageA);
    docker.getImage.onCall(1).returns(imageB);

    // when:
    let remover = new ImageRemover(docker, '', lister);

    // then:
    return remover.should.eventually.be.fulfilled
      .then(() => {
        imageA.remove.should.have.been.called;
        imageB.remove.should.have.been.called;
      });
  });

  it('should succeed as a promise when there is nothing to do', () => {
    // given:
    let images = [ { Id: 'a' } ];
    let lister = sinon.stub().resolves(images)();

    let error = { statusCode: 404 };

    let image = {
      remove: sinon.stub().callsArgWith(1, error)
    };

    let docker = {
      getImage: sinon.stub().withArgs('a').returns(image)
    };

    // when:
    let remover = new ImageRemover(docker, '', lister);

    // then:
    return remover.should.eventually.be.fulfilled;
  });

  it('should reject as a promise on badness', () => {
    // given:
    let images = [ { Id: 'a' } ];
    let lister = sinon.stub().resolves(images)();

    let error = new Error('oh noes');

    let image = {
      remove: sinon.stub().callsArgWith(1, error)
    };

    let docker = {
      getImage: sinon.stub().withArgs('a').returns(image)
    };

    // when:
    let remover = new ImageRemover(docker, '', lister);

    // then:
    return remover.should.eventually.be.rejectedWith(Error, 'oh noes');
  });

});
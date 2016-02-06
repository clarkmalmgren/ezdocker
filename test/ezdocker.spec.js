import { expect, sinon } from './test_dependencies';
import { argv } from 'yargs';
import chalk from 'chalk';
import { NameBuilder, ImageBuilder, ImageRemover, ImagePusher, EZDocker, Log, stream_parser } from '../dist/ezdocker';

describe('NameBuilder', () => {
  it('should build a short name', () => {
    new NameBuilder()
      .registry('there').port('8333').user('me').repo('it').tag('1.0')
      .getShortName().should.equal('there:8333/me/it');
  });

  it('should build a short without a port', () => {
    new NameBuilder()
      .registry('there').user('me').repo('it').tag('1.0')
      .getShortName().should.equal('there/me/it');
  });


  it('should build a long name', () => {
    new NameBuilder()
      .registry('there').port('8333').user('me').repo('it').tag('1.0')
      .getFullName().should.equal('there:8333/me/it:1.0');
  });
});

describe('ImageBuilder', () => {
  it('should add paths', () => {
    let builder = new ImageBuilder();
    builder.addPath('one');
    builder.addPath('two', 'subfolder');

    builder._paths.should.deep.equal({
      'one' : '.',
      'two' : 'subfolder'
    });
  });

  it('should delegate the building back to ezdocker', () => {
    // given:
    let ez = { _buildImage: sinon.spy() };
    let builder = new ImageBuilder(ez);

    // when:
    builder.build();

    // then:
    ez._buildImage.should.have.been.calledWith(builder);
  });
});

describe('ImageRemover', () => {

  it('should delegate the removing back to ezdocker', () => {
    // given:
    let ez = { _removeImages: sinon.spy() };
    let remover = new ImageRemover(ez);

    // when:
    remover.remove();

    // then:
    ez._removeImages.should.have.been.calledWith(remover);
  });

});

describe('ImagePusher', () => {

  it('should delegate the pushing back to ezdocker', () => {
    // given:
    let ez = { _pushImages: sinon.spy() };
    let pusher = new ImagePusher(ez);

    // when:
    pusher.push();

    // then:
    ez._pushImages.should.have.been.calledWith(pusher);
  });

});

describe('EZDocker', () => {

  beforeEach(() => {
    if (Log._log.restore) {
      Log._log.restore();
    }
    sinon.stub(Log, '_log');
  });

  it('can be newed', () => {
    let ez = new EZDocker();
    return ez.should.exist;
  });

  it('can be created from arguments', () => {
    // given:
    let args = {docker: {host: 'compy.386'}}; // Strong Bad???

    // when:
    let ez = EZDocker.createFromArgs(args);

    // then:
    ez._docker.modem.host.should.equal('compy.386');
  });

  it('can be created from real arguments', () => {
    // when:
    let ez = EZDocker.createFromArgs();

    // then:
    return ez.should.exist;
  });

  it('cannot be instantiated as a function', () => {
    expect(() => EZDocker()).to.throw(TypeError, 'Cannot call a class as a function');
  });

  it('can create all of the builders', () => {
    let ez = new EZDocker();

    let builder = ez.imageBuilder();
    let remover = ez.imageRemover();
    let pusher = ez.imagePusher();

    builder._ezdocker.should.equal(ez);
    remover._ezdocker.should.equal(ez);
    pusher._ezdocker.should.equal(ez);

    builder.should.be.an.instanceOf(ImageBuilder);
    remover.should.be.an.instanceOf(ImageRemover);
    pusher.should.be.an.instanceOf(ImagePusher);
  });

  describe('image building', () => {

    it('should delegate and handle success on end', () => {
      // given:
      let stream = "hey, check me out, I am a stream";
      let response = {
        pipe: sinon.spy(),
        on: sinon.stub().withArgs('end').callsArg(1)
      };
      let tarUtils = {
        all: sinon.stub().withArgs('mappy').resolves(stream)
      };
      let docker = {
        buildImage: sinon.stub().withArgs(stream, {t: 'a'}).callsArgWith(2, undefined, response)
      };
      let builder = {
        _paths: 'mappy',
        getFullName: sinon.stub().returns('a')
      };

      // when:
      let ez = new EZDocker(undefined, docker, tarUtils);
      let promise = ez._buildImage(builder);

      // then:
      return promise.should.eventually.be.fulfilled
        .then(() => {
          response.pipe.should.have.been.calledWith(stream_parser);
        });
    });

    it('should delegate failure on failure to build the image', () => {
      // given:
      let stream = "hey, check me out, I am a stream";
      let response = {
        pipe: sinon.spy(),
        on: sinon.spy()
      };
      let tarUtils = {
        all: sinon.stub().withArgs('mappy').resolves(stream)
      };
      let docker = {
        buildImage: sinon.stub().withArgs(stream, {t: 'a'}).callsArgWith(2, new Error('failz'))
      };
      let builder = {
        _paths: 'mappy',
        getFullName: sinon.stub().returns('a')
      };

      // when:
      let ez = new EZDocker(undefined, docker, tarUtils);
      let promise = ez._buildImage(builder);

      // then:
      return promise.should.eventually.be.rejectedWith(Error, 'failz')
        .then(() => {
          response.pipe.should.have.not.have.been.called
          response.on.should.have.not.have.been.called
        });
    });

    it('should delegate failure on creating tar stream', () => {
      // given:
      let tarUtils = {
        all: sinon.stub().withArgs('mappy').rejects(new Error('oops'))
      };
      let docker = {};
      let builder = { _paths: 'mappy' };

      // when:
      let ez = new EZDocker(undefined, docker, tarUtils);
      let promise = ez._buildImage(builder);

      // then:
      return promise.should.eventually.be.rejectedWith(Error, 'oops')
    });

  });


  describe('removing all images', () => {

    it('should simply tie listing to removing', () => {
      // given:
      let images = [
        { Id: 'a' },
        { Id: 'b' }
      ];
      let remover = new ImageRemover();
      sinon.stub(remover, 'getShortName').returns('shorty');

      let ez = new EZDocker(undefined, {});
      sinon.stub(ez, '_listImages')
        .withArgs('shorty')
        .resolves(images);

      ez.removeImage = sinon.spy();

      // when:
      let promise = ez._removeImages(remover);

      // then:
      return promise.should.eventually.be.fulfilled
        .then(() => {
          ez.removeImage.should.have.been.calledTwice;
          ez.removeImage.should.have.been.calledWith('a');
          ez.removeImage.should.have.been.calledWith('b');
        });
    });

  });

  describe('listing images', () => {

    it('should succeed as a promise', () => {
      // given:
      let images = 'my list of dudes';

      let docker = {
        listImages: sinon.stub()
          .withArgs({filter: 'dude'})
          .callsArgWith(1, undefined, images)
      };

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez._listImages('dude');

      // then:
      return promise.should.eventually.equal('my list of dudes');
    });

    it('should reject as a promise', () => {
      // given:
      let docker = {
        listImages: sinon.stub()
          .withArgs({filter: 'dude'})
          .callsArgWith(1, new Error('blah'))
      };

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez._listImages('dude');

      // then:
      return promise.should.eventually.be.rejectedWith(Error, 'blah');
    });

  });

  describe('removing an image', () => {

    it('should succeed as a promise', () => {
      // given:
      let response = [
        { '9a34b': 'removed'},
        { '1.1.1': 'un-tagged'}
      ];

      let image = {
        remove: sinon.stub().callsArgWith(1, undefined, response)
      };

      let docker = {
        getImage: sinon.stub().withArgs('bro').returns(image)
      };

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez.removeImage('bro');

      // then:
      return promise.should.eventually.be.fulfilled;
    });

    it('should succeed as a promise when there is nothing to do', () => {
      // given:
      let error = { statusCode: 404 };

      let image = {
        remove: sinon.stub().callsArgWith(1, error)
      };

      let docker = {
        getImage: sinon.stub().withArgs('bro').returns(image)
      };

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez.removeImage('bro');

      // then:
      return promise.should.eventually.be.fulfilled;
    });

    it('should reject as a promise on badness', () => {
      // given:
      let error = new Error('oh noes');

      let image = {
        remove: sinon.stub().callsArgWith(1, error)
      };

      let docker = {
        getImage: sinon.stub().withArgs('bro').returns(image)
      };

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez.removeImage('bro');

      // then:
      return promise.should.eventually.be.rejectedWith(Error, 'oh noes');
    });

  });

  describe('pushing images', () => {

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

      let pusher = new ImagePusher();
      sinon.stub(pusher, 'getShortName').returns('gurl');

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez._pushImages(pusher);

      // then:
      return promise.should.eventually.be.fulfilled
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

      let pusher = new ImagePusher();
      sinon.stub(pusher, 'getShortName').returns('gurl');

      // when:
      let ez = new EZDocker(undefined, docker);
      let promise = ez._pushImages(pusher);

      // then:
      return promise.should.eventually.be.rejectedWith(Error, 'darn');
    });

  });
});

describe('stream_parser', () => {

  beforeEach(() => {
    if (Log.info.restore) {
      Log.info.restore();
    }
  });


  it('should parse JSON stream data and make it pretty ', () => {
    // given:
    let chunk = '{"stream":"berries\\n"}\n';
    let next = sinon.spy();
    sinon.stub(Log, 'info');

    // when:
    stream_parser._write(chunk, undefined, next);

    // then:
    Log.info.should.have.been.calledWith('berries');
    next.should.have.been.called;
  });

  it('should print unknown data raw', () => {
    // given:
    let chunk = '{"fruit":"berries\\n"}\n';
    let next = sinon.spy();
    sinon.stub(Log, 'info');

    // when:
    stream_parser._write(chunk, undefined, next);

    // then:
    Log.info.should.have.been.calledWith(chalk.blue('RAW: ') + '{"fruit":"berries\\n"}');
    next.should.have.been.called;
  });

});

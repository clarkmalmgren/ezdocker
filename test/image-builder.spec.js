import { expect, sinon } from './test_dependencies';
import ImageBuilder from '../dist/image-builder';
import StateError from '../dist/state-error';
import stream_parser from '../dist/stream-parser';

describe('ImageBuilder', () => {

  it('should reject if there is no tag defined', () => {
    // when:
    let builder = new ImageBuilder();
    builder.path('one');
    builder.path('two', 'subfolder');

    // then:
    builder._paths.should.deep.equal({
      'one' : '.',
      'two' : 'subfolder'
    });
    return builder.should.eventually.be.rejectedWith(Error); // no tag
  });

  it('should delegate and handle success on end', () => {
    // given:
    let stream = "hey, check me out, I am a stream";
    let response = {
      pipe: sinon.spy(),
      on: sinon.stub().withArgs('end').callsArg(1)
    };
    let tarUtils = {
      all: sinon.stub().withArgs({'folder':'.'}).resolves(stream)
    };
    let docker = {
      buildImage: sinon.stub().withArgs(stream, {t: 'a:b'}).callsArgWith(2, undefined, response)
    };

    // when:
    let builder = new ImageBuilder(docker, 'a', tarUtils)
      .with.path('folder')
      .and.tag('b');

    // then:
    return builder.should.eventually.be.fulfilled
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
      all: sinon.stub().withArgs({'folder':'subfolder'}).resolves(stream)
    };
    let docker = {
      buildImage: sinon.stub().withArgs(stream, {t: 'a:2'}).callsArgWith(2, new Error('failz'))
    };

    // when:
    let builder = new ImageBuilder(docker, 'a', tarUtils)
      .with.path('folder', 'subfolder')
      .and.tag(2);

    // then:
    return builder.should.eventually.be.rejectedWith(Error, 'failz')
      .then(() => {
        return response.pipe.should.have.not.have.been.called
            && response.on.should.have.not.have.been.called;
      });
  });

  it('should delegate failure on creating tar stream', () => {
    // given:
    let tarUtils = {
      all: sinon.stub().withArgs({'.':'.'}).rejects(new Error('oops'))
    };
    let docker = {};

    // when:
    let builder = new ImageBuilder(docker, 'a', tarUtils)
      .with.path('.')
      .and.tag('1.3.4');

    // then:
    return builder.should.eventually.be.rejectedWith(Error, 'oops')
  });


});
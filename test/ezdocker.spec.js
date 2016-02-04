import {sinon} from './test_dependencies';
import { argv } from 'yargs';
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

  it('can be newed', () => {
    let ez = new EZDocker();
    ez.should.exist;
  });

  it('can be created from arguments', () => {
    // given:
    let args = {docker: {host: 'compy.386'}}; // Strong Bad???

    // when:
    let ez = EZDocker.createFromArgs(args);

    // then:
    ez._docker.modem.host.should.equal('compy.386');
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

});

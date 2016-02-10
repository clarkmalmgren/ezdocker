import { expect, sinon } from './test_dependencies';
import { argv } from 'yargs';
import EZDocker from '../dist/ezdocker';
import Repository from '../dist/repository';

describe('EZDocker', () => {

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

  it('can return a new repository', () => {
    // given:
    let docker = 'ever seen a duck dock?';
    let ez = new EZDocker(undefined, docker);

    // when:
    let repository = ez.repository('happy.town:365');

    // then:
    repository.should.be.an.instanceof(Repository);
    repository._name.should.equal('happy.town:365');
    repository._docker.should.equal(docker);
  });

});

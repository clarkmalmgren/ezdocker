import {sinon} from './test_dependencies';
import EZDocker from '../dist/ezdocker';

describe('EZDocker', () => {

  it('can be newed', () => {
    let ez = new EZDocker();
    ez.should.exist;
  });

});

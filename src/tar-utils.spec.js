import {sinon} from 'test_dependencies';
import TarUtils from 'tar-utils';

describe('TarUtils', () => {

  describe('temporary folder generation', () => {

    it('should delegate to os for finding temporary directory root', () => {
      // given:
      let os = { tmpdir : () => {} };
      sinon.stub(os, 'tmpdir').returns('/hawaii');

      // when:
      let tarutils = new TarUtils(undefined, os);
      let temp = tarutils.tempFolder();

      // then:
      os.tmpdir.should.have.been.called;
      temp.should.startWith('/hawaii/tar-utils__');
    });

  });

  describe('autoclean', () => {

    it('should register for cleanup on process exit', () => {
      // given:
      let process = { on: sinon.spy() };

      // when:
      let tarutils = new TarUtils(undefined, undefined, undefined, process);
      tarutils.autoclean('/hawaii');

      // then:
      process.on.should.have.been.calledWith('beforeExit');
    });

    it('cleanup should happen exactly once', () => {
      // given:
      let process = { on: sinon.spy() };
      let del = sinon.spy();

      // when:
      let tarutils = new TarUtils(del, undefined, undefined, process);
      tarutils.autoclean('/hawaii');

      // then:
      process.on.should.have.been.calledWith('beforeExit');

      // given:
      let cleanup = process.on.args[0][1];

      // when:
      cleanup();
      cleanup();

      // then:
      del.should.have.been.calledOnce;
      del.should.have.been.calledWith('/hawaii');
    });


  });

});


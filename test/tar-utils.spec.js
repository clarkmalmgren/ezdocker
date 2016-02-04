import {sinon} from './test_dependencies';
import TarUtils from '../dist/tar-utils';

describe('TarUtils', () => {

  afterEach(() => {
    if (Math.random.restore) {
      Math.random.restore();
    }
  });

  describe('temporary folder generation', () => {

    it('should delegate to os for finding temporary directory root', () => {
      // given:
      let os = { tmpdir: sinon.stub().returns('/hawaii') };
      sinon.stub(Math, 'random').returns(1);

      // when:
      let tarutils = new TarUtils(undefined, os);
      let temp = tarutils.tempFolder();

      // then:
      os.tmpdir.should.have.been.called;
      temp.should.equals('/hawaii/tar-utils__10000');
    });

  });

  describe('autoclean', () => {

    it('should register for cleanup on process exit', () => {
      // given:
      let process = {on: sinon.spy()};

      // when:
      let tarutils = new TarUtils(undefined, undefined, undefined, process);
      tarutils.autoclean('/hawaii');

      // then:
      process.on.should.have.been.calledWith('beforeExit');
    });

    it('cleanup should happen exactly once', () => {
      // given:
      let process = {on: sinon.spy()};
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

  describe('all', () => {
    it('should create a stream', () => {
      // given:
      let os = { tmpdir: sinon.stub().returns('/hawaii') };
      sinon.stub(Math, 'random').returns(1);

      let process = {on: sinon.spy()};
      let del = sinon.spy();

      let extract = { on: sinon.stub() };

      let copyStream = { pipe: sinon.spy() };

      let tar = {
        extract: sinon.stub(),
        pack: sinon.stub()
      };

      tar.extract.withArgs('/hawaii/tar-utils__10000/.').returns(extract);
      extract.on.callsArg(1);
      tar.pack.withArgs('/chicago').returns(copyStream);

      tar.pack.withArgs('/hawaii/tar-utils__10000').returns('SUCCESS!');

      // when:
      let tarutils = new TarUtils(del, os, tar, process);
      let promise = tarutils.all({'/chicago':'.'});

      // then:
      return promise.should.eventually.equals('SUCCESS!')
        .then(() => {
          tar.extract.withArgs('/hawaii/tar-utils__10000/.').should.be.called;
          tar.pack.withArgs('/chicago').should.be.called;
          extract.on.should.be.called;
          copyStream.pipe.should.be.called;
          tar.pack.withArgs('/hawaii/tar-utils__10000').should.be.called;
        });

    })
  });


});


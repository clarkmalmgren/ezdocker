import { expect, sinon } from './test_dependencies';
import chalk from 'chalk';
import Log from '../dist/log';
import stream_parser from '../dist/stream-parser';

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
    stream_parser()._write(chunk, undefined, next);

    // then:
    Log.info.should.have.been.calledWith('berries');
    next.should.have.been.called;
  });

  it('should parse multiple JSON messages in a single stream chunk and make it pretty ', () => {
    // given:
    let chunk = '\n{"stream":"berries\\n"}\n{"stream":"cream\\n"}\n';
    let next = sinon.spy();
    sinon.stub(Log, 'info');

    // when:
    stream_parser()._write(chunk, undefined, next);

    // then:
    Log.info.should.have.been.called.twice;
    Log.info.should.have.been.calledWith('berries');
    Log.info.should.have.been.calledWith('cream');
    next.should.have.been.called;
  });

  it('should print unknown data raw', () => {
    // given:
    let chunk = '{"fruit":"berries\\n"}\n';
    let next = sinon.spy();
    sinon.stub(Log, 'info');

    // when:
    stream_parser()._write(chunk, undefined, next);

    // then:
    Log.info.should.have.been.calledWith(chalk.blue('RAW: ') + '{"fruit":"berries\\n"}');
    next.should.have.been.called;
  });

});

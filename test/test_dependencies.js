import sinon from 'sinon';

import chai from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import 'sinon-as-promised';

chai.use(chaiString);
chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();

export {sinon};
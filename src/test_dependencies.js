import sinon from 'sinon';

import chai from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';

chai.use(chaiString);
chai.use(sinonChai);

chai.should();

export {sinon};
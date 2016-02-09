import { expect, sinon } from './test_dependencies';
import ImageBuilder from '../dist/image-builder';
import ImageLister from '../dist/image-lister';
import ImagePusher from '../dist/image-pusher';
import ImageRemover from '../dist/image-remover';
import Repository from '../dist/repository';

describe('Repository', () => {

  [
    { clazz: ImageBuilder, fn: 'buildImage' },
    { clazz: ImageLister, fn: 'listImages' },
    { clazz: ImagePusher, fn: 'pushImages' },
    { clazz: ImageRemover, fn: 'removeImages' }
  ].forEach((args) => {

    it(`should be able to create a ${args.clazz.name}`, () => {
      // given:
      let repo = new Repository('Geneva', undefined);

      // when:
      let instance = repo[args.fn]();

      // then:
      instance.should.be.an.instanceof(args.clazz);
      instance._repositoryName.should.equal('Geneva');
      return instance.should.eventually.be.rejected;
    });

  });

});
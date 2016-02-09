import ImageBuilder from './image-builder';
import ImageLister from './image-lister';
import ImagePusher from './image-pusher';
import ImageRemover from './image-remover';

class Repository {

  constructor(name, docker) {
    this._name = name;
    this._docker = docker;
  }

  buildImage() {
    return new ImageBuilder(this._docker, this._name);
  }

  listImages() {
    return new ImageLister(this._docker, this._name);
  }

  pushImages() {
    return new ImagePusher(this._docker, this._name);
  }

  removeImages() {
    return new ImageRemover(this._docker, this._name);
  }
}

export default Repository;
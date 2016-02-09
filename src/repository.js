import ImageBuilder from './image-builder';
import ImageLister from './image-lister';
import ImagePusher from './image-pusher';
import ImageRemover from './image-remover';

/**
 * Manages all aspects of images related to a specific repository. This is denoted by the following name schema:
 *
 * REGISTRY[:PORT]/USER/REPO
 *
 */
class Repository {

  /**
   * Constructor
   *
   * @param {String} name the well formed name of the registry (with optional port), user and repo
   * @param {Docker} docker the docker connector to use
   */
  constructor(name, docker) {
    this._name = name;
    this._docker = docker;
  }

  /**
   * Create a builder language chain and promise to build an image.
   *
   * @return {ImageBuilder}
   */
  buildImage() {
    return new ImageBuilder(this._docker, this._name);
  }

  /**
   * Create promise to list images.
   *
   * @return {ImageLister}
   */
  listImages() {
    return new ImageLister(this._docker, this._name);
  }

  /**
   * Create promise to push images.
   *
   * @return {ImagePusher}
   */
  pushImages() {
    return new ImagePusher(this._docker, this._name);
  }

  /**
   * Create promise to remove images.
   *
   * @return {ImageRemover}
   */
  removeImages() {
    return new ImageRemover(this._docker, this._name);
  }
}

export default Repository;
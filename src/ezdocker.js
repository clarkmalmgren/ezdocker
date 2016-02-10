import { argv } from 'yargs';
import Docker from 'dockerode';
import Repository from './repository';

/**
 * EZDocker provides easy to use access to builder-pattern classes for building images, removing images and pushing
 * images to a docker registry. See the README for more information on how to use.
 */
class EZDocker {

  /**
   * Creates a EZDocker using command line arguments.
   *
   * @param {{}} [args=argv] the arguments that default to those from yargs.argv
   *
   * @return {EZDocker}
   */
  static createFromArgs(args = argv) {
    return new EZDocker(args.docker);
  }

  /**
   * Constructs a new EZDocker. See the README for valid connectionOpts. `docker` and `tarUtils` are only for use
   * in unit-testing to inject mock dependencies.
   *
   * @param {Map<String,String>} connectionOpts configures the connection method to
   * @param {Docker} [docker] used for dependency injection, if set, connectionOpts are ignored
   */
  constructor(connectionOpts, docker) {
    this._docker = docker || new Docker(connectionOpts);
  }

  /**
   *
   * @param {String} name the
   * @return {Repository}
   */
  repository(name) {
    return new Repository(name, this._docker);
  }
}

export default EZDocker;
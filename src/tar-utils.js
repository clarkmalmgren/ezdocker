import {_, del, os, tar} from 'common_dependencies';

/**
 * Utilities for generating a more complex tar stream. Specifically, this allows for putting multiple
 * source folders into a single stream with potential custom mappings. This uses a temporary file for
 * intermediate staging which will be automatically cleaned up on process exit.
 *
 * @example
 * let tarUtils = new TarUtils();
 * let stream = tarUtils.all({
 *   '/fully/qualified/path' : '.',
 *   'relative/path' : 'subfolder'
 * });
 */
class TarUtils {

  /**
   * Constructor with optional injection of dependencies for purposes of testing.
   *
   * @param {function} [_del=del]
   * @param {os} [_os=os]
   * @param {tar} [_tar=tar]
   * @param {process} [_process=process]
   */
  constructor(_del = del, _os = os, _tar = tar, _process = process) {
    this._del = _del;
    this._os = _os;
    this._process = _process;
    this._tar = _tar;
  }

  /**
   * Generate a single tar stream that contains multiple inputs that can be mapped to relative paths.
   *
   * @param {Map<String, String>} mapping a map of source folders to target relative paths
   * @return {Promise<stream.Readable, Error>} a promise that resolves with the generated combined stream
   */
  all(mapping) {
    var temp = this.tempFolder();
    this.autoclean(temp);

    return this.copyAll(mapping, temp)
      .then(() => { return this._tar.pack(temp); });
  }

  /**
   * Generate a path for a temporary file that is appropriate for the current OS.
   *
   * @return {string} full-qualified folder path
   */
  tempFolder() {
    return this._os.tmpdir() + '/tar-utils__' + Math.floor(Math.random() * 10000);
  }

  /**
   * Recursively copy files from the source mapping onto the destination baseDir applying the additional subfoldering.
   *
   * @param {Map<String, String>} mapping a map of source folders to target relative paths
   * @param {String} baseDir the base output folder where all of the sources should be copied to
   * @return {Promise} a promise that resolves when all files have been copied
   */
  copyAll(mapping, baseDir) {
    var promises = _.map(mapping, (subDir, source) => {
      return this.copy(source, baseDir + '/' + subDir);
    });

    return Promise.all(promises);
  }

  /**
   * Copy files from the source folder to the destination folder.
   *
   * @param {String} from the source folder
   * @param {String} to the destination folder
   * @return {Promise} a promise that resolves when all files have been copied
   */
  copy(from, to) {
    return new Promise(function (resolve, reject) {
      var extract = this._tar.extract(to);
      extract.on('finish', () => { resolve(); });
      this._tar.pack(from).pipe(extract);
    });
  }

  /**
   * Schedule the given folder to be automatically cleaned up when the JavaScript process finishes running.
   *
   * @param {String} folder the folder to cleanup
   */
  autoclean(folder) {
    var cleanupStarted = false;

    this._process.on('beforeExit', () => {
      if (!cleanupStarted) {
        this._del(folder);
        cleanupStarted = true;
      }
    });
  }
}

export default TarUtils;

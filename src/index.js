import {_, Docker, stream, chalk} from 'common_dependencies';
import TarUtils from 'tar-utils';

class ImageBuilder {

  constructor(ezdocker) {
    this._repo = undefined;
    this._tag = undefined;
    this._paths = {};
    this._ezdocker = ezdocker;
  }

  repository(repo) {
    this._repo = repo;
    return this;
  }

  tag(tag) {
    this._tag = tag;
    return this;
  }

  addPath(src, dest) {
    this._paths[src] = dest || '.';
    return this;
  }

  getFullTag() {
    return this._repo + ':' + this._tag;
  }

  build() {
    return this._ezdocker.buildImage(this);
  }
}

class EZDocker {

  constructor(connectionOpts, docker, tarUtils = new TarUtils()) {
    this._docker = docker || new Docker(connectionOpts);
    this._tarUtils = tarUtils;
  }

  imageBuilder() {
    return new ImageBuilder(this);
  }

  buildImage(imageBuilder) {
    return this._tarUtils.all(imageBuilder._paths)
      .then((stream) => {
        return new Promise((resolve, reject) => {
          this._docker.buildImage(stream, {t: imageBuilder.getFullTag()}, (error, response) => {
            if (error) {
              reject(error);
            } else {
              response.pipe(stream_parser);
              response.on('end', () => {
                resolve();
              });
            }
          });
        });
      });
  }

  removeImages(repository) {
    return this.listImages(repository)
      .then((images) => {
        return Promise.all(_.map(images, (imageInfo) => {
          return this.removeImage(imageInfo.Id);
        }));
      });
  }

  listImages(repository) {
    return new Promise((resolve, reject) => {
      this._docker.listImages({filter: repository}, (error, response) => {
        if (error) {
          console.log(chalk.red('(Docker) Listing Docker Images Failed: ' + error.message));
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  removeImage(id) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(id).remove({}, (error, response) => {
        if (error) {
          if (error.statusCode == 404) {
            console.log(chalk.blue('(Docker) ') + 'No docker images to remove.');
          } else {
            console.log(chalk.red('(Docker) Removing Docker Image Failed: ' + error.message));
            reject(error);
          }
        } else {
          console.log(chalk.blue('(Docker) ') + 'Removing Image ' + id);
          _.forEach(response, (step) => {
            _.forEach(step, (target, action) => {
              console.log(chalk.blue('(Docker)   ') + action + ' ' + target);
            });
          });
          resolve();
        }
      });
    });
  };

  pushImages(repository) {
    return new Promise((resolve, reject) => {
      this._docker.getImage(repository).push({}, (error, response) => {
        if (error) {
          console.log(chalk.red('(Docker) Pushing Docker Image(s) Failed: ' + error.message));
          reject(error);
        } else {
          response.pipe(stream_parser);
          response.on('end', () => { resolve(); });
        }
      });
    });
  }
}

const stream_parser = new stream.Writable({
  write: function(chunk, encoding, next) {
    var data = JSON.parse(chunk.toString());

    var msg = '';
    if (data.stream) {
      data.stream = data.stream.replace(/\n$/, '');
      msg +=  chalk.blue('(Docker) ') + data.stream;
    } else {
      msg += chalk.blue('(Docker RAW) ') + JSON.stringify(data);
    }

    console.log(msg);
    next();
  }
});


export default EZDocker;
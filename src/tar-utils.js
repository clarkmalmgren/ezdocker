import {_, tar, os, del} from 'common_dependencies';

function randomFolder() {
  return os.tmpdir() + "/tar-utils__" + Math.floor(Math.random() * 1000);
}

class TarUtils {

  static all(mapping) {
    var dest = randomFolder();

    return TarUtils.copyAll(mapping, dest)
      .then(() => { return TarUtils.packify(dest); });
  }

  static copyAll(mapping, baseDir) {
    var promises = _.map(mapping, (subDir, source) => {
      return TarUtils.copy(source, baseDir + '/' + subDir);
    });

    return Promise.all(promises);
  }

  static copy(from, to) {
    return new Promise(function (resolve, reject) {
      var extract = tar.extract(to);
      extract.on('finish', () => { resolve(); });
      tar.pack(from).pipe(extract);
    });
  }

  static packify(folder) {
    var pack = tar.pack(folder);
    var cleanupStarted = false;

    process.on('beforeExit', function() {
      if (!cleanupStarted) {
        del(folder);
        cleanupStarted = true;
      }
    });

    return pack;
  }
}

export default TarUtils;

# EZDocker

[![license:mit](https://img.shields.io/badge/license-mit-green.svg)](./LICENSE)
[![Build Status](https://travis-ci.org/clarkmalmgren/ezdocker.svg?branch=develop)](https://travis-ci.org/clarkmalmgren/ezdocker)
[![Coverage Status](https://coveralls.io/repos/github/clarkmalmgren/ezdocker/badge.svg?branch=develop)](https://coveralls.io/github/clarkmalmgren/ezdocker?branch=develop)
[![npm](https://img.shields.io/npm/dt/ezdocker.svg)](https://www.npmjs.com/package/ezdocker)
[![npm](https://img.shields.io/npm/v/ezdocker.svg)](https://www.npmjs.com/package/ezdocker)

EZDocker provides an easy and intuitive way to build docker images in JavaScript. This builds upon
[Dockerode](https://github.com/apocas/dockerode) to provide build patterns and output formatting to improve
ease of use.

Although this was built to be used in a [Gulp](http://gulpjs.com/) build environment, it can be used in any
NodeJS-based build environment or even directly in NodeJS.

This README does not describe what exactly you should put into your `Dockerfile` or how to setup your project.
This simply gives instructions on how to invoke Docker's build process.

## Naming Conventions

EZDocker utilizes a standard naming convention for tagging images that follows the
[RedHat Image-Naming Conventions](https://access.redhat.com/documentation/en/red-hat-enterprise-linux-atomic-host/7/recommended-practices-for-container-development/chapter-4-image-naming-conventions).  
The naming convention is as follows:

`REGISTRY[:PORT]/USER/REPO[:TAG]`

This allows for convenient, explicit and easy pushing of images to the registry after they have been built.

## Gulp Example Usage (ES5)

This example shows using EZDocker to build an image with multiple source folders and pulling the connection
configuration from command line arguments:

```javascript
(function() {

  var gulp = require('gulp'),
      EZDocker = require('ezdocker').default; // Note that in ES5, EZDocker is bound to ".default"

  gulp.task('docker:build-image', function() {
    return EZDocker.createFromArgs().imageBuilder()
      .registry('docker.registry.my.company.com')
      .port(5000)
      .user('my-team')
      .repo('my-project')
      .tag('1.0.0')
      .addPath('docker')
      .addPath('dist/production', 'dist')
      .addPath('other/files', '.')
      .build();
  });

})();

```

## NodeJS Example Usage (ES6)

The example below shows how to use EZDocker to build an image with a single folder.

```javascript
import EZDocker from 'ezdocker';

new EZDocker().imageBuilder()
  .registry('docker.registry.my.company.com')
  .port(5000)
  .user('my-team')
  .repo('my-project')
  .tag('1.0.0')
  .addPath('docker')
  .build();
```
 
## Configuring Connection to Docker Host
 
Ultimately under the covers, this is communicating with a Docker host to do the building of the images. By default
`EZDocker` will try to communicate with a host running on the local machine. If the docker host is running remotely,
these parameters must be passed in as connection options when constructing an instance of `EZDocker`. 

```javascript
let ezdocker = new EZDocker({host: 'http://192.168.1.30', port: 3000});
```

Below are all of the possible configuration parameters you could send. For more details, see
[Dockerode's Getting Started](https://github.com/apocas/dockerode#getting-started) section.

 * No Parameters -- Defaults to connecting to socket at `/var/run/docker.sock`
 * `socketPath` -- local socket to connect to (should be a file path)
 * `host` -- host domain or IP with optional protocol
 * `port` -- port
 * `protocol` -- https or http
 * `ca`, `cert`, `key` -- used to authenticate with host

## Connection Configuration from Command Line

Configuration parameters can be obtained from the command line too by calling `EZDocker.createFromArgs()`. Any command
line arguments prefixed with `docker.` will be used as connection parameters. So to build using the docker host running
at https://192.168.1.30:3000 using the Gulp example above, this would be the command:

```gulp
$ npm docker:build-image --docker.host=192.168.1.30 --docker.port=3000 --docker.protocol=https
```

## Other Docker Tasks

EZDocker also supports pushing and removing images.

```javascript
import EZDocker from 'ezdocker';

new EZDocker().imageRemover()
  .registry('docker.registry.my.company.com')
  .port(5000)
  .user('my-team')
  .repo('my-project')
  .remove();

new EZDocker().imagePusher()
  .registry('docker.registry.my.company.com')
  .port(5000)
  .user('my-team')
  .repo('my-project')
  .push();
```

## Installation

```bash
$ npm install --save-dev ezdocker
```

## Submitting Issues

Please file a github issue for any problems or feature requests.

## Thank You

Huge thanks to [Dockerode](https://github.com/apocas/dockerode) on which this is built.

## Contributing

See [Contributing](CONTRIBUTING.md)

## License

[Licensed under MIT](LICENSE)

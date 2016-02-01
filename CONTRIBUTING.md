# Contributing to EZDocker

## Submitting Issues

[Just do it](https://github.com/clarkmalmgren/ezdocker/issues/new). Please include meaningful titles and descriptions.

## Guidelines

Contributions are welcome via pull requests. Please adhere to the following guidelines:

  * At least 90% Unit Test Coverage
  * If you want to squash an outstanding issue, bonus points for using
    [Issue2PR](http://issue2pr.herokuapp.com/) to connect your feature branch
    with the currently outstanding issue. This helps avoid issue/PR
    duplication.
  * Use [the AVH version of git flow](https://github.com/petervanderdoes/gitflow-avh)
    * `git flow feature start <useful-title>`
    * Then send a pull request to `develop`

## Getting Started

### Cloning the Repository

Nothing special here. Just follow the [standard directions](https://help.github.com/articles/fork-a-repo/).

### Install NodeJS & NPM

On OS X, use [Homebrew](http://brew.sh/):

```bash
$ brew install node
$ brew install npm
```

### Globally Install Gulp

[Gulp](http://gulpjs.com/) is the tool that is used to build and test this project. It needs to be installed globally
in order for it to work from the command line. You can do that by issuing the following command:

```bash
npm install -g gulp
```

### Install NPM Dependencies

```bash
$ npm install
```

### Build System

The build process is pretty simple. Below is the list of gulp tasks and what they do. To run any of them, simply
call `gulp <task>` from the project root.

Task            | Description
:-------------- | :----------
clean           | deletes the `build` folder
dist-clean      | deletes the `dist` and `dist_test` folders
build           | creates the production version of the sources in the `dist` folder
test:build      | build (babel) test sources
test:instrument | istanbul code coverage hooks
test            | run tests
ci              | publish coverage to coveralls

The default task (just calling `gulp` with no task) is the same as calling `gulp test build`.

### Project Layout

```text
├── CONTRIBUTING.md                         This File
├── LICENSE                                 MIT License
├── README.md                               Top-level README
├── build
│   └── coverage/                           Test coverage results go here
├── dist/                                   Transpiled source files are put here
├── dist_test/                              Transpiled test files are put here
├── gulpfile.js                             The Build File
├── node_modules/                           Folder where dependencies go
├── package.json                            Defines the project for npm
├── src
│   ├── ezdocker.js                         EZDocker's main functionality
│   └── tar-utils.js                        Utility functions for tar streams
└── test/                                   Test Files
```

### Testing System

This uses the following toolchain:

  * [Mocha](http://mochajs.org/) - Test Framework
  * [Chai](http://chaijs.com/) - Assertion Library
  * [Sinon](http://sinonjs.org/) - (Spy|Stub|Mock)ing Library
  * [Sinon Chai](https://github.com/domenic/sinon-chai) - Better assertion language for Sinon
  * [Istanbul](https://gotwarlost.github.io/istanbul/) - Code Coverage

### Developing Tests

Tests should be well organized into functional groups using `describe` blocks. Each test should also read descriptively
in a hierarchical fashion. The test should also be separated into given, when, then phases with comments to delinate
setup, run and verification parts of a test.  There could be multiple when and then blocks in a single test.

## More Questions?

Feel free to create a github issue and just mark it as "help wanted".
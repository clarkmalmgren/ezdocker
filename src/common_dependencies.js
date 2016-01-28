/**
 * All common dependencies are referenced through this file so that they can be excluded
 * in a single exclusion from the resulting bundle. Without doing this, the build arithmetic
 * gets very excessive.
 */
import _ from 'lodash';
import Docker from 'dockerode';
import stream from 'stream';
import chalk from 'chalk';
import os from 'os';
import del from 'del';

export {_, Docker, stream, chalk, os, del};
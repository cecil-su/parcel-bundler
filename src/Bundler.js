const fs = require('./utils/fs');
const Resolver = require('./Resolver');
const Parser = require('./Parser');
const WorkerFarm = require('./WorkerFarm');
const worker = require('./utils/promisify')(require('./worker.js'));
const Path = require('path');
const Bundle = require('./Bundle');
const {FSWatcher} = require('chokidar');
const FSCache = require('./FSCache');
const HMRServer = require('./HMRServer');
const Server = require('./Server');
const {EventEmitter} = require('events');
const Logger = require('./Logger');
const PackagerRegistry = require('./packagers');
const localRequire = require('./utils/localRequire');
const customErrors = require('./utils/customErrors');
const config = require('./utils/config');

class Bundler extends EventEmitter {
  constructor(main, options = {}) {
    super();
    this.mainFile = Path.resolve(main || '');
    this.options = this.normalizeOptions(options);

    this.resolver = new Resolver(this.options);
    this.parser = new Parser(this.options);
    this.packagers = new PackagerRegistry();
    this.cache = this.options.cache ? new FSCache(this.options) : null;
    this.logger = new Logger(this.options);
    this.delegate = options.delegate || {};

    this.pending = false;
    this.loadedAssets = new Map();
    this.farm = null;
    this.watcher = null;
    this.hmr = null;
    this.bundleHashes = null;
    this.errored = false;
    this.buildQuene = new Set();
    this.rebuildTimeout = null;
  }

  async bundle() {
    console.log('bundle');
  }

  middleware() {
    return Server.middleware(this);
  }

  async serve(port = 1234) {
    console.log('serve');
    console.log(this);
    // this.bundle()
    return await Server.serve(this, port);
  }
}

module.exports = Bundler;

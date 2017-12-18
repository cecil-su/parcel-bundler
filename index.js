// Node 8 supports native async functions - no nned to use compiled code!
module.exports =
  parseInt(process.version.node, 10) < 8
    ? require('./lib/Bundler')
    : require('./src/Bundler');

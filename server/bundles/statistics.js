import zlib from 'zlib';
import fs from 'fs-extra';
import path from 'path';

const bundleFilename = 'main.bundle.js';

export default function statistics(config) {
  return {
    minified: minifiedSize(config),
    gzip: gzipSize(config)
  };
}

function minifiedSize(config) {
  return fs.statSync(path.join(config.path, bundleFilename))['size'];
}

function gzipSize(config) {
  const bundleContents = fs.readFileSync(
    path.join(config.path, bundleFilename)
  );
  return zlib.gzipSync(bundleContents, {}).length;
}

import fs from 'fs-extra';
import path from 'path';
import childProcess from 'child_process';

const buildPath = 'temp/build';
const indexFilePath = path.join(buildPath, 'index.js');

export function download(name, version) {
  deleteBuild();
  createFolder();
  createPackageJson();
  installPackage(version ? `${name}@${version}` : name);
  addIndexJs(name);
}

export function getConfig() {
  return {
    path: buildPath,
    indexFilePath: indexFilePath
  };
}

function deleteBuild() {
  fs.removeSync(buildPath);
}

function createFolder() {
  fs.mkdirpSync(buildPath);
}

function createPackageJson() {
  fs.writeFileSync(
    path.join(buildPath, 'package.json'),
    JSON.stringify({ dependencies: {} })
  );
}

function installPackage(name) {
  childProcess.execSync(
    `npm install ${name} --no-package-lock --progress false --loglevel error`,
    {
      cwd: buildPath,
      maxBuffer: 10000 * 1024
    }
  );
}

function addIndexJs(packageName) {
  const indexFilePath = path.join(buildPath, 'index.js');
  const importStatement = `const p = require('${packageName}');`;
  fs.writeFileSync(indexFilePath, importStatement);
  return indexFilePath;
}

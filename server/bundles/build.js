import webpack from 'webpack';

const getWebpackConf = require('./webpack.config');

export default async function build(config) {
  const compiler = webpack(
    getWebpackConf(config.indexFilePath, config.path, [])
  );
  const result = await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      resolve({ err });
    });
  });
  return result;
}

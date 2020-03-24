import 'source-map-support/register';

module.exports = async () => {
  try {
    require.resolve('webpack');
  } catch (err) {
    console.error("Please install 'webpack' to use the plugin");
    console.error('-> When using npm: npm i -D webpack');
    console.error('-> When using yarn: yarn add -D webpack');

    throw err;
  }

  try {
    require.resolve('webpack-cli');
  } catch (err) {
    console.error("Please install 'webpack-cli' to use the plugin");
    console.error('-> When using npm: npm i -D webpack-cli');
    console.error('-> When using yarn: yarn add -D webpack-cli');

    throw err;
  }

  try {
    require.resolve('webpack-dev-server');
  } catch (err) {
    console.error("Please install 'webpack-dev-server' to use the plugin");
    console.error('-> When using npm: npm i -D webpack-dev-server');
    console.error('-> When using yarn: yarn add -D webpack-dev-server');

    throw err;
  }
};

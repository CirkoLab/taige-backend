import { deepMerge, APP_ENV } from '../utils';
import defaultConfig from './config.default';

let config: typeof defaultConfig = { ...defaultConfig };

// eslint-disable-next-line
const envConfigs = require(`./config.${APP_ENV}.js`).default;

config = deepMerge(config, envConfigs);

export default config;

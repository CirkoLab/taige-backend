import * as path from 'path';
import { STATIC_PATH, VIEWS_PATH, ROOT_PATH } from '../utils';

const config = {
  // app 启动端口
  APP_PORT: parseInt(process.env.APP_PORT || '4000', 10),

  // 静态资源目录
  STATIC_PATH: STATIC_PATH,

  view: {
    fileRootPath: VIEWS_PATH,
    noCache: true,
    useCdn: false,
    localPath: 'local',
    cdn: '/static',
    cdnMap: path.join(ROOT_PATH, 'static.config.json'),
  },
};

export default config;

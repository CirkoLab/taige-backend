import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import config from '../../../config';

const FILE_LOADER = {
  css: '<link rel="stylesheet" href="%path">',
  js: '<script charset="utf-8" src="%path"></script>',
};

export class NunjucksEnvironment extends nunjucks.Environment {
  constructor() {
    const { view } = config;
    const { fileRootPath, noCache } = view;

    super(
      new nunjucks.FileSystemLoader(fileRootPath, {
        watch: true,
        noCache,
      }),
      {
        autoescape: true,
        throwOnUndefined: false,
        trimBlocks: false,
        lstripBlocks: false,
      },
    );

    this.addGlobal('js', (key: string) => this.loadFile('js', `${key}.js`));
    this.addGlobal('css', (key: string) => this.loadFile('css', `${key}.css`));
  }

  loadFile(fileType: 'js' | 'css', key: string) {
    const { useCdn, localPath, cdn, cdnMap } = config.view;

    let filePathMap: { [_: string]: string } = {};
    try {
      const json = fs.readFileSync(cdnMap);
      filePathMap = JSON.parse(json.toString());
    } catch (err) {
      // No Json Config
    }

    let src = '';
    if (process.env.USE_CDN === 'true' || process.env.USE_CDN || useCdn) {
      // 去掉 dll、dev 等前缀
      key = key.replace('dev/', '');
      key = key.replace('dll/', '');

      src = `${cdn}/${filePathMap[key]}`;
    } else {
      src = `${localPath}/${key}`;
    }

    return FILE_LOADER[fileType].replace('%path', src);
  }
}

export default NunjucksEnvironment;

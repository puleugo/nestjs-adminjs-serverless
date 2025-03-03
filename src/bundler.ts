import {bundle} from "@adminjs/bundler";

void (async () => {
  const files = await bundle({
      customComponentsInitializationFilePath: "dist/admin/component/index.js",
      destinationDir: "dist/public",
  });
  console.log('번들링 파일:',files);
})();

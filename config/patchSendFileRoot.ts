import path from 'path';

export function patchSendFileRoot(app: any) {
  const originalSendFile = app.response.sendFile;
  const viewsRoot = app.get('views');

  app.response.sendFile = function (filePath: string, options?: any, callback?: any) {
    if (typeof filePath === 'string' && !path.isAbsolute(filePath)) {
      if (!options || !options.root) {
        options = { ...options, root: viewsRoot };
      }
    }
    // @ts-ignore
    return originalSendFile.call(this, filePath, options, callback);
  };
}

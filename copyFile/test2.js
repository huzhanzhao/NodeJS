const path = require('path');
const copyFileApi = require('./copyFileOfClass');

let resolve = function (paths) {
    let root = path.resolve(__dirname, '../')
    return path.resolve(root, paths)
}

copyFileApi.copyFile(resolve('aaaa/bbb/test.txt'), resolve('ccc/moveFile.sh'));

copyFileApi.copyFileDir(resolve('aaaa'), resolve('fff'));
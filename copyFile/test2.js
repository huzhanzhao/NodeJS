const path = require('path');
// const { copyFile, copyFileDir } = require('./copyFile2');
const copyFileApi = require('./copyFile2');

let resolve = function (paths) {
    let root = path.resolve(__dirname, '../')
    return path.resolve(root, paths)
}

copyFileApi.copyFile(resolve('aaaa/bbb/test.txt'), resolve('ccc/moveFile.sh'));

copyFileApi.copyFileDir(resolve('aaaa'), resolve('fff'));
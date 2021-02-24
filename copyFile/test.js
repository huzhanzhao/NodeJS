const path = require('path');
const { copyFile, copyFileDir } = require('./copyFile');

let resolve = function (paths) {
    let root = path.resolve(__dirname, '../')
    return path.resolve(root, paths)
}

copyFile(resolve('aaaa/bbb/test.txt'), resolve('ccc/moveFile.sh'));

copyFileDir(resolve('aaaa'), resolve('fff'));
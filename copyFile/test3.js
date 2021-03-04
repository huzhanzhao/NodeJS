const path = require('path');
const { copyFile, copyFileDir } = require('./copyFileOfSync');

let resolve = function (paths) {
    let root = path.resolve(__dirname, '../')
    return path.resolve(root, paths)
}

// copyFile(resolve('aaaa/bbb/test.txt'), resolve('ccc/test.txt'));

copyFileDir(resolve('aaaa'), resolve('fff')).then(() => {
    copyFile(resolve('ccc/moveFile.sh'), resolve('fff/aaaa'))
});

// copyFile(resolve('ccc/moveFile.sh'), resolve('fff/aaaa'))
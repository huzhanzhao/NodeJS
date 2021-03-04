const fs = require('fs');
const path = require('path');
const stat = fs.stat;

// 核查目录 不存在就创建
const mkDir = function (dst, dst2, index = 1) {
    return new Promise(resolve => {
        let result = dst.split(path.sep);
        if (!dst2) {
            dst2 = result[0];
        }
        if (result[index].indexOf('.') !== -1) {
            resolve(dst2);
        }
        dst2 = path.join(dst2, result[index])
        index++;
        stat(dst2, function (err) {
            if (err) {
                fs.mkdir(dst2, function () {
                    if (index < result.length) {
                        resolve(mkDir(dst, dst2, index))
                    } else {
                        resolve(dst2)
                    }
                })  
            } else{
                if (index < result.length) {
                    resolve(mkDir(dst, dst2, index))
                } else {
                    resolve(dst2)
                }
            }
        })
    })
}
// 创建流，复制文件
const writeFile = function (src, dst) {
    var readable = fs.createReadStream(src); //创建读取流
    var writable = fs.createWriteStream(dst); //创建写入流
    readable.pipe(writable);
    writable.on('finish', () => {
        console.log('All writes are now complete.');
    });
}
// 读取目录
const readFileDir = function (src, dst) {
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (dirPath) {
            var _src = path.resolve(src, dirPath);
            var _dst = path.resolve(dst, dirPath);
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                if (st.isFile()) {
                    writeFile(_src, _dst)
                } else if (st.isDirectory()) {
                    copyFileDir(_src, _dst, false)
                }
            });
        });
    });
}
// 复制目录及文件
const copyFileDir = function (src, dst, includeDir = true) {
    if (includeDir) {
        dst = path.resolve(dst, path.basename(src));
    }
    mkDir(dst).then(() => {
        readFileDir(src, dst)
    }).catch(err => {
        console.log(err)
    })
}
// 复制文件
const copyFile = function (src, dst) {
    if (path.basename(dst).indexOf('.') === -1) {
        dst = path.join(dst, path.basename(src))
    }
    mkDir(dst).then(() => {
        writeFile(src, dst)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    copyFile,
    copyFileDir,
}
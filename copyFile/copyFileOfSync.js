const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const stat = fs.statSync;

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
        try {
            let res = stat(dst2);
            if (res.isDirectory && res.isDirectory()) {
                if (index < result.length) {
                    resolve(mkDir(dst, dst2, index))
                } else {
                    resolve(dst2)
                }
            }
        } catch(e) {
            fs.mkdir(dst2, function () {
                if (index < result.length) {
                    resolve(mkDir(dst, dst2, index))
                } else {
                    resolve(dst2)
                }
            })  
        }
    })
}
// 创建流，复制文件  大份文件复制
const copyBigFile = function (src, dst) {
    var readable = fs.createReadStream(src); //创建读取流
    var writable = fs.createWriteStream(dst); //创建写入流
    readable.unpipe();
    readable.pipe(writable);
    writable.on('finish', () => {
        console.log('All writes are now complete.');
    });
}
// 读取目录
const readFileDir = function (src, dst) {
    return new Promise((resolve, reject) => {
        let res = fs.readdirSync(src)
        if (Array.isArray(res)) {
            res.forEach(dirPath => {
                var _src = path.resolve(src, dirPath);
                var _dst = path.resolve(dst, dirPath);
                try {
                    let res = stat(_src);
                    if (res.isFile && res.isFile()) {
                        fs.copyFileSync(_src, _dst);
                    } else if (res.isDirectory && res.isDirectory()) {
                        copyFileDir(_src, _dst, false).catch(() => {
                            reject(err)
                        })
                    }
                } catch(e) {
                    reject(err)
                    throw err;
                }
            })
            resolve()
        } else {
            reject(`${src} is not a directory: ${res}`)
        }
    })
}
// 复制目录及文件
const copyFileDir = function (src, dst, includeDir = true) {
    return new Promise((resolve, reject) => {
        if (includeDir) {
            dst = path.resolve(dst, path.basename(src));
        }
        mkDir(dst).then(() => {
            readFileDir(src, dst).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}
// 复制文件
const copyFile = function (src, dst) {
    if (path.basename(dst).indexOf('.') === -1) {
        dst = path.join(dst, path.basename(src))
    }
    mkDir(path.dirname(dst)).then(() => {
        fs.copyFileSync(src, dst);
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    copyFile,
    copyFileDir,
}
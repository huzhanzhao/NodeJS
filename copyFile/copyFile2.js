const fs = require('fs');
const path = require('path');
const stat = fs.stat;

class copyFileApi {
    constructor() {}
    // 核查目录 不存在就创建
    mkDir(dst, dst2, index = 1) {
        let _that = this;
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
                            resolve(_that.mkDir(dst, dst2, index))
                        } else {
                            resolve(dst2)
                        }
                    })
                } else {
                    if (index < result.length) {
                        resolve(_that.mkDir(dst, dst2, index))
                    } else {
                        resolve(dst2)
                    }
                }
            })
        })
    }
    // 创建流，复制文件
    reiteFile(src, dst) {
        var readable = fs.createReadStream(src); //创建读取流
        var writable = fs.createWriteStream(dst); //创建写入流
        readable.pipe(writable);
    }
    // 读取目录
    readFileDir(src, dst) {
        let _that = this;
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
                        _that.reiteFile(_src, _dst)
                    } else if (st.isDirectory()) {
                        _that.copyFileDir(_src, _dst, false)
                    }
                });
            });
        });
    }
    // 复制目录及文件
    copyFileDir(src, dst, includeDir = true) {
        let _that = this;
        if (includeDir) {
            dst = path.resolve(dst, path.basename(src));
        }
        _that.mkDir(dst).then(() => {
            _that.readFileDir(src, dst)
        }).catch(err => {
            console.log(err)
        })
    }
    // 复制文件
    copyFile(src, dst) {
        let _that = this;
        if (path.basename(dst).indexOf('.') === -1) {
            dst = path.join(dst, path.basename(src))
        }
        _that.mkDir(dst).then(() => {
            _that.reiteFile(src, dst)
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = new copyFileApi()
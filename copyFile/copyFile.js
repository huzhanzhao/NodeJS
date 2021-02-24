const fs = require('fs');
const path = require('path');
let stat = fs.stat;

// 核查目录 不存在就创建
let mkDir = function (dst, dst2, index = 1) {
    return new Promise((resolve, reject) => {
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
let reiteFile = function (sourcePath, targetPath) {
    var readable = fs.createReadStream(sourcePath); //创建读取流
    var writable = fs.createWriteStream(targetPath); //创建写入流
    readable.pipe(writable);
}
// 读取目录
let readFileDir = function (src, dst) {
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
                    reiteFile(_src, _dst)
                } else if (st.isDirectory()) {
                    copyFileDir(_src, _dst, false)
                }
            });
        });
    });
}
// 复制目录及文件
let copyFileDir = function (src, dst, includeDir = true) {
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
let copyFile = function (sourcePath, targetPath) {
    if (path.basename(targetPath).indexOf('.') === -1) {
        targetPath = path.join(targetPath, path.basename(sourcePath))
    }
    mkDir(targetPath).then(() => {
        reiteFile(sourcePath, targetPath)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    copyFile,
    copyFileDir,
}
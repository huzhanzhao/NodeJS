require.config({ //require.config是require.js里定义的，套路如此，知道就行
    baseUrl: "./js", //咱们要使用的这些js文件，从这个目录开始算
    shim: { //非AMD规范JS文件声明，里面这3个都不符合AMD规范。testObj，CanvasWindy都是函数名
        // 'jquery': {
        //     deps: [],
        //     exports: '$' //函数名
        // },
    },
    paths: { //给每一个js文件赋一个ID 必须省略后缀 .js
        "jquery": "jquery.min",
        "amdJsWithDe": "amdJsWithDe",
        "amdJS": "amdJS",
    },
})

// require([
//     'amdJsWithDe',
//     'amdJS',
//     "jquery",
// ], function (
//     amdJsWithDe,
//     amdJs,
//     jquery,
// ) {
//     amdJsWithDe.hi();
//     amdJs.go()
//     console.log(jquery)
//     console.log($)
//     $('#box').click(function () {
//         console.log('aaaa')
//     })

// });
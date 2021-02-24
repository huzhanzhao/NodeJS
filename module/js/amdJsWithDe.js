define(['./jquery.min'], function (jquery) {
    console.log(jquery)
    $('#box2').click(function () {
        console.log('hello')
    })

    function hi() {
        console.log("Hello World!");
    }

    return {
        hi
    };
});
let arr = [
    {
        selector: 'a',
        style: {
            a: 1
        }
    },
    {
        selector: 'b',
        style: {
            b: 1
        }
    },
    {
        selector: 'c',
        style: {
            c: 1
        }
    }
]

let obj1 = {
    selector: 'a',
    style: {
        a: 1
    }
}

let obj2 = {
    selector: 'd',
    style: {
        d: 1
    }
}

console.log(arr.includes(obj1))
console.log(arr.includes(obj2))
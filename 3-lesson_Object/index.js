// =====================================================
//                Part 1
// =====================================================


var object = {
        name: "Вася",
        age: 25,
    }
    /**
     * №1
     */
console.log(checkProp(object, 'age'))

function checkProp(obj, value) {
    for (let key in obj) {
        if (key == value) return true
    }
}


/**
 * №2
 */
console.log(getObjectKeys(object))

function getObjectKeys(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(key)
    }
    // return arr.toString() or
    return arr.join()
}


/**
 * №3
 */
console.log(getObjectLength(object))

function getObjectLength(obj) {
    let count = 0;
    for (let key in obj) {
        count++;
    }
    return [count, Object.keys(obj).length]
}

/**
 * №4
 */
var array = [
    1, 2, 'three',
    { name: "Вася" },
    { name: "Masha" },
    { name: "Sergey" },
    { display: "block", color: 'red' }
]
console.log(cloneArray(array))

function cloneArray(arr) {
    let clonArr = [];
    for (let i = 0; i < arr.length; i++) {
        clonArr[i] = arr[i]
    };
    return clonArr
}

/**
 * а что будет если я создам клон массива и запешу его в переменную "clone"
 * потом поменяю исходный массив array.
 * что я увижу если выведу clone[3].name?
 * где глубокое клонирование?
 */
var clone = cloneArray(array);
array[3].name = false;
console.log(clone[3].name);


/**
 * №5
 */
var utils = {
    firstChar: function(str) { return str.charAt(0) },
    lastChar: function(str) { return str.charAt(str.length - 1) },
    reverseStr: function(str) {
        return str.split('').reverse().join('')
    },
    infoStr: function(str) {
        return { size: str.length, spaceLessSize: str.replace(" ", "").length }
    },
    toUpper: function(str) {
        return str.toUpperCase()
    }
};

console.log('firstChar = ', processString1('Hello', 'firstChar'))
console.log('lastChar = ', processString1('Hello', 'lastChar'))
console.log('infoStr = ', processString1('Hello world', 'infoStr'))
console.log('reverseStr = ', processString1('Hello world', 'reverseStr'))
console.log('without METHOD = ', processString1('Hello world'))

function processString(string, met) {
    method = utils[met] ? utils[met] : utils.toUpper;
    return method(string)
}

/**
 * хорошо!
 * можно и не записывать в переменную
 */
function processString1(string, met) {
    return met ? utils[met](string) : utils.toUpper(string)
}
// ======================================================
//              Part 2
// ======================================================


var objectName = {
        name: "Вася",
        surname: "Pypkin",
        age: 25,
    }
    /**
     * №1
     */
Object.defineProperties(objectName, {
    'name': {
        writable: false
    },
    'surname': {
        writable: false
    }
})
objectName.name = 'Petya';
console.log('defineProperties edit=', objectName.name)
console.log('defineProperties delete', delete objectName.name)
console.log('Object.name = ', objectName.name)




/**
 * №2
 */
var objectPrice = {
    count: 2,
    price: 15,
    toString: function() {
        return this.count * this.price
    }
}
Object.defineProperty(objectPrice, 'toString', {
    enumerable: false
});
console.log('objectPrice.toString()', objectPrice.toString())
for (var key in objectPrice) {
    console.log('>>>> key ', key)
}

/**
 * №3
 */

function setPropertiesObject(obj, arrSet) {
    if (!arrSet.length) return obj
    var setProp = {};
    for (let i = 0; i < arrSet.length; i++) {
        setProp[arrSet[i]] = false
    }
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        console.log(keys[i])
        Object.defineProperty(obj, keys[i], setProp)
    }
    return obj
}
/**
 * не нужно создавать лишний массив
 * используй то, что уже встроено нативно -- метод перебора ключей объекта
 * мне нравится, что ты сразу определил setProp, а не гоняешь arrSet для каждого ключа :)
 */
function setPropertiesObject1(obj, arrSet) {
    if (!arrSet.length) return obj
    var setProp = {};
    for (let i = 0; i < arrSet.length; i++) {
        setProp[arrSet[i]] = false
    }
    for (let key in obj) {
        Object.defineProperty(obj, key, setProp)
    }
    return obj
}

console.log('setPropertiesObject', setPropertiesObject1(objectPrice, ['writable', 'enumerable']))
objectPrice.count = 555;
objectPrice.price = 555;
console.log('objectPrice.count=', objectPrice.count, 'objectPrice.price=', objectPrice.price)
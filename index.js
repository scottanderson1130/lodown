'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * 
 * @return {*}: The function will execute on each index of the array
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/** 
 * identity: take a value and return that input value unchanged.
 * 
 * @param {*} value: single value that can be of any datatype
 * 
 * @return {*}: The input value that is unchanged
 */

function identity (value) {
        return value;
    }
    
module.exports.identity = identity;

/**
 * typeOf: Will return the datatype of any variable
 * 
 * @param {*} value: can take a value of any datatype
 * @return {String}: A string value of the datatype
 * 
 */
 function typeOf(value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
module.exports.typeOf = typeOf;

/**
 * first: Will take in an array and return the 1st value of that array
 *  if array is empty, will return an empty array.
 * 
 * @param {Array} arr: The array of which to return the frist number of items
 * @param {Number} num: This will determin how many values from the array to return
 * 
 * @return {Array}: Will return the 1st index of an array up to a given ending number. 
 *  if no ending number is given, the array will return the 1st value
 * 
 */
 function first(arr, num) {
        
        if (typeOf(arr) !== "array" || num < 0) {
            return [];
        }
        if (typeOf(num) !== 'number') {
            return arr[0];
        } 
        return arr.slice(0, num)
    }

module.exports.first = first;

/**
 * last: Given an array and a variale count, this will return the ending of an array
 *  based on the amount of variables desired.
 * 
 * @param {Array} arr: Given array to extract data from
 * @param {Number} num: The amount of variables desired
 * 
 * @return {Array}: Will an array based off of the given array. This array
 *  will at minimum be the last index of the array but will include amount 
 *  of variables if given.
 * 
 */
 function last(arr, num) {
        if (typeOf(arr) !== "array" || num < 0) {
            return [];
        }
        if (typeOf(num) !== 'number') {
            return arr[arr.length - 1];
        } 
        if (num > arr.length) {
            return arr;
        }
        return arr.slice(arr.length - num, num + 1);
    }

module.exports.last = last;

/**
 * indexOf: Will return the index of a value within a given array. If no
 *  match is found, will return -1.
 * 
 * @param {Arrary} arr: This is the array needed to extract data
 * @param {*} value: The value to determine the index within the given Array
 * 
 * @return {Number}: The index value of the given value within the Array
 *  if not found, will return -1
 */
 function indexOf(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return i;
            } 
            if (i === arr.length - 1 && arr[i] !== value) {
                return -1;
            }
        }
    }
module.exports.indexOf = indexOf;

/**
 * contains: Will return a boolean value if the value is found 
 *  within a given array
 * 
 * @param {Array} arr: Array of value in question
 * @param {*} value: Value to determine if located within a given Array
 * 
 * @return {Boolean}: Will return a true/false value if located in 
 *  the given array
 */
 function contains(arr, value){
        return arr.includes(value) ? true : false;
    }
    
module.exports.contains = contains;

/**
 * unique: Returns a new array removing duplicates from a given array
 * 
 * @param {Array} arr: Array given to remove the duplicates
 * 
 * @return {Array}: Returns a new array removing the duplicates from the 
 *  given array
 */
 function unique(arr) {
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (indexOf(newArr, arr[i]) === -1 || newArr.length === 0) {
                newArr.push(arr[i])
            }
        }
        return newArr;
    }

module.exports.unique = unique;

/**
 * filter: Given an array and a function. Return the values that will return true
 * 
 * @param {Array} arr: Array of values that will be arguments in the given function
 * @param {Function} func: This function will return a Boolean value on each of the values within the array
 *  Returning a new array based of those values that are true
 * 
 * @return {Array}: Will return a new array of the values from the array that when run through the function
 *  return true
 */
 function filter(arr, func) {
        const newArr = [];
        each(arr, (e, i, a) => {
            if(func(e, i, a)) {
                newArr.push(e);
            }})

        return newArr;
    }

module.exports.filter = filter;

/**
 * reject: Return a new array of False values based on the results of a Function using each given
 *  array value as the argument.
 * 
 * @param {Array} arr: Given array to test each value with the given function
 * @param {Function} f: This function will test each value of the array and return a Boolean value
 * 
 * @return {Array}: If the return from the Function is False it will add the array value to a new array
 */
 function reject(arr,f) {
     const newArr = [];
        each(arr, (e, a, i) => {
            if(!f(e, a, i)) {
                newArr.push(e)
            }
        })
        return newArr;
    }

module.exports.reject = reject;

/**
 * partition: Will return an array of array's based off a given function and array. The 1st array is 
 *  truthy and the second is falsy
 * 
 * @param {Array} arr: Array to run given function. Will return truthy and falsy values
 * @param {Function} f: Function that will return truthy and falsy values for each index value of 
 *  the array
 * 
 * @return {Array}: Returns an array containing 2 arrays. 1st Truthy values and 2nd Falsy values
 */
 function partition(arr, f) {
        const arrTruthy = [];
        const arrFalsy = [];
        
        each(arr, (e, a, i) => {
            if(f(e, a, i)) {
                arrTruthy.push(e)
            }
        })
        each(arr, (e, a, i) => {
            if(!f(e, a, i)) {
                arrFalsy.push(e)
            }
        }) 
        
        const arrReturn = [];
        arrReturn.push(arrTruthy, arrFalsy)
        return arrReturn;
    }

module.exports.partition = partition;

/**
 * map: Return an array with updated values from an Array/Object based on a given function
 * 
 * @param {Array/Object} collection: Array/Object to iterate and use as arguements for a given function
 * @param {Function} f: The function will return a value to be stored in a new array using the
 *  provided Array/Object
 * 
 * @return {Array}: This array will contain all of the values returned from the Function using 
 *  the Array/Object values
 */
 function map(collection, f) {
         const arr = [];
         if (typeOf(collection) === "array") {
            for (let i = 0; i < collection.length; i++) {
                arr.push(f(collection[i], i, collection))
            }
        }
        if (typeOf(collection) === "object") {
            for (let key in collection) {
                arr.push(f(collection[key], key, collection))
            }
        }
        return arr;
    }

module.exports.map = map;

/**
 * pluck: Given an Array of Objects, return the values from each object of a given key
 * 
 * @param {Array of Objects} arr: Array will contain multiple Objects to iterate through and return 
 *  values of a provided key
 * @param {String} prop: The string value of a desired key to obtain the value from each Object
 * 
 * @return {Array}: Will return an Array of all the values from each Object at the provided key.
 */ 
 function pluck(arr, prop) {
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
             if (Object.keys(arr[i]).includes(prop)) {
                 newArr.push(arr[i][prop])
             }
             
        }
        return newArr;
    }

module.exports.pluck = pluck;

/**
 * every: Given a collection (Object/Array) and a function, will return a single boolean value
 *  if ALL are true using each value in the collection as the argument, then true will be returned
 *  If only one false, false will be returned. 
 * 
 * @param {Array/Object} collection: Array and Object will be used for the arguements of a desired 
 *  function
 * @param {Function} func: The function provided will use the individual values from the Array
 *  and/or Object to return a boolean value
 * 
 * @return {Boolean}: Will return a true/false value based on if ALL are true or one is false
 */
  function every(collection, func) {
    if (func === undefined) {
        for (let i in collection) {
            if ((!!collection[i]) === false) {
                return false;
            }
        }
        return true;
    } else if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (func(collection[i], i, collection) === false) {
                return false;
            }
        }
        return true;
    } else {
        for (let key in collection) {
            if (func(collection[key], key, collection) === false) {
                return false;
            }
        }
        return true;
    }
}

module.exports.every = every;

/**
 * some: Return a single boolean value given a collection of data and a function.
 *  If ALL are false, return false. If one is true, return true
 * 
 * @param {Array/Object} collection: Array and Object provided will be used as the arguments
 *  for a given function.
 * @param {Function} func: The provided function will return a boolean value using each value from
 *  a given Array/Object
 * 
 * @return {Boolean}: True or false will be returned. If the function returns ALL false, false 
 *  will be provided. If only one true, true will be returned
 */
 function some (collection, func) {
        if (func === undefined) {
        for (let i in collection) {
            if ((!!collection[i]) === true) {
                return true;
            }
        }
        return false;
    } else if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (func(collection[i], i, collection) === true) {
                return true;
            }
        }
        return false;
    } else {
        for (let key in collection) {
            if (func(collection[key], key, collection) === true) {
                return true;
            }
        }
        return false;
    }                                                   
}

module.exports.some = some;

/**
 * reduce: Using a function and an array, will use the function to calculate a final value using
 *  each array value as the input
 * 
 * @param {Array} arr: Given array of values to use as arguements for a desired outcome of a function
 * @param {Function} fn: The function will use the itarative values of a given array
 * @param {Number} seed: The starting value for the function. If no value given, the 
 *  1st value of the array will be used
 * 
 * @return {Number}: Will calulate a single value using the given function and array
 */
 function reduce(arr, fn, seed) {
        for (let i = 0; i < arr.length; i++) {
            if (seed === undefined){
                seed = arr[0]
            } else {
            seed = fn(seed, arr[i], i);
            }
        }
        return seed;
      }

module.exports.reduce = reduce;

/**
 * extend: Will take in any number of Objects and combining all the values into 1 object
 * 
 * @param {Object} ...obj: Will accept any number of Objects. The 1st will be updated with 
 *  key/values of the other object. If any objects have the same key, they last value will
 *  be the remaining value.
 * 
 * @return {Object}: Will return an Object containing all the keys and values from the
 *  provided objects
 */
 function extend(...obj) {
        const arrObjs = [...obj]
        if (arrObjs.length === 1) {
            return arrObjs[0]
        }
        for (let i = 1; i < arrObjs.length; i++){
            for (let key in arrObjs[i]) {
                arrObjs[0][key] = arrObjs[i][key]
            }
        }
        return arrObjs[0]
    }
    
module.exports.extend = extend;
 
 
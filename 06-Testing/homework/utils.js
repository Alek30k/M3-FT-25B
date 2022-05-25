const { arrayReplaceAt } = require("markdown-it/lib/common/utils")

function sumArray(array, num){
    if(!array.isArray(array)) throw TypeError('array')
    if(typeof num !== 'number') throw TypeError('num')

    for(var i = 0; i < array.length; i++) {
        for(var j = i + 1; j < array.length; j++){
            if(array[i] + array[j] === num) return true
        }
    }
    return false
    
}

//[{nombre: Alejandro, apellido: Cabrera}, {nombre: juan, apellido: Perez}], 'nombre
function pluck(arr, prop){
    return arr.map(o => o[prop])
}

module.exports = {
    sumArray,
    pluck
}
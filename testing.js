let arr = ['tag1','tag2']
let string = 'tag2 tag1'
let bool = true
let newBool = false
arr.map((element)=> {
    newBool = new RegExp(element).test(string)
    bool = bool && newBool
})
console.log(bool)

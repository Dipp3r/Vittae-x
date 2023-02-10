function checkString(string,num = 0){
    string = string.trim()
    if (string.length === 0) return false
    var bool =  true
    /*
    num:
    1 -> userName
    2 -> password
    3 -> email
    */
    if((/^\d/g.test(string))&(num === 1 | num === 3)){
        //digits at the beginning for userName
        bool = false
        // console.log('case1')
    }
    if((/\W/.test(string))&(num === 1)){
        //not alpha numeric  === not [0-9a-zA-Z_]
        bool = false
        // console.log('case2')
    }
    if((/\s/.test(string))&(num === 2 | num === 1)){
        bool = false
        // console.log('case3')
    }
    if(num === 2){
        if(!(/[a-z]/.test(string) & /\d/.test(string) & /\W/.test(string))){
            bool = false
            //console.log('case4')
        }
    }
    if (num === 3){
        if (string.split('@').length != 2){
            bool = false
        }else if (!((string.slice((string.match(/[@]/).index+1))).split('.').length === 2)){
        //checking if the domain name cointains a single 'dot'('.')
        bool = false
        }
    }
    return bool
}
export default checkString;
// console.log(checkString('aBCabc123#$',num = 2))
// console.log(checkString('ASWD34',num = 2))
// console.log(checkString('adw44',num = 2))
// console.log(checkString('fam@gmail.com',num = 3))
function checkString(string, num = 0) {
  var obj = { bool: false, msg: "" };
  if (!string) {
    obj.msg = "empty value";
    return obj;
  }
  string = string.trim();
  if (string.length === 0) {
    obj.msg = "empty value";
    return obj;
  }
  /*
    num:
    1 -> password
    2 -> email
    3 -> mobile number
    4 -> name
    */
  switch (num) {
    case 1:
      if (!/[a-z]+/.test(string)) {
        obj.msg = "password must contain a small letter";
        return obj;
      } else if (!/[A-Z]+/.test(string)) {
        obj.msg = "password must contain a capital letter";
        return obj;
      } else if (string.length < 8) {
        obj.msg = "password must contain atleast 8 characters";
        return obj;
      } else {
        obj.bool = true;
        return obj;
      }
    case 2:
      if (/^([\d]+)/.test(string)) {
        obj.msg = "email shouldn't begin with digit";
        return obj;
      } else if (!/[\w]+[@]/.test(string)) {
        obj.msg = "Invalid email";
        return obj;
      } else if (!/[@].+[.].+/.test(string)) {
        obj.msg = "Incorrect domain address";
        return obj;
      } else {
        obj.bool = true;
        return obj;
      }
    case 3:
      if (string[0] === "+") {
        string = string.slice(3);
      }
      string = string.trim();
      // console.log(string)
      if (!/^[\d]+$/.test(string) | (string.length !== 10)) {
        obj.msg = "Invalid mobile number";
        return obj;
      }
      obj.bool = true;
      return obj;
    case 4:
      if (!/^[a-zA-Z]+$/.test(string)) {
        obj.msg = "Invalid name";
      } else {
        obj.bool = true;
      }
      return obj;
    default:
      obj.bool = true;
      return obj;
  }
  // console.log('\n')
}
export default checkString;
// console.log('\npassword:')
// console.log(checkString('!Qqwerty1',1))
// console.log(checkString('aBC12abc#$',1))
// console.log(checkString('ASWD34',1))
// console.log(checkString('adyAZ5wer',1))
// console.log(checkString('ady768wer',1))

// console.log('\nmail:')
// console.log(checkString('sample@gmail.com',2))
// console.log(checkString('sample#$@gmail.com',2))
// console.log(checkString('12sample@mail.com',2))
// console.log(checkString('@gmail.com',2))
// console.log(checkString('samplemail.com',2))
// console.log(checkString('sample@mail',2))

// console.log('\nmobile:')
// console.log(checkString('1234567890',3))
// console.log(checkString('+911234567890',3))
// console.log(checkString('+91 1234567890',3))
// console.log(checkString('+1234567890',3))

//password condition for symbole and digit

// else if(!/[0-9]+/.test(string)){
//     obj.msg = 'password must contain a digit '
//     return obj
// }else if(! /[\W]+/.test(string)){
//     obj.msg = 'password must contain a symbol'
//     return obj
// }

// function isNumber(value){
//     if(Number.isInteger(value))
//         return true;

//     return false;
// }





// // Expected results:
// console.log(isNumber(999)); // true
// console.log(isNumber('abc')); // false
// console.log(isNumber('100')); // false
function getRandNumbers(min,max,length){
    var a= new Array();
   for(var i=0;i<length;i++){
       a[i]=Math.random() * (max - min) + min;
   }
      return a;
  }
  var a=getRandNumbers(1,5,4);
  console.log(a);
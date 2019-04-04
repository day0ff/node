'use strict'
async function waitFor(ms) {
  return new Promise(r => setTimeout(r, ms)).then(() => ms);
}
async function forEach(array, callback) {
  for (let i = 0; i < array.length; i++)
    await callback(array[i], i, array).then(r => array[i] = r);
  return array;
}

let mas = [200, 100, 300];
forEach(mas, async (v) => {
  await waitFor(v).then(r => console.log(r)).catch(new Error('ASD'));
}).catch(err => console.log(`Error :: ${err}`));

async function asyncWhile(array) {
  let i = 0;
  while (i<array.length) {
    await waitFor(array[i]).then(r => console.log(r));
    i++;
  }
}
asyncWhile(mas);
// const SNICKERS = ['adidas','nike','puma','kelmi'];
//
// function f1(){console.log('adidas');}
// function f2(){console.log('nike');}
// function f3(){console.log('puma');}
// function f4(){console.log('kelmi');}
// function d(){console.log('default');}
//
// const STAFS = ['nike','lida','puma','adidas','mike','lacost','kelmi','reebock'];
//
// function getSnickers (type) {
//   var snickers = {
//     'adidas': ()=> {
//       return f1();
//     },
//     'nike': ()=> {
//       return f2();
//     },
//     'puma': ()=>  {
//       return f3();
//     },
//     'kelmi': ()=>  {
//       return f4();
//     },
//     'default': ()=>  {
//       return d();
//     }
//   };
//   return (snickers[type] || snickers['default'])();
// };
//
// while(STAFS.length>0){
//   getSnickers(STAFS[0]);
//   STAFS.shift();
// }

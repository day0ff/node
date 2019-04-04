'use strict'
async function waitFor(ms) {
  return new Promise(r => setTimeout(r, ms)).then(() => ms);
}
async function forEach(array, callback) {
  for (let i = 0; i < array.length; i++)
    await callback(array[i], i, array).then(r => array[i] = r);
  return array;
}
let mas = [200, 100, 600];
forEach(mas, async (v) => {
  await waitFor(v).then(r => console.log(r)).catch(new Error('ASD'));
}).catch(err => console.log(`Error :: ${err}`));

async function done() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error('End Time'));
      resolve("result");
    }, 100);
  });
  return await promise
    .catch(error => {
      throw new Error("Rejected: " + error.message)
    });
}
done().then(result => console.log(result)).catch(error => console.log("Done: " + error.message));
console.log('done');

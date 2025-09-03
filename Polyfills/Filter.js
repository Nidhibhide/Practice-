const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function func(val, index, array) {
  return val % 2 == 0;
}
// const result=arr.filter(func);
Array.prototype.myFilter = function (func) {
  let value;
  const result = [];
  for (i = 0; i < arr.length; i++) {
    value = func(arr[i], i, arr);
    if (value) result.push(arr[i]);
  }
  return result;
};
const result = arr.myFilter(func);
console.log(result);

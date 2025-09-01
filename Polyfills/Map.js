const arr = [1, 2, 3, 4, 5];

function func(val, index, array) {
  return val * 2;
}

Array.prototype.myMap = function () {
  const result = [];
  let value;
  for (i = 0; i < arr.length; i++) {
    value = func(arr[i], i, arr);
    result.push(value);
  }
  return result;
};
const result = arr.myMap(func);

console.log(result);

const arr = [1, 2, 3, 4, 5];

function func(num, index, array) {
  console.log(num + "------------ " + index + " --------------" + array);
}

//pollyfills
Array.prototype.myForEach = function (func) {
  for (i = 0; i < arr.length; i++) {
    func(arr[i], i, arr);
  }
};

arr.myForEach(func);

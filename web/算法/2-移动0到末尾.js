// 1 5 0 3 0 4 0
const moveNum = (arr) => {
  let i = 0,
    j = 0;
  for (; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
  }
  console.log(arr);
};
moveNum([1, 5, 0, 3, 0, 4, 0]);

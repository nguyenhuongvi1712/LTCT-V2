export function formatCash(str, currency) {
  return (
    str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev
      }) +
    '' +
    currency
  )
}
export function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
export function sumSimpleArray(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum
}
export function formatMonthDate(date, symbol) {
  const newDate = new Date(date)
  const month = newDate.getMonth() + 1
  return month + symbol + newDate.getFullYear()
}
export function findMaxIndex(arr) {
  var max = arr[0]
  var index = 0
  for (let i = 1; i < arr.length; i++) {
    if (i > max) index = i
  }
  return index
}

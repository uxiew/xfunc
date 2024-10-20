// export function add(a, b) {
//   const result = a + b;
//   return parseFloat(result.toFixed(10));
// }

/**
* 判断obj是否为一个整数
*/
export function isInteger(obj: number) {
  return Math.floor(obj) === obj
}

/**
* 将一个浮点数转成整数，返回整数和倍数。如 `3.14 -> 314`，倍数是 `100`
* @param floatNum {number} 小数
* @return {object} `{ times:100, num: 314 }`
*/
export function toInteger(floatNum: number) {
  const ret = { times: 1, num: 0 };
  if (isInteger(floatNum)) {
    ret.num = floatNum;
    return ret
  }
  const strFi = floatNum + '';
  const len = strFi.slice(strFi.indexOf('.') + 1).length;
  const times = Math.pow(10, len);
  const intNum = parseInt((floatNum * times + 0.5) + '', 10);
  ret.times = times;
  ret.num = intNum;
  return ret
}

/**
* 解决 js 加减乘除运算不精准，缺失精度问题
* 核心方法，实现加减乘除运算，确保不丢失精度。
* 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
* @param a {number} 运算数
* @param b {number} 运算数
* @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
*/
export function operation(a: number, b: number, op: 'add' | 'subtract' | 'multiply' | 'divide') {
  const o1 = toInteger(a);
  const o2 = toInteger(b);
  const n1 = o1.num; var n2 = o2.num;
  const t1 = o1.times; var t2 = o2.times;
  const max = t1 > t2 ? t1 : t2;
  let result = null;
  switch (op) {
    case 'add':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 + n2
      }
      else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max;
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      }
      else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      }
      else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max;
    case 'multiply':
      result = (n1 * n2) / (t1 * t2);
      return result;
    case 'divide':
      result = (n1 / n2) * (t2 / t1);
      return result
  }
}

/**
* 相加
*/
export function add(n: number, n1: number) {
  return operation(n, n1, 'add')
}

/**
* 相减
*/
export function subtract(n: number, n1: number) {
  return operation(n, n1, 'subtract')
}

/**
* 相乘
*/
export function multiply(n: number, n1: number) {
  return operation(n, n1, 'multiply')
}

/**
* 除以
*/
export function divide(n: number, n1: number) {
  return operation(n, n1, 'divide')
}

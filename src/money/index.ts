/**
* 大写数字的使用始于明朝。朱元璋因为当时的一件重大贪污案“郭桓案”而发布法令，其中明确要求记账的数字必须由“一、二、三、四、五、六、七、八、九、十、百、千”改为“壹、贰、叁、肆、伍、陆、柒、捌、玖、拾、佰（陌）、仟（阡）”等复杂的汉字，用以增加涂改帐册的难度。
*
* ## 人民币金额大写规则：

1、不得使用阿拉伯数字0123456789，也不得使用一、二、三、四、五、六、七、八、九、十，只能使用汉字大写：壹、贰、叁、肆、伍、陆、柒、捌、玖、拾、佰、仟、万等，而且只能使用正楷或行书填写。

2、金额到“元”或“角”为止的，在元或角之后要增加一个“正”或者“整”字。例如：99 ⇨ 玖拾玖元整；又如：99.1 ⇨ 玖拾玖元壹角整

3、金额后面有分的，再其后不用写“正”或者“整”字，例如：99.12 ⇨ 玖拾玖元壹角贰分

4、阿拉伯数字金额中含有0的，要用零写出来，例如：1208.01 ⇨ 壹仟贰佰零捌元零壹分

5、阿拉伯数字金额中含有多个0的，只需写一个零，例如：20001 ⇨ 贰万零壹元整

6、大写金额的“元位”是零但“角位”不是零，可以在“元”的后面加零字，或者不加也可以，例如：100.11 ⇨ 壹佰元零壹角壹分（或者写成：壹佰元壹角壹分）

## 备注

1、不支持负数，负数在人民币大写金额中也用不到。

2、最多支持到分（数字金额小数点后两位），如果您输入的阿拉伯数字精确到千分位以上，则会千分位起会被四舍五入。
* @param money
* @returns 大写的中文金额💰
*/
export function capitalizeRMB(money: string | number) {
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖',]
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  const cnDecUnits = ['角', '分']
  // 整数金额时后面跟的字符
  const cnInteger = '整'
  // 整型完以后的单位
  const cnIntLast = '元'
  // 最大处理的数字
  const maxNum = 9999999999999999.99
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''

  // 分离金额后用的数组，预定义
  let parts
  if (money === '') return ''
  money = parseFloat(money as string)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money

    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        //alert(cnNums[parseInt(n)])
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = Number(decimalNum.substr(i, 1))
      // ￥325.04 应写成 叁佰贰拾伍元零肆分
      chineseStr += (n === 0 ? cnNums[n] : cnNums[n] + cnDecUnits[i])
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

/**
 * 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据
 *
 * 示例一: 'abc' --> {value: 'abc'}
 * 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
 */
const normalize = str => {
  const list = str.split(/[\[\]]/g).filter(Boolean)
  const res = {}
  let c
  list.forEach((item, index) => {
    if(index === 0) {
      res.value = item
      c = res
    } else {
      c.children = {}
      c.children.value = item
      c = c.children
    }
  })
  return res
}

console.log(normalize('[abc[bcd[def]]]'));
# 文字属性
1. word-break

  CSS 属性 word-break 指定了怎样在单词内断行。

```
/* Keyword values */
word-break: normal; 使用默认的断行规则。
word-break: break-all; 对于 non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
word-break: keep-all; CJK 文本不断行。Non-CJK 文本表现同 normal。
word-break: break-word; /* deprecated */ 他的效果是word-break: normal 和 overflow-wrap: anywhere 的合，不论 overflow-wrap的值是多少。

/* Global values */
word-break: inherit;
word-break: initial;
word-break: unset;

```

2. overflow-wrap

  应用于行级元素，用来设置浏览器是否应该在一个本来不能断开的字符串中插入换行符，以防止文本溢出其行向盒。

```
/* 关键词值 */
overflow-wrap: normal; 行只能在正常的单词断点（例如两个单词之间的空格）处换行。
overflow-wrap: break-word; 为防止溢出，如果行中没有其他可接受的断点，则不可断的字符串（如长词或 URL）可能会在任何时候换行。在断点处不会插入连字符。在计算最小内容内在大小时，会考虑由单词换行引入的软换行机会。
overflow-wrap: anywhere; 与 anywhere 值相同，如果行中没有其他可接受的断点，则允许在任意点将通常不可断的单词换行，但在计算最小内容内在大小时不考虑断字引入的软换行机会。

/* 全局值 */
overflow-wrap: inherit;
overflow-wrap: initial;
overflow-wrap: revert;
overflow-wrap: revert-layer;
overflow-wrap: unset;
```

3.white-space

  CSS white-space 属性用于设置如何处理元素内的空白字符。

```
/* 单个关键字值 */
white-space: normal; 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。
white-space: nowrap; 和 normal 一样合并空白符，但阻止源码中的文本换行。
white-space: pre; 连续的空白符会被保留。仅在遇到换行符或 <br> 元素时才会换行。
white-space: pre-wrap; 连续的空白符会被保留。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。
white-space: pre-line; 连续的空白符会被合并。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。
white-space: break-spaces;

/* white-space-collapse 和 text-wrap 简写值 */
white-space: collapse balance;
white-space: preserve nowrap;

/* 全局值 */
white-space: inherit;
white-space: initial;
white-space: revert;
white-space: revert-layer;
white-space: unset;
```

4. text-wrap

   文本换行
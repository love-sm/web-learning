
# 概述
CSS 是一门很古老、应用很广泛的语言，当然也有很多人说它算不上一门语言，不过无论怎样，样式领域中，它是当之无愧的霸主。

在它漫长的发展历程中，诞生了许许多多的“最佳实践”，譬如 className 要语义化，以及内容和样式分离等等。但是还是有很多人反映 CSS 难懂难学，虽然入门简单，一看即会，但是要想深入掌握，则需要耗费巨大的精力，且往往并不被认可。

具有其他领域编程经验的人触碰到前端时，往往可以通过其他领域的经验，快速地掌握 HTML / JS 等语法，却很难做到不畏惧 CSS，更不要提做好 CSS 的架构。也许在不少人的心中，CSS 是没有什么架构的概念的。

所以，有没有这么一种可能，CSS 的“最佳实践”们，并不好使？

过去的十年是前端日新月异的十年，相比于最初的 HTML / CSS / Javascript 三板斧，伴随着 React 的流行而深入人心的是 JSX 的语法，HTML 和 Javascript 的主次地位发生了变化。然而这么多年以来，CSS 的写法却基本未产生明显的变化，依旧是独立于 HTML / Javascript 存在，通过 class / id 等锚点对页面进行装饰。

让我们暂时抛去既有的成见，重新从软件工程中可靠性、可理解性、可维护性、可重用性等角度，剖析历史中出现的一些 CSS 架构，寻找各种架构的优缺点，最后达成一个对 CSS 架构的更深入的理解。


## 为什么需要寻求 css 解决方案

答：**解决 CSS 模块化问题**。

那么，CSS 模块化遇到了哪些问题？
- 全局污染
- 命名混乱
- 依赖管理不彻底
- 无法共享变量
- 代码压缩不彻底 [参考链接](https://github.com/camsong/blog/issues/5)

那么现在社区都有哪些解决方案呢？
# 现有解决方案特点
## CSS in .css
> 这是最原始的方式，将 CSS 全部写在 .css 文件中，使用原生的 CSS 语言去写样式。

这是刚刚进入前端开发领域的同学，一定会接触的样式实现方案。在早期前端开发还没有前后端分离概念，没有借助构建工具等工程化手段时，这种方式无疑是最寻常，最朴素的方式。

在开发一些小型应用时，这一定最好的方式，因为它能够帮你快速实现想要的样式，也不会影响你的开发体验，也能够得到很好的性能方面的问题。

但如果你是一个具备一定经验的开发者，具有大型项目的开发经验，你可能已经意识到以下问题：

- 兼容性问题：我们往往需要自行解决各浏览器引擎的 CSS 兼容性问题。但这些兼容性大多是我们在重复解决的。

- 缺失逻辑性：CSS 没有变量、函数这些概念，也没有模块机制，导致书写效率以及代码的维护性都不高。

- 复用性低：CSS 缺少抽象的机制，选择器很容易出现重复，不利于维护和复用。

- 全局污染：CSS 是层叠样式，作用域是全局的，这就可能导致元素的样式命中规则来源于一个 .css 文件多处或是多个 .css 文件；并且不同种类的选择器，例如 ID 选择器、类选择器、元素选择器等的权重也不一样，这很容易引起样式相互覆盖或冲突。

- 难以维护：遇到冲突时，改起来可能会非常复杂，当我们好不容易解决了问题，但确很可能助推了 css 体积无限膨胀。

## CSS 命名规范 BEM
> BEM的意思就是块（block）、元素（element）、修饰符（modifier），是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

从原理上来说，是将页面元素首先划成不同的区块（可重用组件），如电商商品页面会有 预览区（.preview）、SKU列表区（.sku-list）、评论区（.comments）、详情区（.detail）等等。然后再于区块的内部，定义一些元素，如 SKU 列表区中的 Button （.sku-list__button），最后还可以加状态修饰符，如禁用状态的按钮（.sku-list__button--disabled）。

它有两个比较核心的原则：

- 结构和样式分离

- 容器和内容分离

```html
<div class="card__body">
  <p class="card__body__content">Content</p>
  <div class="card__body__links">
    <a href="#" class="card__body__links__link--active">Link</a>
  </div>
</div>
```

BEM 不是框架也不是技术，是方法论，因此我们也可以将 BEM 和预处理结合获得各自的优势。BEM 的规范易于理解，即使是新手，也很容易看懂并模仿。它也有缺点，就是类名特别长，尤其是在有 Sass / Less 嵌套的时候。

BEM 架构具有如下的优点：
- 可读性强
- 模块隔离（手动保证唯一性，或者启用 CSS Module）
- 可维护性强（质量角度）（修改 A 模块不担心影响到 B 模块）

但是它也有如下的缺点：
- 冗余度高（区块内的相似元素难以复用样式，容易催生 CV 工程师，先复制再修改）
- 过于自由，缺乏规范（举例来说，有人统计过Gitlab网站中有几百种颜色值）
- class 名称比较长
- 难以实现响应式设计

另外对于 BEM 模式尝试解决的一个问题：HTML结构与样式分离，它解决的也不够好，HTML确实不关心CSS怎么写，但是CSS常常需要关心 HTML 的内部细节，因此在对 HTML 结构做调整的时候，一般都需要对 CSS 对相应的调整。

## CSS Module
> CSS Modules 加入了局部作用域和模块依赖，可以保证某个组件的样式不会影响到其他组件。

需要指出的是，CSS Modules 不是原生支持的，需要结合构建工具。在基于 webpack 构建的项目中，使用过 css-loader 的同学应该比较熟悉。

CSS Modules 允许我们像 import 一个 JS Module 一样去 import 一个 CSS Module。每一个 CSS 文件都是一个独立的模块，每一个类名都是该模块所导出对象的一个属性。通过这种方式，便可在使用时明确指定所引用的 CSS 样式。并且，CSS Modules 在打包时会自动将 id 和 class 混淆成全局唯一的 hash 值，从而避免发生命名冲突问题。

优点
- 防止命名冲突。
- 模块化机制。
- 依赖关系明确，利于维护。

缺点
- 与组件库难以配合。
- 会带来一些使用成本，本地样式覆盖困难，写到最后可能一直在用 :global。
- 要描述全局样式，必须使用不属于 CSS 规范的语法。

## CSS in js
这是伴随着 React 兴起的一种 CSS 架构，它将 css 与 jsx 写在同一个文件之中，代表产品是 styled component / emotion。

styled-components 都是基于组件化时代下诞生的具有代表性的 CSS-in-JS 解决方案。其中心思想是将 CSS 样式作为可视化原语构建样式组件。

常见用法：

```jsx
import { css } from '@emotion/css'
const color = 'darkgreen'
render(
  <div
    className={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)

```
好处如下：
- 隔离性更高（强制性的局部样式，相当于默认开启的CSS Module。）
- 不易产生无用样式代码堆积
- 基于状态动态计算样式变得简单易读

当然它也有一些坏处：

- 生成的 HTML 难以阅读
- 缺乏统一标准
- 学习成本高
- 运行时消耗
- 难以实现响应式设计等


## CSS 预处理器
> 沿用 [MDN 的解释](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS_preprocessor)，CSS 预处理器是一个能让你通过预处理器自己独有的语法来生成 CSS 的程序。市面上有很多 CSS 预处理器可供选择，且绝大多数 CSS 预处理器会增加一些原生 CSS 不具备的特性，例如代码混合，嵌套选择器，继承选择器等。这些特性让 CSS 的结构更加具有可读性且易于维护。比较流行的 CSS 预处理器有：SASS，LESS，Stylus。


实现原理：CSS 预处理器是在编写 CSS 之前对其进行处理，生成标准的 CSS 文件。预处理器扩展了 CSS 的功能，提供了变量、嵌套规则、混合宏、继承等高级特性。

1. 变量：可以定义变量，用来存储常用的值，如颜色、字体大小等。
```scss
$primary-color: #333;

body {
  color: $primary-color;
}

```

2. 嵌套：允许在选择器内部嵌套其他选择器，增强了可读性。
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

```

3. 混合（Mixins）：可以定义可复用的样式块，并在需要的地方调用。
```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }

```

4. 函数：可以定义自定义函数来进行复杂的计算和操作。
```scss
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

body { font-size: calculate-rem(32px); }
```

## CSS 后处理器
> CSS 后处理器是在生成标准的 CSS 之后，对其进行处理和优化。后处理器可以自动添加浏览器前缀、转换未来的 CSS 规范、压缩和优化 CSS 文件等。PostCSS 是最常用的后处理器平台，通过插件系统来实现各种功能。

PostCSS 相当于 CSS 界中的 Babel，帮助前段开发摆脱了 Vendor Prefix，如 -webkit-xxx 这样的样式写法。

PostCss特点如下:

1. 插件系统：后处理器通常基于插件系统，你可以选择和配置需要的插件来处理 CSS。
```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ]
}
``` 
2. 自动添加前缀：使用 autoprefixer 插件，可以自动添加浏览器前缀，确保 CSS 的兼容性。
```css
.box {
  display: flex;
}
```
3. 未来 CSS 特性：使用 postcss-preset-env 插件，可以使用未来的 CSS 规范，并将其转换为当前浏览器支持的 CSS。
```css
:root {
  --main-color: #06c;
}

body {
  color: var(--main-color);
}

```
4. 压缩和优化：使用 cssnano 插件，可以压缩和优化 CSS 文件，减少文件大小。
```css
.box {
  margin: 0;
  padding: 0;
  display: flex;
}
```

> tips: 预处理器和后处理器可以结合使用，预处理器负责编写阶段的增强，后处理器负责生成阶段的优化。例如，你可以使用 Sass 来编写 CSS，然后使用 PostCSS 来添加浏览器前缀和优化最终的 CSS 文件。

## 原子化 Css
也称为功能性 CSS，通过定义一系列原子化的全局样式，实现精简样式开发工作的目的。

如 Bootstrap 中的 Label 示例：
```html
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```
它的原理很容易理解，带有相同 class 的 HTML 结构会共享同一段样式，不同样式的差异通过 class 的不同组合体现。

原子化 CSS 具有以下的优点：

- 样式规范化
- 易于实现响应式设计
- 组件化
- 样式隔离性更高
- 不易产生无用样式代码堆积

但是它也有如下的缺点：

- 学习成本高
- 无法覆盖所有样式需求，这会导致如下两种可能性：
- 混用原子化与 BEM，做成四不像。
- 自行扩展原子化语法，进一步增大学习成本。
- 生成的 HTML 可读性差（尤其是对不熟练的人）
- 会有一些用不到的样式被引入.

BEM 模式是 CSS 依赖于 HTML 的结构，而原子化 CSS 是 HTML 依赖于 CSS。

但是它有一个稍微优于 BEM 的地方，因为 HTML 和 样式（即 class）写在了一起，当 HTML 结构发生变化的时候，CSS 会被一并修改。

# Tailwind CSS

Sass 等预处理器提升了 CSS 的便利程度；PostCSS 及 Webpack 等工程化套件提升了其可靠性；

在它们的基础之上，现代化的 CSS，关注的重点转向了 CSS 的架构、设计模式方面。怎么才能降低大型项目 CSS 的复杂度，提高可维护性？CSS 能不能被组件化、工具化？

2021 年大放异彩的 Tailwind CSS 及衍生框架给出了一些具有特色的解决方案。截止目前已经获得80k start， 达到百万级别周下载量。

## Tailwind CSS 是什么？

[Tailwind CSS](https://tailwindcss.com/docs/installation) 框架本质上是一个工具集，包含了大量类似 flex、 pt-4、 text-center 以及 rotate-90 等工具类，可以组合使用并直接在 HTML 代码上实现任何 UI 设计。

> A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

Utility-First?
> Utility-First CSS 是 Tailwind CSS 官方宣传的一种编写 CSS 的方式。
简单说：提供大量基础的 CSS class name，然后利用 CSS 的组合能力，像堆砌乐高积木一样编写 CSS。

## Tailwind CSS Demo
为了方便理解，首先让我们看看 Tailwind 的一个简单示例，对它有一个粗略的了解：

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

## Tailwind CSS 亮点
### 规范、清晰、丰富的工具 API
不同于 bootstrap 从组件的角度出发，设计了诸如 .btn、.btn-primary等风格的 API，Tailwind 做得更底层一些，它设计了一套用于替换 CSS 基本能力，含有规律的 API 集合。

再次回顾上面提到的Demo:
```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```
这个里面：
- p-6 代表 padding: 1.5em，即 6 * 0.25em; m-6 代码 margin，其余与 p-6 一致。
- h-12 代表 height: 3em，即 12 * 0.25em; w-12 代表宽度，其余与 h-12 一致。
- bg-white 代表 background-color: white;

看到这里肯定会有很多问题，如：

- 如何确定 padding 后面可以跟哪些数字呢？比如 p-10000 行不行
- 可以使用哪些颜色呢？bg-white 代表白色，bg-blue 代表蓝色，那淡蓝色怎么表示呢？
- 需要记住所有的 class 名称吗？
- 支持扩展样式吗？怎么扩展？

先讲一下 Tailwind 的 API 设计原则，这些问题就比较容易弄明白了。

Tailwind 的 API 是有很强的规律的，一般来说，可以简单地认为它的规律是 {修饰符}:{类型}-{值}

如 hover:dark:w-12 代表当进入 hover 态时，将宽度 (w) 设置为 12 （单位是 0.25em），即 3em。

类型是固定的，但是值和部分修饰符可以自定义或基于默认的进行扩展。

API具有如下规律：

- 修饰符无限叠加：如 dark:hover:w-12，指在黑暗模式下才为 hover 态设置宽度 3em，它也等价于 hover:dark:w-12，即修饰符顺序无关。
- 同类型随机组合：相同性质的类型共享所有值，可随机组合。如只要有 w-12（宽 3em），就会有 h-12（高3em）。有 text-blue （字体蓝色）就会有 bg-blue（背景蓝色）。
- 值可扩展，如默认情况下没有 p-10000，但是可以通过自定义扩展实现，且只要有 p-10000，就同时会有 px-10000 py-10000 m-10000 max-m-10000 h-10000 w-10000 等等。

棕上，学习 API 可分为如下三个部分：

- 学习有哪些修饰符，如 暗黑模式为 dark:，hover 态为 hover:等。
- 学习 CSS 的属性对应的 Tailwind 类型值，如 padding 为 p，padding-left 为 pl，margin 为 m，宽高分别为 w / h 等。
- 学习几个主要的值域，如 color 有哪些，spacing 有哪些，font-family有哪些等。另外因为这一部分可以扩展，其实完全可以在团队内自定义一套。

举例来说，假设在 tailwind.config.js中加入如下的自定义配置：
```js
module.exports = {
  theme: {
    colors: {
      primary:  var(--primary-color, '#f7fafc'),
      secondary: '#1a202c'
      // ...
    }
  }
}
```
就可以使用 bg-primary 实现 background-color: #f7fafc 的效果。

### 按需裁剪的体积优化
修饰符顺序无关，就代表 CSS 中既需要有 dark:hover:w-12，也需要有 hover:dark:w-12，还有如下各个 spacing 的所有可能组合：
```js
module.exports = {
  theme: {
    spacing: {
      '1': '0.25em',
      '2': '0.5em',
      '3': '0.75em',
      '4': '1em',
      '5': '1.25em',
      '6': '1.5em',
      // ...
      '96': '24em'
        
    }
  }
}
```
那么里面必然含有很多不必要的样式，数量级非常地大，体积会很快膨胀到一个不可接受的地步。

那么 tailwind css 是怎么解决的这个问题呢？它有两种模式：

 - 预先生成全集CSS定义，然后检查代码中未使用的 class，对不需要的 CSS 进行裁剪。
 - 从空白CSS开始，检查代码中使用的class，按需生成相应的CSS代码。也称为 JIT 模式。

随着 Tailwind CSS 支持的 API 和修饰符越来越多，方式1出现了较大的性能问题，往往需要用户主动关闭一些不需要的功能（如flex）或修饰符（如dark），因此从 v3 开始，JIT 模式称为默认配置。

这一点也决定了代码中不能把单个 class 名称动态拼接，即如果用到了 bg-black 和 bg-white，代码中必须有这两个字符串的明文，而不能是：
```js
const bg = { pending: 'white', ready: 'black'}
const className = `bg-${bg[state]}`
return <div className={className}><div>
```
这样的动态 className。

但是动态组合 className 是可以的：
```js
const bg = { pending: 'bg-white', ready: 'bg-white'}
const className = `${bg[state]} p-2 text-lg`
return <div className={className}><div>
```
JIT 模式给 Tailwind CSS 带来的能力提升是飞跃式的，因为一般来说，单个项目中使用的样式其实不会有很多种（尤其是在有原子化CSS进行规范的情况下），所以 Tailwind CSS 可以不断地完善 API，扩大其能力，而不用担心生产环境 CSS 体积变得臃肿。

### 移动优先的响应式设计原则
在 Tailwind 中设置响应式设计是很简单的，例：
```html
<div class="bg-green-500 md:bg-red-500 lg:bg-yellow-500">
  <!-- ... -->
</div>
```
示例中设置了默认的背景色为绿色，中等屏背景色为红色，大屏背景色为黄色。

默认的显示器大小配置如下：
```js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}
```
所谓移动优先，就是带有 screen 修饰符（即 sm, md等）的属性，只应用于大于等于它的显示屏上。做响应式设计的时候，应该优先以不加修饰符的形式完成小屏的设计，再逐渐放大屏幕，针对出现问题的地方，添加额外的带 screen 修饰符的 class.

### 支持扩展，支持插件
如上所述，Tailwind 不仅可以扩展各种值的枚举项，也可以扩展部分修饰符。甚至还可以写插件和 preset。

因此可以比较方便地将团队的样式配置抽取成公共的 NPM 包进行共享。

## Tailwind CSS 劣势
和Bootstrap类似，学习曲线陡峭依然是 Tailwind CSS的一个劣势，在使用它的早期阶段，会经常需要查阅官方资料，寻找某个 CSS 属性对应的 class 是什么。

## 最佳实践
### 使用编辑器插件
Visual Studio Code 的官方[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)扩展通过为用户提供自动完成、语法突出显示和 linting 等高级功能增强了 Tailwind 开发体验。

![](https://tailwindcss.com/_next/static/media/intellisense.c22de782.png)

### 使用PostCss作为处理器
> 强烈考虑依赖其他 PostCSS 插件来添加您使用的预处理器功能，而不是和 Tailwind 与 Sass、Less 或 Stylus 等预处理工具一起使用。这样能获得更快的编辑速度和 更友善Tailwind 特性支持。
### 配置构建
首先安装npm插件
```shell
npm install -D postcss-import
```
然后将其添加为 PostCSS 配置中的**第一个插件**：
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
`postcss-import`严格遵守 CSS 规范，并且不允许@import在文件最顶部以外的任何地方使用语句。

1. 使用单独的文件来导入和实际的 CSS
```css
/* components.css */
@import "./components/buttons.css";
@import "./components/card.css";
```
```css
/* components/buttons.css */
.btn {
  padding: theme('spacing.4') theme('spacing.2');
  /* ... */
}
```
```css
/* components/card.css */
.card {
  padding: theme('spacing.4');
  /* ... */
}
```
2. 在包含@tailwind声明的主 CSS 文件中使用。
```css
@import "tailwindcss/base";
@import "./custom-base-styles.css";

@import "tailwindcss/components";
@import "./custom-components.css";

@import "tailwindcss/utilities";
@import "./custom-utilities.css";
```

### 使用嵌套语法
使用`tailwindcss/nesting`插件，这是一个 PostCSS 插件，它包装了postcss-nested或postcss-nesting并充当兼容层，以确保您选择的嵌套插件正确理解 Tailwind 的自定义语法。
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
### 使用变量
CSS 变量（正式称为自定义属性）具有非常好的浏览器支持，因此您根本不需要预处理器来使用变量。
```css
:root {
  --theme-color: #52b3d0;
}

/* ... */

.btn {
  background-color: var(--theme-color);
  /* ... */
}
```
还可以使用`them()函数`来访问 Tailwind 变量
```css
.btn {
  background-color: theme('colors.blue.500');
  padding: theme('spacing.2') theme('spacing.4');
  /* ... */
}
```
### 兼容前缀
为了自动管理 CSS 中的供应商前缀，您应该使用Autoprefixer。
```shell
npm install -D autoprefixer
```
然后将其添加到 PostCSS 配置中的插件列表的最末尾：
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
### 生产优化
建议使用cssnano之类的工具最小化您的 CSS，并使用Brotli压缩您的 CSS 。

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
```

### 重复使用样式
```html
<div>
  <div class="flex items-center space-x-2 text-base">
    <h4 class="font-semibold text-slate-900">Contributors</h4>
    <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">204</span>
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>
</div>
```
当出现上述重复的img标签首先考虑提取组件，或者在循环中处理。但是也支持使用`@apply`指令提取重复的CSS类。
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75;
  }
}
```

`避免过早抽象`，不然，无论你做什么，都不要@apply只为了让事情看起来“更干净”而使用。

如果你开始将@apply其用于一切，那么基本上你只是再次编写 CSS，并抛弃 Tailwind 为你提供的所有工作流程和可维护性优势。

### 添加自定义样式
1. 可以在配置文件中添加配置，[定义主题](https://tailwindcss.com/docs/theme)
2. 可以使用任意值，例如
```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```
3. 自定义css规则
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.my-custom-style {
  /* ... */
}
```
为了获得更多功能，你还可以使用@layer指令向 Tailwind 的base、components和utilities层添加样式：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .my-custom-style {
    /* ... */
  }
}
```
tips： 为什么有分层的概念？

在 CSS 中，当两个选择器具有相同的特殊性时，样式表中规则的顺序决定哪个声明获胜：
```css
.btn {
  background: blue;
  /* ... */
}

.bg-black {
  background: black;
}
```
这里，两个按钮都将是黑色，因为CSS 中的.bg-black代码如下：.btn
```css
<button class="btn bg-black">...</button>
<button class="bg-black btn">...</button>
```
为了管理这一点，Tailwind 将其生成的样式组织成三个不同的“层”——这是由ITCSS推广的概念。

- base层用于重置规则或应用于纯 HTML 元素的默认样式等。适合添加基本样式。
- components层用于您希望能够使用实用程序覆盖的基于类的样式。添加组件类，例如复用css的封装、定义第三方组件样式。
- utilities层适用于小型、单一用途的类，其应始终优先于任何其他样式。项目内自定义封装的。

明确这一点可以更容易地理解你的样式如何相互作用，并且使用指令@layer可以让你控制最终的声明顺序，同时仍然以你喜欢的方式组织你的实际代码。

### 功能与指令
[详见](https://tailwindcss.com/docs/functions-and-directives)
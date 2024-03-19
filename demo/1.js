function asyncFn() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (Math.random() < 0.2) {
              // console.log('inner success');
              resolve('success');
          } else {
              // console.log('inner failed');
              reject('failed');
          }
      }, 1 * 1000 * Math.random());
  });
}

function runWithRetry(fn, retryTimes, timeout){
  // 你的实现
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        clearTimeout(timer)
          reject('timeout')
      }, timeout)
      let count = retryTimes
      let timer = null
      const start = () => {
          fn().then(resolve).catch(() => {
            console.log('execute error');
              if(--count) {
                timer = setTimeout(start)
              } else {
                reject('error')
              }
          })
      }
      start()
  })
}

runWithRetry(asyncFn, 3, 1 * 1000) // 重复调用asyncFn函数直至成功（返回resolved的Promise）或达到重试次数上限，或者超时
  .then(console.log, console.log);

// 可能的输出1：
// inner failed 第一次失败
// inner failed 第一次重试失败
// inner success 第二次重试成功
// success

// 可能的输出2:
// inner failed 第一次失败
// timeout error 超时
// inner failed 超时前发起的重试调用

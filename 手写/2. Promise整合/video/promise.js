// 覆盖原有的Promise

// 定义常量
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

// 声明构造函数
function Promise(executor) {
  // 保存实例对象this的值
  const self = this;
  // 初始属性
  self.PromiseState = PENDING;
  self.PromiseResult = null;
  self.callbacks = []

  // 改变状态
  function resolve(value) {
    if (self.PromiseState !== PENDING) return
    self.PromiseState = RESOLVED;
    self.PromiseResult = value;
    // 实现多次回调
    if (self.callbacks.length > 0) {
      setTimeout(() => {
        self.callbacks.forEach(callbackObj => {
          callbackObj.onResolved(value)
        })
      }, 0)
    }
  }

  function reject(reason) {
    if (self.PromiseState !== PENDING) return
    self.PromiseState = REJECTED
    self.PromiseResult = reason
    if (self.callbacks.length > 0) {
      setTimeout(() => {
        self.callbacks.forEach(callbackObj => {
          callbackObj.onRejected(reason)
        })
      }, 0)
    }
  }

  // executor
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

// Promise.prototype.then()
Promise.prototype.then = function (onResolved, onRejected) {
  // 指定默认的成功的回调onResolved （向后传递成功的value）
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  // 指定默认的失败的回调onRejected（向后传递失败的reason 实现错误/异常传透的关键点）
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  const self = this;
  // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    // 返回的结果有三种,Promise/值/throw error
    function handle(callback) {
      const result = callback(self.PromiseResult)
      try {
        result instanceof Promise ? result.then(resolve, reject) : resolve(result)
      } catch (error) {
        reject(error)
      }
    }

    // 判断三种状态
    switch (self.PromiseState) {
      case PENDING:
        // 保存回调函数
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          }
        }, {
          onRejected(reason) {
            handle(onRejected)
          }
        })
        break;
      case RESOLVED:
        setTimeout(() => {
          handle(onResolved)
        }, 0)
        break;
      case REJECTED:
        setTimeout(() => {
          handle(onRejected)
        }, 0)
        break;
      default:
        break;
    }
  })
}

// Promise.prototype.catch
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// Promise.resolve()  将现有对象转为 Promise对象
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    value instanceof Promise ? value.then(resolve, reject) : resolve(value);
  })
}
// 或者  上面简写更好
// Promise.resolve = function (value) {
//   // 返回一个成功/失败的promise
//   return new Promise((resolve, reject) => {
//     if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
//       value.then(v => {
//         resolve(v)
//       }, r => {
//         reject(r)
//       })
//     } else { // value不是promise => promise状态变为成功，数据是value
//       resolve(value)
//     }
//   })
// }

// Promise.reject()
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// Promise.all()
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const values = new Array(promises.length)
    for(let i=0; i<promises.length; i++){
      Promise.resolve(promises[i]).then(value => { // 防止数组中有不是promise的元素
        count++
        values[i] = value
        if(count === promises.length) resolve(values)
      }, reason => {
        reject(reason)
      })
    }
  })
}

// Promise.race()
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for(let i=0; i<promises.length; i++){
      Promise.resolve(promises[i]).then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    }
  })
}
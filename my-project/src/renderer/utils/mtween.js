let Tween = {
  linear: function (t, b, c, d) {
    return c * t / d + b
  },
  easeIn: function (t, b, c, d) {
    // 加速曲线
    return c * (t /= d) * t + b
  },
  easeOut: function (t, b, c, d) {
    // 减速曲线
    return -c * (t /= d) * (t - 2) + b
  },
  easeBoth: function (t, b, c, d) {
    // 加速减速曲线
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b
    }
    return -c / 2 * (--t * (t - 2) - 1) + b
  },
  easeInStrong: function (t, b, c, d) {
    // 加加速曲线
    return c * (t /= d) * t * t * t + b
  },
  easeOutStrong: function (t, b, c, d) {
    // 减减速曲线
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeBothStrong: function (t, b, c, d) {
    // 加加速减减速曲线
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  },
  elasticIn: function (t, b, c, d, a, p) {
    // 正弦衰减曲线（弹动渐入）
    if (t === 0) {
      return b
    }
    if ((t /= d) == 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      let s = p / 4
    } else {
      let s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return (-(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin((t * d - s) * (2 * Math.PI) / p)
    ) + b)
  },
  elasticOut: function (t, b, c, d, a, p) {
    if (t === 0) {
      return b
    }
    if ((t /= d) == 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      let s = p / 4
    } else {
      let s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) +
      c +
      b
    )
  },
  elasticBoth: function (t, b, c, d, a, p) {
    if (t === 0) {
      return b
    }
    if ((t /= d / 2) == 2) {
      return b + c
    }
    if (!p) {
      p = d * (0.3 * 1.5)
    }
    if (!a || a < Math.abs(c)) {
      a = c
      let s = p / 4
    } else {
      let s = p / (2 * Math.PI) * Math.asin(c / a)
    }
    if (t < 1) {
      return (-0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)) +
        b
      )
    }
    return (
      a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin((t * d - s) * (2 * Math.PI) / p) *
      0.5 +
      c +
      b
    )
  },
  backIn: function (t, b, c, d, s) {
    // 回退加速（回退渐入）
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  backOut: function (t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 3.70158 // 回缩的距离
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  backBoth: function (t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    }
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  bounceIn: function (t, b, c, d) {
    // 弹球减振（弹球渐出）
    return c - Tween['bounceOut'](d - t, 0, c, d) + b
  },
  bounceOut: function (t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    }
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
  },
  bounceBoth: function (t, b, c, d) {
    if (t < d / 2) {
      return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b
    }
    return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
  }
}

/*
 * 获取css属性方法
 * */
function getStyle () {
  let obj = arguments[0]
  let arr = arguments.length > 2 ? {} : ''
  if (typeof arr === 'string') {
    arr = !obj.currentStyle
      ? getComputedStyle(obj)[arguments[1]]
      : obj.currentStyle[arguments[1]]
  } else {
    for (let i = 1; i < arguments.length; i++) {
      // arr.height = '';
      arr[arguments[i]] = !obj.currentStyle
        ? getComputedStyle(obj)[arguments[i]]
        : obj.currentStyle[arguments[i]]
    }
  }

  return arr
}

function MTween (opt) {
  let option = {
    obj: '',
    begins: {},
    attrs: {},
    duration: 0,
    way: 'linear',
    callBack: function () {}
  }
  for (var key in option) {
    if (opt[key]) {
      option[key] = opt[key]
    }
  }
  let obj = option.obj
  let attrs = option.attrs
  let duration = option.duration
  let way = option.way
  let callBack = option.callBack
  let begins = option.begins

  if (obj.isAnim) return

  obj.isAnim = true

  let starts = {}

  for (let key in attrs) {
    starts[key] =
      parseFloat(begins[key]) || parseFloat(getStyle(obj, key)) || 0
  }
  let uintes = {}
  for (let key in attrs) {
    if (typeof attrs[key] !== 'string') continue
    let num = parseFloat(attrs[key])
    let arr = attrs[key].split(num)
    //            console.log(arr);
    uintes[key] = arr[1]
  }
  let startTime = Date.now()

  let allS = {}
  for (let key in attrs) {
    if (key == 'transform.scale') {
      console.log(attrs[key])
    }
    allS[key] = parseFloat(attrs[key]) - starts[key] || 0
  }

  clearInterval(timer)
  let timer = 0
  timer = setInterval(function () {
    let endTime = Date.now()

    // 计算出当前时间
    let t = endTime - startTime

    if (t >= duration) {
      t = duration
      clearInterval(timer) // 到达目标点要清除定时器
    }

    // 运动的属性
    for (let key in attrs) {
      obj.style[key] =
        Tween[way](t, starts[key], allS[key], duration) + (uintes[key] || '')

      // 透明度的兼容处理
      if (key == 'opacity') {
        obj.style.filter =
          'Alpha(opacity=' +
          Tween[way](t, starts[key], allS[key], duration) * 100 +
          ')'
      }

      // 处理scrollTop
      if (key == 'scrollTop' || key == 'scrollLeft') {
        obj[key] =
          Tween[way](t, starts[key], allS[key], duration) + (uintes[key] || '')
      }

      // transform 的处理
      let attr1 = key.split('.')
      if (attr1.length > 1 && attr1[0] == 'transform') {
        if (attr1[1] == 'scale') {
          obj.style[attr1[0]] =
            attr1[1] +
            '(' +
            Tween[way](t, starts[key], allS[key], duration) +
            ')'
        } else if (attr1[1] == 'rotateZ' || 'rotateY' || 'rotateX') {
          obj.style[attr1[0]] =
            attr1[1] +
            '(' +
            Tween[way](t, starts[key], allS[key], duration) +
            'deg)'
        }
      }
    }

    if (t == duration) {
      obj.isAnim = false
      // 等到上一个动画完成 然后再调用
      if (callBack) {
        callBack(obj)
      }
    }
  }, 20)

  obj.clearInterval = function () {
    clearInterval(timer)
    obj.isAnim = false
  }
}

export default MTween

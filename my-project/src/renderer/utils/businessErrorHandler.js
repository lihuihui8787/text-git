import { Message, MessageBox } from 'element-ui'
import store from '../store'

export default function handleError (res) {
  if (res.status === '10006') {
    MessageBox.confirm('登陆超时，请重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    }, cancel => {
      console.log(cancel)
    })
  } else {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return new Promise(() => {})
}

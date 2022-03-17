/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-03-24 21:08:26
 * @LastEditTime: 2021-10-27 13:54:58
 * @LastEditors: rodchen
 */
import axios from 'axios'
import { ElMessage } from 'element-plus';

// 应用
// export let baseURL = "http://47.100.87.54:9109/"
export let baseURL = ""

// 拦截器
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response && error.response?.data?.code == '401') {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('sessionId');
    // message.warning("当前未登录或者登录已失效请重新登录")
  }
  return Promise.reject(error)
})
axios.interceptors.request.use((config: any) => {
  const resposne = JSON.parse(localStorage.getItem('userInfo') || '{}');
  // sessionId 处理
  // config.headers['sso-sessionid'] = localStorage.getItem("sessionId") || '';
  config.headers['sso-sessionid'] = resposne?.sessionId || '1460137592207360001_1_1_1';
  config.withCredentials = true;
  config.baseURL = baseURL
  return config;
}, (error) => {
  return Promise.reject(error)
})

// axios的get请求
export default function request({
  url,
  method = 'get',
  data = {},
  isToast = true,
  successMessage = "操作成功",
  converter,
  headers = {},
  isdownload,
  fin,
  responseType,
  errorConver
}: any) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      headers,
      responseType,
    }).then(res => {

      if (isdownload) {
        resolve(res?.data)
        if (converter) {
          converter({
            data: res?.data
          })
        }
        return
      }
      if (res && res.data && (res.data.status === '0' || res.data.code === '000000')) {
        resolve(res?.data?.data || {})
        if (isToast) {
          ElMessage({
            message: successMessage || '操作成功',
            type: 'success',
          })
          // successMsg(successMessage || '操作成功')
        }
        if (converter) {
          converter({
            data: res?.data?.data || {}
          })
        }
      } else {
        if (errorConver) {
          errorConver()
        }
        ElMessage({
          message: res.data.msg,
          type: 'error',
        })
      }
    }).catch(err => {
      reject(err)
    }).finally(() => {
      if (fin) {
        fin()
      }
    })
  })
}



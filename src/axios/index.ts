/*
 * @Description:
 * @Author: alan
 * @Date: 2021-03-24 21:08:26
 * @LastEditTime: 2022-05-08 21:53:25
 * @LastEditors: Please set LastEditors
 */
import { message } from 'ant-design-vue'
import axios from 'axios'
import { useUserInfo } from '@/piniaStore/module/user'

// 应用
const baseURL = '/'

// 拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    const { outLogin } = useUserInfo()
    if (error.response && error.response?.data?.code == '1000') {
      outLogin()
      message.error('当前用户登录信息已过期请重新登录')
    }
    return Promise.reject(error)
  }
)
axios.interceptors.request.use(
  (config: any) => {
    const {
      $state: { token }
    } = useUserInfo()
    // token 处理
    if (token) {
      config.headers.token = token || ''
    }

    config.withCredentials = true
    config.baseURL = baseURL
    return config
  },
  error => Promise.reject(error)
)

// type requestType = {
//   url: string,
//   method?: string,
//   data?: object | string,
//   isToast?: boolean,
//   successMessage?: string,
//   converter?: Function,
//   headers?: object,
//   isdownload?: boolean,
//   fin?: Function,
//   responseType?: string,
//   errorConver?: Function
// }
// axios的get请求
export default function request({
  url,
  method = 'get',
  data = {},
  isToast = true,
  successMessage = '操作成功',
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
      responseType
    })
      .then(res => {
        if (isdownload) {
          resolve(res?.data)
          if (converter) {
            converter({
              data: res?.data
            })
          }
          return
        }
        if (
          res &&
          res.data &&
          (res.data.status === '0' || res.data.code === '0000')
        ) {
          resolve(res?.data?.data || {})
          if (isToast) {
            message.success(successMessage || '操作成功')
            // successMsg(successMessage || '操作成功')
          }
          if (converter) {
            converter({
              data: res?.data?.data || {}
            })
          }
        } else if (res && res.data && res.data.code === '1000') {
          const { outLogin } = useUserInfo()
          outLogin()
          message.error('当前用户登录信息已过期请重新登录')
        } else {
          if (errorConver) {
            errorConver()
          }
          message.error(res.data.message)
        }
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        if (fin) {
          fin()
        }
      })
  })
}

/* eslint-disable prefer-promise-reject-errors */
import moment from 'moment'
import { ConfigProvider, Modal } from 'ant-design-vue'
import { useUserInfo } from '@/piniaStore/module/user'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { LegacyButtonType } from 'ant-design-vue/lib/button/buttonTypes'

export function queryParams(params: any) {
  for (const key in params) {
    if (typeof params[key] === 'undefined' && !params[key]) {
      params[key] = null
      delete params[key]
    }
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const element = params[key]
      if (element && key.indexOf('*number*') >= 0) {
        const dataParams = key.split('*number*')
        dataParams.forEach((value, index) => {
          params[value] = element[index]
        })
        delete params[key]
      } else if (element && key.indexOf('*address*') >= 0) {
        const dataParams = key.split('*address*')
        dataParams.forEach((value, index) => {
          params[value] = element.PCDCode[index]
        })
        delete params[key]
      } else if (element && key.indexOf('*costType*') >= 0) {
        const dataParams = key.split('*costType*')
        // eslint-disable-next-line prefer-destructuring
        params[dataParams[0]] = element[1]
        delete params[key]
      } else if (element && key.indexOf('*fullDate*') >= 0) {
        const dataParams = key.split('*fullDate*')
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = moment(element[index])
              .millisecond(0)
              .second(0)
              .minute(0)
              .hour(0)
              .format('YYYY-MM-DD HH:mm:ss')
          } else {
            params[value] = moment(element[index])
              .millisecond(59)
              .second(59)
              .minute(59)
              .hour(23)
              .format('YYYY-MM-DD HH:mm:ss')
          }
        })
        delete params[key]
      } else if (element && key.indexOf('*date*') >= 0) {
        const dataParams = key.split('*date*')
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = moment(element[index]).format('YYYY-MM-DD')
          } else {
            params[value] = moment(element[index]).format('YYYY-MM-DD')
          }
        })
        delete params[key]
      } else if (element && key.indexOf('*size*') >= 0) {
        const dataParams = key.split('*size*')[0]
        params[dataParams] =
          typeof element === 'string' ? element.toUpperCase() : element
        delete params[key]
      } else if (element && key.indexOf('*') >= 0) {
        const dataParams = key.split('*')
        dataParams.forEach((value, index) => {
          params[value] = element[index].format('YYYY-MM-DD HH:mm:ss')
        })
        delete params[key]
      } else if (Array.isArray(element)) {
        params[key] = element.join(',')
      }
    }
  }
  return params
}

type ColorParams = {
  [key: string]: any
}
export const changeTheme = (colorParams: ColorParams): void => {
  for (const k in colorParams) {
    document.documentElement.style.setProperty(k, colorParams[k])
  }
  ConfigProvider.config({
    theme: {
      ...colorParams
    }
  })
}

export const getToken = () => {
  const { $state } = useUserInfo()
  return $state.token || ''
}

export const piniaPlugnsGetStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || '{}')

export const piniaPlugnsSetStorage = (key: string, value: string | any) => {
  localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value
  )
}

type ModalConfirmType = {
  title?: string
  okType?: LegacyButtonType
  content?: string
  cancelText?: string
  okText?: string
  okButtonProps?: any
  icon?: any
  onOk?(): void
  onCancel?(): void
}
export const ModalConfirm = (props: ModalConfirmType = {}): any =>
  new Promise((resolve, reject) => {
    Modal.confirm({
      title: props.title || '确认移除?',
      icon: props.icon || createVNode(ExclamationCircleOutlined),
      content: props.content || '',
      okText: props.okText || '确认',
      okType: props.okType || 'danger',
      okButtonProps: props.okButtonProps || {},
      cancelText: props.cancelText || '取消',
      onOk() {
        resolve('通过')
      },
      onCancel() {
        reject('拒绝')
      }
    })
  })

type requiredTextType = {
  trigger?: string
  message: string
}

export const requiredText = ({ trigger, message }: requiredTextType) => ({
  required: true,
  whitespace: true,
  trigger: trigger || 'change',
  message: message || '类别名称不能为空'
})

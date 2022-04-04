import qs from "qs"
import moment from "moment"
import { ConfigProvider } from "ant-design-vue";

export function queryParams(params: any,) {
  for (const key in params) {
    if (typeof params[key] === 'undefined' && !params[key]) {
      params[key] = null
      delete params[key]
    }
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const element = params[key];
      if (element && key.indexOf('*number*') >= 0) {
        const dataParams = key.split('*number*');
        dataParams.forEach((value, index) => {
          params[value] = element[index];
        });
        delete params[key];
      } else if (element && key.indexOf('*address*') >= 0) {
        const dataParams = key.split('*address*');
        dataParams.forEach((value, index) => {
          params[value] = element.PCDCode[index];
        });
        delete params[key];
      } else if (element && key.indexOf('*costType*') >= 0) {
        const dataParams = key.split('*costType*');
        // eslint-disable-next-line prefer-destructuring
        params[dataParams[0]] = element[1];
        delete params[key];
      } else if (element && key.indexOf('*fullDate*') >= 0) {
        const dataParams = key.split('*fullDate*');
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = moment(element[index])
              .millisecond(0)
              .second(0)
              .minute(0)
              .hour(0)
              .format('YYYY-MM-DD HH:mm:ss');
          } else {
            params[value] = moment(element[index])
              .millisecond(59)
              .second(59)
              .minute(59)
              .hour(23)
              .format('YYYY-MM-DD HH:mm:ss');
          }
        });
        delete params[key];
      } else if (element && key.indexOf('*date*') >= 0) {
        const dataParams = key.split('*date*')
        dataParams.forEach((value, index) => {
          if (index === 0) {
            params[value] = moment(element[index])
              .format('YYYY-MM-DD');
          } else {
            params[value] = moment(element[index])
              .format('YYYY-MM-DD');
          }
        });
        delete params[key];
      } else if (element && key.indexOf('*size*') >= 0) {
        const dataParams = key.split('*size*')[0];
        params[dataParams] = typeof element === 'string' ? element.toUpperCase() : element;
        delete params[key];
      } else if (element && key.indexOf('*') >= 0) {
        const dataParams = key.split('*');
        dataParams.forEach((value, index) => {
          params[value] = element[index].format('YYYY-MM-DD HH:mm:ss');
        });
        delete params[key];
      } else if (Array.isArray(element)) {
        params[key] = element.join(',');
      }
    }
  }
  return params;
}

type ColorParams = {
  [key: string]: any
}
export const changeTheme = (colorParams: ColorParams): void => {
  for (const k in colorParams) {
    document.documentElement.style.setProperty(k, colorParams[k]);
  }
  ConfigProvider.config({
    theme: {
      ...colorParams,
    },
  });
}
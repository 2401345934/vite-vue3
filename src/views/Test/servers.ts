import request from "@/axios"


export const fetchList = () => {
  return request({
    url: `/wms-ops/rwFrontRecord`,
    isToast: false
  })
}
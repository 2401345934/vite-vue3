import request from '@/utils/request'
// 获取素材库目录
export function getMaterialMenus(data) {
  return request({
    url: `/frontend/materialMenu/menu?parentTag=${data.parentTag}&wechatId=${data.wechatId}`,
    method: 'get'
  })
}
export function updateMaterialMenu(data) {
  return request({
    url: '/frontend/materialMenu/addMenu',
    method: 'post',
    data
  })
}
export function deleteMaterialMenu(data) {
  return request({
    url: '/frontend/materialMenu/deleteMenu',
    method: 'post',
    data
  })
}
export function getMaterials(data) {
  return request({
    url: '/frontend/material/search',
    method: 'post',
    data
  })
}
export function deleteMaterial(data) {
  return request({
    url: '/frontend/material/batchDeleteMaterial',
    method: 'post',
    data
  })
}
export function updateMaterial(data) {
  return request({
    url: '/frontend/material/edit',
    method: 'post',
    data
  })
}
export function replaceMaterial(data, query) {
  return request({
    url: `/frontend/material/replace?wechatId=216&materialId=${query.materialId}`,
    method: 'post',
    data
  })
}

export function uploadImgs(data, query) {
  return request({
    url: `/frontend/material/insertPicture?wechatId=216&parentMenuId=${query.parentMenuId}`,
    method: 'post',
    data
  })
}

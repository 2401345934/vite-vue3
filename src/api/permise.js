import request from '@/utils/request'

// 获取角色列表
export function getRoleListServe(data) {
  return request({
    url: '/frontend/authority/role/getList',
    method: 'post',
    data
  })
}

// 获取所有角色
export function getAllRoleServe() {
  return request({
    url: '/frontend/authority/role/getAll',
    method: 'get'
  })
}

// 新建/修改角色信息
export function eiditRoleServe(data) {
  return request({
    url: '/frontend/authority/role/saveOrUpdate',
    method: 'post',
    data
  })
}

// 移除角色
export function removeRoleServe(id, status) {
  return request({
    url: `/frontend/authority/role/status/${id}/${status}`,
    method: 'get'
  })
}

// 获取管理员列表
export function getAdminListServe(data) {
  return request({
    url: '/frontend/authority/user/getPageList',
    method: 'post',
    data
  })
}

// 新建/修改管理员信息
export function editAdminServe(data) {
  return request({
    url: '/frontend/authority/user/saveOrUpdate',
    method: 'post',
    data
  })
}

// 移除管理员
export function removeAdminServe(id, status) {
  // 启用 0，禁用 1 移除 2
  return request({
    url: `/frontend/authority/user/status/${id}/${status}`,
    method: 'get'
  })
}

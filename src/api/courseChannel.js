import request from '@/utils/request'

// 获取课程活动渠道列表
export function getCourseChannelList(params) {
  return request({
    url: '/frontend/sourceChannel/select',
    method: 'get',
    params
  })
}

// 新增、编辑课程活动渠道
export function editCourseChannel(data) {
  return request({
    url: '/frontend/sourceChannel/insert',
    method: 'post',
    data
  })
}

// 移除课程活动渠道
export function removeCourseChannel(id) {
  return request({
    url: `/frontend/sourceChannel/delete?id=${id}`,
    method: 'get'
  })
}

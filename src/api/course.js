import request from '@/utils/request'

// 活动分类管理——查询活动分类列表
export function getCourseClassListServe(data) {
  return request({
    url: '/frontend/course/class/getPageList',
    method: 'post',
    data
  })
}

// 活动分类管理——获取所有活动分类
export function getCourseClassAllServe() {
  return request({
    url: '/frontend/course/class/getAll',
    method: 'get'
  })
}

// 活动分类管理——新建、编辑活动分类
export function addCourseClassServe(data) {
  return request({
    url: '/frontend/course/class/saveOrUpdate',
    method: 'post',
    data
  })
}

// 活动分类管理——移除活动分类
export function removeCourseClassServe(id) {
  return request({
    url: `/frontend/course/class/remove/${id}`,
    method: 'get'
  })
}

// 活动列表——活动分类列表
export function getCourseListServe(data) {
  return request({
    url: '/frontend/course/getPageList',
    method: 'post',
    data
  })
}

// 活动列表——生成太阳码
export function getSuncode(data) {
  return request({
    url: '/frontend/course/getSuncode?courseInfoId=' + data.id,
    method: 'get'
  })
}

// 活动列表——新增/编辑 活动
export function editCourseServe(data) {
  return request({
    url: '/frontend/course/saveOrUpdate',
    method: 'post',
    data
  })
}

// 活动列表——获取活动详情
export function getCoursDetailServe(id) {
  return request({
    url: `/frontend/course/getCourseInfo/${id}`,
    method: 'get'
  })
}

// 活动列表——获取活动渠道
export function getCoursChannel(id) {
  return request({
    url: '/frontend/course/channel/getAll',
    method: 'get'
  })
}

// 活动列表——移除活动
export function removeCourseServe(id) {
  return request({
    url: `/frontend/course/remove/${id}`,
    method: 'get'
  })
}

// 活动列表——获取活动选填项
export function getCourseFieldsServe() {
  return request({
    url: '/frontend/common/getCourseFields',
    method: 'get'
  })
}

export function hideSession(id) {
  return request({
    url: `/frontend/course/session/hide?sessionId=${id}`,
    method: 'post'
  })
}

export function showSession(id) {
  return request({
    url: `/frontend/course/session/show?sessionId=${id}`,
    method: 'post'
  })
}

// 活动列表——隐藏分类
export function hideCategoryServe(data) {
  return request({
    url: '/frontend/course/class/hide',
    method: 'post',
    data
  })
}

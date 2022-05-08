import request from '@/utils/request'

// 获取教练列表
export function getTeacherListServe(data) {
  return request({
    url: 'frontend/teacher/getPageList',
    method: 'post',
    data
  })
}

// 教练新增或编辑
export function saveTeacherListServe(data) {
  return request({
    url: 'frontend/teacher/saveOrUpdate',
    method: 'post',
    data
  })
}

// 修改教练状态
export function updateTeacherBriefServe(id, brief) {
  return request({
    url: `frontend/teacher/updateBrief`,
    method: 'post',
    data: {
      id,
      brief
    }
  })
}

// 修改教练状态
export function updateTeacherStatusServe(id, status) {
  return request({
    url: `frontend/teacher/updateStatus/${id}/${status}`,
    method: 'get'
  })
}

// 导入教练信息
export function importTeacherServe(data) {
  return request({
    url: `frontend/teacher/uploadTeacher`,
    method: 'post',
    data
  })
}

// 获取所有教练
export function getAllTeacherServe() {
  return request({
    url: `frontend/teacher/getAll`,
    method: 'get'
  })
}

// 获取活动匹配的教练
export function getAvailTeacherServe(courseId) {
  return request({
    url: `frontend/teacher/getAvail`,
    method: 'get'
  })
}

// 分配教练
export function assignTeacherServe(data) {
  return request({
    url: `frontend/course/assignTeacher`,
    method: 'post',
    data
  })
}

// 上传教练头像
export function uploadTeacherAvatarServe(data) {
  return request({
    url: `frontend/material/insertOssPicture`,
    method: 'post',
    data
  })
}

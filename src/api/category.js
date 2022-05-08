import request from "@/utils/request";

// 获取活动类别列表
export function getCourseCateListServe(data) {
  return request({
    url: "/frontend/course/category/getPageList",
    method: "post",
    data
  });
}

// 新增、编辑活动类别
export function editCourseCateListServe(data) {
  return request({
    url: "/frontend/course/category/saveOrUpdate",
    method: "post",
    data
  });
}

// 移除活动类别
export function removeCourseCategoryServe(id) {
  return request({
    url: `/frontend/course/category/remove/${id}`,
    method: "get"
  });
}

// 活动类别管理——获取所有活动类别
export function getAllCourseCategoryServe(data) {
  return request({
    url: "/frontend/course/category/getAll",
    method: "get"
  });
}

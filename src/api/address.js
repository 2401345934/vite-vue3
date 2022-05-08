import request from "@/utils/request";

// 获取地点列表
export function getAddressListServe(data) {
  return request({
    url: "frontend/area/getPageList",
    method: "post",
    data
  });
}

// 获取所有地点信息
export function getAllAddressServe() {
  return request({
    url: "frontend/store/getAll",
    method: "get"
  });
}
// 获取地点详情
export function getAddressDetailServe(id) {
  return request({
    url: `frontend/area/get/${id}`,
    method: "get"
  });
}

// 地点保存或修改
export function saveOrUpdateServe(data) {
  return request({
    url: "frontend/area/saveOrUpdate",
    method: "post",
    data
  });
}

// 隐藏地址
export function hideAreaServe(id, hide) {
  return request({
    url: `/frontend/area/hide/${id}/${hide}`,
    method: "get"
  });
}

// 移除地址
export function removeAreaServe(id) {
  return request({
    url: `/frontend/area/remove/${id}`,
    method: "get"
  });
}

// 导入地址
export function importAreaListServe(data) {
  return request({
    url: `/frontend/area/uploadArea`,
    method: "post",
    data
  });
}

// 根据活动分类获取地点
export function getClassAreaServe(id) {
  return request({
    url: `/frontend/store/getAll`,
    method: "get"
  });
}

export function getClassArea() {
  return request({
    url: `/frontend/store/get`,
    method: "get"
  });
}

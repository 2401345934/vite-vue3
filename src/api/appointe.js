import request from "@/utils/request";

// 活动预约管理——列表
export function getSignPageList(data) {
  return request({
    url: "/frontend/course/sign/getPageList",
    method: "post",
    data
  });
}

// 活动预约管理——导出
export function exportSignPageList(params) {
  return request({
    url: "/frontend/course/sign/download",
    method: "get",
    params
  });
}

// 活动预约管理——预约审核
export function appointeCheckServe(id, status) {
  return request({
    url: `/frontend/course/sign/audit/${id}/${status}`,
    method: "get"
  });
}

// 活动预约管理——获取预约详情
export function getAppointeDetailServe(id) {
  return request({
    url: `/frontend/course/sign/select/by/${id}`,
    method: "get"
  });
}

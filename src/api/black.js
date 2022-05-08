import request from "@/utils/request";

// 获取黑名单列表
export function getBlackListServe(data) {
  return request({
    url: "/frontend/course/sign/getBlackList",
    method: "post",
    data
  });
}

// 移除黑名单
export function removeBlackServe(id) {
  return request({
    url: `/frontend/course/sign/removeBlack/${id}`,
    method: "get"
  });
}

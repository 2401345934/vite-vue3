import request from "@/utils/request";

// 添加及修改分享图配置
export function saveorupdate(data) {
  return request({
    url: "/frontend/share_image/save",
    method: "post",
    data
  });
}

// 查询首页分享图
export function query(data) {
  return request({
    url: "/frontend/share_image/query",
    method: "post",
    data
  });
}

export function pictureUrl() {
  return request({
    url: "/frontend/common/pictureUrl",
    method: "get"
  });
}


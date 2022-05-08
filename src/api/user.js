import request from "@/utils/request";

// 登录
export function login(data) {
  return request({
    url: "/frontend/authority/login",
    method: "post",
    data
  });
}
// 退出
export function logout(token) {
  return request({
    url: `/frontend/authority/logout/${token}`,
    method: "get"
  });
}

// 图片上传
export function uploadImageServe(data) {
  return request({
    url: `frontend/common/uploadImage`,
    method: "post",
    data
  });
}

// 用户修改密码
export function updateSelfPasswordServe(data) {
  return request({
    url: "/frontend/authority/update/self/password",
    method: "post",
    data
  });
}
//  超管列表修改密码
export function adminUpdatePasswordServe(data) {
  return request({
    url: "/frontend/authority/update/password",
    method: "post",
    data
  });
}

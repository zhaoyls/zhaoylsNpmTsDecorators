// import axios from "axios";
// import type { AxiosResponse } from 'axios'

/**
 * Opens a new browser window with the given URL and features.
 * See： https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
 * @param url - The URL to be opened in the new window.
 * @param title - The title of the new window.
 * @param target - The target attribute specifies where to open the linked document.
 * @param features - An array of strings representing the features of the new window.
 * @author zhaoyls
 */
export const comNewWindow = async (
  url = "",
  title: "title",
  target: "_blank",
  features: [/*'width=888', 'height=666', 'scrollbars=yes' */]
) => {
  var popupWin = window.open(url, target, features.join(";"));
  if (popupWin) {
    console.log("Window opened successfully");
    popupWin.document.title = title;
  } else {
    console.log("Failed to open window");
  }
};

/**
 * 下载文件
 * @param url - 文件下载的地址
 * @param params - 请求参数，默认为空对象
 * @param fileName - 下载文件的名称，默认为空字符串
 * @returns Promise - 下载成功时解析成功、否则解析为错误消息
 * @author zhaoyls
 */
export function downloadFile(url: string, params = {}, fileName = "", suffix = '写在文件名吧！', ...args) {
  // 1.原生写法
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 5 * 60 * 1000;

    // 整理参数
    const searchParams = new URLSearchParams(params);
    url = url + "?" + searchParams.toString();
    // url = url + JSON.stringify(params)

    xhr.open("GET", url, true);
    // POST
    // var data = 'param1=value1&param2=value2';
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("refresh-token", localStorage.getItem("token") || "");
    xhr.responseType = "blob";

    // 监听请求完成事件
    xhr.onload = function () {
      const res = this;
      if (res.status === 200) {
        const blob = new Blob([res.response], {
          type: `application/application/octet-stream`, // 使用 application/octet-stream 可以将其视为通用的二进制文件下载。
        });
        const url = window.URL || window.webkitURL;
        const downloadHref = url.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadHref;
        downloadLink.download = fileName ? fileName : getCDFileName(res) || '';
        downloadLink.click();
        window.URL.revokeObjectURL(downloadHref);
        resolve(res.status);
      } else {
        reject(res.status);
      }
    };

    // 发送请求 （如果为 post 请求，参数体放这里）
    xhr.send();

    // 监听请求超时事件
    xhr.ontimeout = function () {
      resolve("请求超时!");
    };
  });

  // 2. 依赖第三方库。
  // axios({
  //   method: 'get',
  //   url,
  //   params,
  //   responseType: "blob",
  // })
  //   .then((res) => {
  //     const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
  //     const url = window.URL || window.webkitURL;
  //     const downloadHref = url.createObjectURL(blob);
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = downloadHref;
  //     downloadLink.download = fileName ? fileName : getCDFileName(res)
  //     downloadLink.click();
  //   })
  //   .catch((e) => {
  //     console.log(e.message.toString());
  //   });
}

/**
 * 获取文件名字
 * @param {XMLHttpRequest | Response | AxiosResponse} res - 响应对象 未兼容 Fetch。
 * @param {string} [coding="ASCII"] - 编码方式，默认为 ASCII
 * @returns {string} - 文件名字，会带有后缀，无需手动拼接。
 */
function getCDFileName(res, coding = "ASCII") {
  const regex = /attachment;filename=(.*)/;
  const headerField = "content-disposition";
  const cd = res.getResponseHeader?.(headerField) || res.headers?.[headerField];
  if (cd) {
    return decodeURIComponent(cd.match(regex)[1]);
  } else {
    console.log("未找到 content-disposition 头部信息！");
  }
}

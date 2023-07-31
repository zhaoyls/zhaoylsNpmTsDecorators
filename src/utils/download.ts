import axios from "axios";
// import { Message } from 'element-plus'
// import { Message } from 'view-design'

/**
 * Downloads an xls file using an anchor tag.
 * @axios See: https://www.axios-http.cn/docs/req_config
 * @author zhaoyls
 * @param {string} method - HTTP method to use.
 * @param {string} url - API URL to download from.
 * @param {Object} data - Optional data to send in request body.
 * @param {Object} params - Optional params to send in query string.
 * @param {string} exportName - Optional name to use for downloaded file.
 */
export const commDownload = async (
  method = "get",
  url = "/api/download",
  data = {},
  params = {},
  exportName = "title"
) => {
  await axios({
    method,
    url,
    data,
    params,
    responseType: "blob",
  })
    .then((res) => {
      // type = "application/octet-stream";
      // type = "application/vnd.ms-excel";
      const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      const url = window.URL || window.webkitURL;
      const downloadHref = url.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadHref;
      const filename = exportName ? exportName : getCDFileName(res) || "";
      downloadLink.download = filename + ".xlsx";
      downloadLink.click();
    })
    .catch((e) => {
      console.log(e.message.toString());
    });
};


/**
 * Opens a new browser window with the given URL and features.
 * @author zhaoyls
 * @param url - The URL to be opened in the new window.
 * @param title - The title of the new window.
 * @param target - The target attribute specifies where to open the linked document.
 * @param features - An array of strings representing the features of the new window.
 */
export const comWindowOpen = async (
  url = "",
  title: "title",
  target: "_blank",
  features: [/*'width=888', 'height=666', 'scrollbars=yes'*/],
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
 * Get the filename from the Content-Disposition header of a response object.
 * @author zhaoyls
 * @param {Object} res - The response object.
 * @param {string} [coding="ASCII"] - The encoding of the filename.
 * @returns {string} - The filename.
 */
export function getCDFileName(res, coding = "ASCII") {
  let filename = "";
  const regex = /attachment;filename=(.*)/;
  const cd = res.headers["content-disposition"];
  if (cd) {
    filename = decodeURIComponent(cd.match(regex)[1]);
  }
  return filename;
}

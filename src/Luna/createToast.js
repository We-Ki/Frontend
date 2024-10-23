import LS2Request from "@enact/webos/LS2Request";
import { lunaAPI } from "./luna";

const webOSBridge = new LS2Request();
// 토스트 생성 관련 함수들
const createToast = (message) => {
  const parms = {
    message: message,
  };

  const lsRequest = {
    service: lunaAPI.notification,
    method: "createToast",
    parameters: parms,
    onSuccess: onToastSuccess,
    onFailure: onToastFailure,
  };

  webOSBridge.send(lsRequest);
};
const onToastSuccess = (msg) => {
  console.log(msg);
};
const onToastFailure = (msg) => {
  console.log(msg);
};

export default createToast;

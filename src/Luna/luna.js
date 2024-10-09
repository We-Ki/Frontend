import LS2Request from "@enact/webos/LS2Request";

const webOSBridge = new LS2Request();

const lunaAPI = {
  notification: "luna://com.webos.notification",
  wifi: "luna://com.webos.service.wifi",
  weki: "luna://com.weki.service",
};

export default webOSBridge;
export { lunaAPI };

import webOSBridge, { lunaAPI } from "./luna";

// 와이파이 연결 관련 함수들
const getMQTT = (setMQTT) => {
  const onGetMQTTSuccess = (msg) => {
    setMQTT(msg);
  };

  const onGetMQTTFailure = (msg) => {
    console.log(msg);
  };

  const parms = {
    subscribe: true,
  };

  const lsRequest = {
    service: lunaAPI.weki,
    method: "loop",
    parameters: parms,
    onSuccess: onGetMQTTSuccess,
    onFailure: onGetMQTTFailure,
  };

  webOSBridge.send(lsRequest);
};

export default getMQTT;

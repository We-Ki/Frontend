import React, { useEffect, useState } from "react";
import { List } from "antd";
import ContentHeader from "../components/ContentHeader";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import LS2Request from "@enact/webos/LS2Request";
import { lunaAPI } from "../Luna/luna";

const searchWifiBridge = new LS2Request();
const getWifiStatusBridge = new LS2Request();
const connectWifiBridge = new LS2Request();
const disconnectWifiBridge = new LS2Request();

const SearchDevice = () => {
  const { farmId } = useParams();

  const navigate = useNavigate();

  const [searchedWifi, setSearchedWifi] = useState([]);

  useEffect(() => {
    let params = {
      subscribe: true,
      interval: 10000,
    };
    let lsRequest = {
      service: lunaAPI.wifi,
      method: "findnetworks",
      parameters: params,
      onSuccess: (msg) => {
        setSearchedWifi(
          msg.foundNetworks.map((network) => {
            if (network.networkInfo.ssid.includes("SmartFarm_AP"))
              return network.networkInfo.ssid;
          })
        );
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    searchWifiBridge.send(lsRequest);
  }, []);

  const handleConnect = (ssid) => {
    searchWifiBridge.cancel();
    console.log(ssid);
    getCurrentProfile()
      .then(({ profileId }) => {
        console.log(profileId);
        if (profileId) {
          console.log(profileId);
          return connectDevice(profileId, ssid, "12345678");
        } else return connectWifi(ssid, "12345678");
      })
      .then(() => {
        return getCurrentProfile();
      })
      .then(({ ipInfo }) => {
        console.log(ipInfo);
        if (ipInfo.includes("192.168.4.")) navigate(`/adddevice/${farmId}`);
      });
  };

  const connectDevice = (profileId, id, pw) => {
    disConnectWifi(profileId).then(() => {
      return connectWifi(id, pw);
    });
  };

  const disConnectWifi = (profileId) => {
    return new Promise((resolve, reject) => {
      let params = { profileId };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "deleteprofile",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          resolve();
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      disconnectWifiBridge.send(lsRequest);
    });
  };

  const connectWifi = (id, pw) => {
    console.log(`${id}, ${pw}`);
    return new Promise((resolve, reject) => {
      let params = {
        ssid: id,
        wasCreatedWithJoinOther: true,
        security: {
          securityType: "psk",
          simpleSecurity: {
            passKey: pw,
          },
        },
      };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "connect",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          resolve();
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      connectWifiBridge.send(lsRequest);
    });
  };

  const getCurrentProfile = () => {
    return new Promise((resolve, reject) => {
      let params = { subscribe: false };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "getstatus",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          console.log(msg);
          let result = { ipInfo: undefined, profileId: undefined };
          if (msg.networkInfo) {
            result = {
              profileId: msg.networkInfo.profileId,
              ipInfo: msg.ipInfo.ip,
            };
            resolve(result);
          } else resolve(result);
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      getWifiStatusBridge.send(lsRequest);
    });
  };

  useEffect(() => {
    console.log(searchedWifi);
  }, [searchedWifi]);

  return (
    <>
      <BackButton url={`/manege/${farmId}`} />
      <ContentHeader title={"기기 추가"} sub={"연결할 장치를 선택해 주세요."} />
      {searchedWifi.map((ssid) => {
        return (
          <h2
            onClick={() => {
              handleConnect(ssid);
            }}
          >
            {ssid}
          </h2>
        );
      })}
    </>
  );
};

export default SearchDevice;

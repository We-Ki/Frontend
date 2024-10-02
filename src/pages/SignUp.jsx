import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Divider, Input, Button } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import BackButton from "../components/BackButton";

const mydata = [
  "사용자명",
  "비밀번호",
  "비밀번호 확인",
  "이메일",
  "이름",
  "사용자 구분",
];

const MyForm = () => (
  <>
    {mydata.map((item, index) => (
      <Input
        key={index}
        placeholder={item}
        style={{
          fontWeight: "bold",
          color: gray[7],
          fontSize: "10px",
          marginBottom: "6px", // 위아래 간격 설정
        }}
      />
    ))}
  </>
);
const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <>
      <BackButton label="로그인" url={-1} />
      <ContentHeader
        title={"회원가입"}
        sub={"계정을 생성하고 \n 농장을 개설하거나 참여하세요"}
      />
      <Row style={{ marginBottom: "20px", textAlign: "left" }}>
        <Col span={4}>{/* <Avatar size={64} icon={<UserOutlined />} /> */}</Col>
        <Col span={4}>
          <br />
          {/* <b>김위키</b> */}
        </Col>
        <Col span={16}></Col>
      </Row>

      {/* 사용자 정보 입력 폼 */}
      <Divider
        orientation="left"
        style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
      >
        <h5>
          <IdcardOutlined style={{ marginRight: "5px" }} />내 정보 입력
        </h5>
      </Divider>

      {/* 사용자 입력 필드 렌더링 */}
      <MyForm />

      <div style={{ marginTop: "30px" }}></div>

      {/* 회원가입 버튼 */}
      <Button
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b>회원가입</b>
      </Button>
    </>
  );
};

export default SignUp;

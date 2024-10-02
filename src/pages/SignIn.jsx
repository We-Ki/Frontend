import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../components/ContentHeader";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { IsLoginContext } from "../contexts/IsLoginContext";
const Signin = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { setIsLogin } = useContext(IsLoginContext);

  const handleLogin = async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    return fetch(`http://${process.env.REACT_APP_API_URL}/auth/signin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        if (body.success) {
          localStorage.setItem("token", body.message.token);
          localStorage.setItem("userUUID", body.message.userId);
          console.log("login Success");
          setIsLogin(true);
        } else {
          const errors = [
            {
              name: "username",
              errors: [""],
            },
            {
              name: "password",
              errors: [body.message],
            },
          ];
          form.setFields(errors);
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  });

  return (
    <>
      <ContentHeader
        title={"로그인"}
        sub={"한눈에 관리하는 나만의 농장 We-Ki\n로그인 후 이용가능합니다"}
      />
      <Form form={form} name="login" size="large" onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "사용자명을 입력해주세요",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="사용자명" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            로그인
          </Button>
          <Button
            block
            type="default"
            style={{ marginTop: "10px" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signin;

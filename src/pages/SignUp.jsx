import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Select, Input, Button } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import ContentHeader from "../components/ContentHeader";
import BackButton from "../components/BackButton";

const { Option } = Select;

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(process.env.REACT_APP_API_URL);
    return fetch(`http://${process.env.REACT_APP_API_URL}/auth/signup/`, {
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
          navigate("/signin");
        } else {
          const errors = Object.keys(body.message).map((key) => {
            return {
              name: key,
              errors: [body.message[key].message],
            };
          });
          console.log(errors);
          form.setFields(errors);
        }
      });
  };

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
      <Form form={form} name="login" size="large" onFinish={handleSignUp}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "성명을 입력해 주세요",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} type="text" placeholder="성명" />
        </Form.Item>

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
          <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
        </Form.Item>

        <Form.Item
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: "비밀번호를 한 번 더 입력해주세요",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="비밀번호 확인"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "이메일을 입력해 주세요",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="이메일" />
        </Form.Item>

        <Form.Item name="userGroup">
          <Select
            defaultValue="user"
            prefix={<MailOutlined />}
            placeholder="사용자 구분"
          >
            <Option value="user">사용자</Option>
            <Option value="farmer">농장주</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;

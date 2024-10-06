import React from "react";
import { Input, Button, Form } from "antd";
import ContentHeader from "../components/ContentHeader";
import { useNavigate } from "react-router-dom";
import { TagOutlined } from "@ant-design/icons";
import BackButton from "../components/BackButton";

const AddFarm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleAddFarm = (values) => {
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log(values);
        return res.json();
      })
      .then((body) => {
        if (body.success) {
          navigate(`/manage/${body.message}`);
        } else {
          const errors = [
            {
              name: "name",
              errors: ["농장 생성에 실패하였습니다."],
            },
          ];
          form.setFields(errors);
        }
      });
  };

  return (
    <>
      <BackButton label={"내 농장"} url="/" />
      <ContentHeader
        title={"새 농장 생성"}
        sub={"새로운 농장을 추가를 위해\n농장의 이름을 입력해주세요."}
      />
      <Form form={form} name="addFarm" size="large" onFinish={handleAddFarm}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "농장명을 입력해주세요",
            },
          ]}
        >
          <Input prefix={<TagOutlined />} placeholder="농장 명" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            농장 생성
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddFarm;

import React from "react";
import { Card, Table } from "antd";

const CardWithTable = ({ title, data, columns }) => (
  <Card title={title} bordered={false}>
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

export default CardWithTable;

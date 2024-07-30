import React from 'react';

import { Form, Row, Col, Image, Input, Select, Switch } from 'antd';
import { USER_ROLE } from '@/constants';
import { User } from '@/pages/user/types/user.types';

interface Props {
  selectedUser?: User;
}

export default function UserForm({ selectedUser }: Props) {
  const [form] = Form.useForm();

  return (
    <Form
      id="user-form"
      name="user-form"
      form={form}
      preserve={false}
      layout="vertical"
      initialValues={selectedUser}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="photo" label="&nbsp;">
            <Image src={selectedUser?.photo} />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name="name" label="Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select options={USER_ROLE} />
          </Form.Item>
          <Form.Item name="active" label="Active">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

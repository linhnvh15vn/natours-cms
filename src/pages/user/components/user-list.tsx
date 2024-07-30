import React, { useState } from 'react';

import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Flex,
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Space,
  Button,
  Table,
  Modal,
  Image,
  Tag,
  Switch,
  Divider,
} from 'antd';
import { type ColumnsType } from 'antd/es/table';

import { USER_ROLE, USER_ROLE_COLOR } from '@/constants';
import UserForm from '@/pages/user/components/user-form';
import { useGetUsers } from '@/pages/user/hooks/user.hooks';
import {
  type SearchUserFormValues,
  type User,
  type UserSearchParams,
} from '@/pages/user/types/user.types';
import { toCapitalize } from '@/utils';


export default function UserList() {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    page: 1,
    name: '',
    email: '',
    role: undefined,
  });

  const { data, isLoading } = useGetUsers(searchParams);

  const onFinish = (values: SearchUserFormValues) => {
    setSearchParams((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const columns: ColumnsType<User> = [
    {
      key: 'photo',
      title: 'Photo',
      dataIndex: 'photo',
      render: (value: string) => <Image src={value} width={64} />,
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (value: string) => (
        <Tag color={USER_ROLE_COLOR[value]}>{toCapitalize(value)}</Tag>
      ),
    },
    {
      key: 'active',
      title: 'Active',
      dataIndex: 'active',
      render: (value: boolean) => (
        <Switch size="small" disabled checked={value} />
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <Space>
          <span
            onClick={() => {
              setSelectedUser(record);
              setVisible(true);
            }}
          >
            <EditTwoTone />
          </span>
          <Divider type="vertical" />
          <span>
            <DeleteTwoTone />
          </span>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={32}>
      <Card title="Search">
        <Form
          id="search-user-form"
          name="search-user-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="role" label="Role">
                <Select options={USER_ROLE} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'end' }}>
                <Space size="small">
                  <Button
                    htmlType="button"
                    onClick={() => {
                      form.resetFields();
                      setSearchParams({
                        ...searchParams,
                        name: '',
                        email: '',
                        role: undefined,
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    form="search-user-form"
                  >
                    Search
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="User List">
        <Table
          rowKey="_id"
          columns={columns}
          loading={isLoading}
          dataSource={data?.items}
          pagination={{
            total: data?.totalItems,
            pageSize: data?.itemsPerPage,
            onChange: (page) => setSearchParams({ ...searchParams, page }),
          }}
        />
        <Modal
          title="User Form"
          open={visible}
          onCancel={() => setVisible(false)}
        >
          <UserForm selectedUser={selectedUser} />
        </Modal>
      </Card>
    </Flex>
  );
}

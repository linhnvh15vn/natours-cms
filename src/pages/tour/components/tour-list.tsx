import React, { useState } from 'react';

import { DIFFICULT_COLOR, TOUR_DIFFICULTY_OPTIONS } from '@/constants';
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
  Image,
  Tag,
  Divider,
  Popconfirm,
} from 'antd';
import {
  SearchTourFormValues,
  Tour,
  TourSearchParams,
} from '@/pages/tour/types/tour.types';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTour, useGetTours } from '@/pages/tour/hooks/tour.hooks';
import { toast } from 'sonner';
import { ColumnsType } from 'antd/es/table';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { toCapitalize } from '@/utils';

export default function TourList() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<TourSearchParams>({
    page: 1,
    name: '',
    difficulty: undefined,
  });

  const { data, isLoading } = useGetTours(searchParams);

  const { mutate: mutateDeleteTour } = useDeleteTour({
    onSuccess: () => {
      toast.success('Delete success!');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: () => {
      toast.error('Delete failed!');
    },
  });

  const onFinish = (values: SearchTourFormValues) => {
    setSearchParams((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const columns: ColumnsType<Tour> = [
    {
      key: 'image',
      title: 'Image',
      dataIndex: 'imageCover',
      render: (value: string) => (
        <Image src={value} width={300} alt="image-cover" />
      ),
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'difficulty',
      title: 'Difficulty',
      dataIndex: 'difficulty',
      render: (value: string) => (
        <Tag color={DIFFICULT_COLOR[value]}>{toCapitalize(value)}</Tag>
      ),
    },
    {
      key: 'duration',
      title: 'Duration',
      dataIndex: 'duration',
      render: (value: string) => <span>{`${value} days`}</span>,
    },
    {
      key: 'maxGroupSize',
      title: 'Max Group Size',
      dataIndex: 'maxGroupSize',
      render: (value: string) => <span>{`${value} people`}</span>,
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      render: (value: string) => <span>{`$${value}`}</span>,
    },
    {
      key: 'action',
      render: (_, record) => (
        <Flex gap={12} align="center">
          <Link to={`/tours/edit/${record._id}`}>
            <EditOutlined />
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete the tour"
            description="Are you sure to delete this tour?"
            onConfirm={() => mutateDeleteTour(record._id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap={32}>
      <Card title="Search">
        <Form
          id="search-tour-form"
          name="search-tour-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: '',
            difficulty: undefined,
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="difficulty" label="Difficulty">
                <Select options={TOUR_DIFFICULTY_OPTIONS} />
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
                        difficulty: undefined,
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    form="search-tour-form"
                  >
                    Search
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Tour List"
        extra={
          <Button
            type="primary"
            htmlType="button"
            onClick={() => navigate('/tours/create')}
          >
            Create
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          loading={isLoading}
          dataSource={data?.items}
          pagination={{
            total: data?.totalItems,
            pageSize: data?.itemsPerPage,
            onChange: (page) => setSearchParams({ ...searchParams, page }),
          }}
        />
      </Card>
    </Flex>
  );
}

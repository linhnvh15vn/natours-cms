import React, { useEffect, useState } from 'react';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  type UploadFile,
  type UploadProps,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import axiosInstance from '@/api/axios';
import { DATE_FORMAT, TOUR_DIFFICULTY_OPTIONS } from '@/constants';
import { useCreateTour, useGetTourById } from '@/pages/tour/hooks/tour.hooks';
import { useGetUsers } from '@/pages/user/hooks/user.hooks';
import { getNameImageFromUrl, getStarScore } from '@/utils';

export default function TourForm() {
  const [form] = Form.useForm();
  const { _id } = useParams();
  const navigate = useNavigate();

  const [imageCover, setImageCover] = useState<UploadFile[]>();
  const [imageList, setImageList] = useState<UploadFile[]>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: userData } = useGetUsers({
    all: true,
  });
  const { data, isLoading } = useGetTourById(_id ?? '', {
    enabled: !!_id,
  });

  useEffect(() => {
    setImageCover(
      _id
        ? [
            {
              uid: '-1',
              name: 'imageCover',
              status: 'done',
              url: data?.imageCover,
            },
          ]
        : [],
    );
  }, [data?.imageCover, _id]);

  useEffect(() => {
    setImageList(
      _id
        ? [
            {
              uid: '-2',
              name: 'images',
              status: 'done',
              url: data?.images[0],
            },
            {
              uid: '-3',
              name: 'images',
              status: 'done',
              url: data?.images[1],
            },
            {
              uid: '-4',
              name: 'images',
              status: 'done',
              url: data?.images[2],
            },
          ]
        : [],
    );
  }, [data?.images, _id]);

  const uploadProps: UploadProps<{ image: string; url: string }> = {
    action: 'http://127.0.0.1:8080/api/v1/upload',
    name: 'file',
    fileList: imageCover,
    listType: 'picture-card',
    onPreview: (file) => {
      setPreviewImage(file.response?.image ?? file.url!);
      setPreviewOpen(true);
      setPreviewTitle('Preview tour images');
    },
    onChange: ({ file, fileList }) => {
      if (file.status === 'uploading') {
        form.setFieldValue('imageCover', undefined);
        setImageCover(fileList);
      }
      if (file.status === 'done') {
        form.setFieldValue('imageCover', file.response?.image);
        setImageCover(fileList);
      }
      if (file.status === 'removed') {
        form.setFieldValue('imageCover', undefined);
        setImageCover(fileList);
      }
    },
    onRemove: async (file) => {
      const publicId = getNameImageFromUrl(file.response.file.filename);
      await axiosInstance.delete(`/upload/${publicId}`);
    },
  };

  const { mutate: mutateCreateTour } = useCreateTour({
    onSuccess: () => {
      toast.success('Successfully added a record.');
      navigate('/tours');
    },
    onError: () => {
      toast.error('Failed to add a record.');
    },
  });

  if (isLoading) {
    return <LoadingOutlined />;
  }

  return (
    <Card
      title="Tour details"
      extra={
        <Button
          type="link"
          htmlType="button"
          onClick={() => setOpenDrawer(true)}
        >
          View reviews
        </Button>
      }
    >
      <Form
        id="tour-form"
        name="tour-form"
        form={form}
        layout="vertical"
        initialValues={
          {
            ...data,
            guides: data?.guides.map((guide) => ({
              label: guide.name,
              value: guide._id,
            })),
            startDates: data?.startDates.map((date) =>
              dayjs(date, DATE_FORMAT),
            ),
          } || undefined
        }
        onFinish={mutateCreateTour}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              name="name"
              label="Name"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'A tour must have a name',
                },
                {
                  min: 10,
                  whitespace: true,
                  message:
                    'A tour name must have more or equal then 10 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="duration"
              label="Duration"
              rules={[
                {
                  required: true,
                  message: 'A tour must have a duration',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="maxGroupSize"
              label="Max group size"
              rules={[
                {
                  required: true,
                  message: 'A tour must have a group size',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="difficulty"
              label="Difficulty"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'A tour must have a difficulty',
                },
              ]}
            >
              <Select options={TOUR_DIFFICULTY_OPTIONS} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: 'A tour must have a price',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="priceDiscount" label="Price discount">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="summary"
              label="Summary"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'A tour must have a description',
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="startDates" label="Start dates">
              <DatePicker
                multiple
                format={DATE_FORMAT}
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="guides" label="Guides">
              <Select
                mode="multiple"
                className="w-full"
                options={userData}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="imageCover"
              label="Image cover"
              rules={[
                {
                  required: true,
                  message: 'A tour must have a cover image',
                },
              ]}
            >
              <Upload {...uploadProps}>
                {imageCover && imageCover.length >= 1 ? null : (
                  <button
                    type="button"
                    style={{ border: 0, background: 'none' }}
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>
            {/* Custom to reused component */}
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img src={previewImage} alt="image-cover" className="w-full" />
            </Modal>
          </Col>
          <Col span={12}>
            <Form.Item name="images" label="Images">
              <Upload fileList={imageList} listType="picture-card">
                <button type="button" style={{ border: 0, background: 'none' }}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item style={{ textAlign: 'end' }}>
              <Space size="small">
                <Button htmlType="button" onClick={() => navigate('/tours')}>
                  Back
                </Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {/* Make loading infinite on scroll or load more button! */}
        <List
          dataSource={data?.reviews}
          itemLayout="vertical"
          renderItem={(review) => (
            <List.Item key={review._id}>
              <List.Item.Meta
                avatar={<Avatar src={review.user.photo} />}
                title={review.user.name}
                description={
                  <Space>
                    <Typography.Text type="warning">
                      {getStarScore(review.rating)}
                    </Typography.Text>
                    <Divider type="vertical" />
                    <Typography.Text type="secondary">
                      {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm')}
                    </Typography.Text>
                  </Space>
                }
              />
              <Typography.Text>{review.review}</Typography.Text>
            </List.Item>
          )}
        />
      </Drawer>
    </Card>
  );
}

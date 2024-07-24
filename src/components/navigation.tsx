import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

export default function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: 'tours',
      icon: <EnvironmentOutlined />,
      label: <Link to="/tours">Tours</Link>,
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
  ];

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
  );
}

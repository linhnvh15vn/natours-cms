import React from 'react';

import Header from '@/components/header';
import Navigation from '@/components/navigation';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      <Layout>
        <Header />
        <Layout.Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

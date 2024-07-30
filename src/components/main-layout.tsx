import React from 'react';

import { Breadcrumb, Layout } from 'antd';
import { Outlet, useMatches } from 'react-router-dom';

import Header from '@/components/header';
import Navigation from '@/components/navigation';

export default function MainLayout() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      <Layout>
        <Header />
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[...crumbs]} />

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

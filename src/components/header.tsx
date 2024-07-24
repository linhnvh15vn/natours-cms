import React from 'react';

import { Layout, theme } from 'antd';

export default function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <Layout.Header style={{ padding: 0, background: colorBgContainer }} />;
}

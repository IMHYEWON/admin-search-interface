'use client';

import { Layout } from 'antd';
import Header from './Header';

const { Content } = Layout;

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content>
        {children}
      </Content>
    </Layout>
  );
}

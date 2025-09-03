'use client';

import { Layout } from 'antd';
import Header from '@/components/Header';

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h1>어드민 대시보드</h1>
          <p>헤더의 검색바를 사용하여 상품을 검색해보세요.</p>
          <p>검색 결과에서 상품을 클릭하면 상세 페이지로 이동합니다.</p>
        </div>
      </Content>
    </Layout>
  );
}

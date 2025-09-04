'use client';

import { useCallback } from 'react';
import { Layout, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const router = useRouter();

  const handleProductSelect = useCallback((productId: string) => {
    router.push(`/products/${productId}`);
  }, [router]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  }, [router]);

  return (
    <AntHeader className="ant-layout-header">
      <div className="search-header">
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Admin Panel
        </Title>
        <div className="search-container">
          <SearchBar
            placeholder="상품명을 입력하세요..."
            size="large"
            onProductSelect={handleProductSelect}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    </AntHeader>
  );
}

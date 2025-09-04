'use client';

import { useCallback } from 'react';
import { Layout, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { SearchBarWithApi } from './index';
import { SearchItem, getStatusDisplayText, getStatusCssClass } from '@/types/product';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const router = useRouter();

  const handleItemSelect = useCallback((itemId: string, itemType: string) => {
    if (itemType === 'product') {
      router.push(`/products/${itemId}`);
    } else if (itemType === 'category') {
      router.push(`/categories/${itemId}`);
    }
  }, [router]);

  // sections 정의 (products와 categories로 고정)
  const sections = [
    {
      key: 'products',
      title: 'Products',
      color: '#1890ff',
      itemType: 'product',
      items: [], // SearchBarWithApi에서 채워짐
      renderItem: (item: SearchItem) => (
        <div className="product-item" style={{ paddingLeft: '16px' }}>
          <span className="product-name">{item.name}</span>
          <span className={`product-status ${getStatusCssClass(item.status)}`}>
            {getStatusDisplayText(item.status)}
          </span>
        </div>
      )
    },
    {
      key: 'categories',
      title: 'Categories',
      color: '#52c41a',
      itemType: 'category',
      items: [], // SearchBarWithApi에서 채워짐
      renderItem: (item: SearchItem) => (
        <div className="product-item" style={{ paddingLeft: '16px' }}>
          <span className="product-name">{item.name}</span>
          <span className={`product-status ${getStatusCssClass(item.status)}`}>
            {item.metadata?.productCount || 0}개 상품
          </span>
        </div>
      )
    }
  ];

  return (
    <AntHeader className="ant-layout-header">
      <div className="search-header">
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Admin Panel
        </Title>
        <div className="search-container">
          <SearchBarWithApi
            placeholder="상품명을 입력하세요..."
            size="large"
            sections={sections}
            onItemSelect={handleItemSelect}
          />
        </div>
      </div>
    </AntHeader>
  );
}

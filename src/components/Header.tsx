'use client';

import { useState, useCallback } from 'react';
import { Layout, AutoComplete, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Product, Category } from '@/types/product';
import { searchAll } from '@/lib/mockData';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const searchResult = await searchAll(value);
      const newOptions: { value: string; label: React.ReactNode }[] = [];

      // Products 섹션
      if (searchResult.productInfo.products.length > 0) {
        newOptions.push({
          value: 'products-header',
          label: (
            <div style={{ 
              fontWeight: 'bold', 
              color: '#1890ff', 
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
              marginBottom: '4px'
            }}>
              Products
            </div>
          ),
        });

        searchResult.productInfo.products.forEach((product: Product) => {
          newOptions.push({
            value: `product-${product.id}`,
            label: (
              <div className="product-item" style={{ paddingLeft: '16px' }}>
                <span className="product-name">{product.name}</span>
                <span className={`product-status status-${product.status}`}>
                  {product.status === 'active' && '활성'}
                  {product.status === 'inactive' && '비활성'}
                  {product.status === 'discontinued' && '단종'}
                </span>
              </div>
            ),
          });
        });
      }

      // Categories 섹션
      if (searchResult.categoryInfo.categories.length > 0) {
        newOptions.push({
          value: 'categories-header',
          label: (
            <div style={{ 
              fontWeight: 'bold', 
              color: '#52c41a', 
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
              marginBottom: '4px',
              marginTop: searchResult.productInfo.products.length > 0 ? '8px' : '0'
            }}>
              Categories
            </div>
          ),
        });

        searchResult.categoryInfo.categories.forEach((category: Category) => {
          newOptions.push({
            value: `category-${category.id}`,
            label: (
              <div className="product-item" style={{ paddingLeft: '16px' }}>
                <span className="product-name">{category.name}</span>
                <span className={`product-status status-${category.status}`}>
                  {category.productCount}개 상품
                </span>
              </div>
            ),
          });
        });
      }

      setOptions(newOptions);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = useCallback((value: string) => {
    // 헤더는 클릭할 수 없도록 처리
    if (value === 'products-header' || value === 'categories-header') {
      return;
    }

    // 상품과 카테고리를 구분해서 라우팅
    if (value.startsWith('product-')) {
      const productId = value.replace('product-', '');
      router.push(`/products/${productId}`);
    } else if (value.startsWith('category-')) {
      const categoryId = value.replace('category-', '');
      router.push(`/categories/${categoryId}`);
    }
  }, [router]);

  return (
    <AntHeader className="ant-layout-header">
      <div className="search-header">
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Admin Panel
        </Title>
        <div className="search-container">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            style={{ width: '100%' }}
            loading={loading}
          >
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="상품명을 입력하세요..."
            />
          </AutoComplete>
        </div>
      </div>
    </AntHeader>
  );
}

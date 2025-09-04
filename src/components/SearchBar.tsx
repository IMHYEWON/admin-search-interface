'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Product, Category } from '@/types/product';
import { searchAll } from '@/lib/api';

export interface SearchBarProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  onProductSelect?: (productId: string) => void;
  onCategorySelect?: (categoryId: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "상품명을 입력하세요...",
  size = "large",
  style,
  onProductSelect,
  onCategorySelect,
  className
}: SearchBarProps) {
  const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 디바운스 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleSearch = useCallback((value: string) => {
    // 이전 디바운스 타이머 취소
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setOptions([]);
      return;
    }

    // 300ms 디바운스 적용
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResult = await searchAll(value);
        const newOptions: { value: string; label: React.ReactNode }[] = [];

        // Products 섹션 - 상품 검색 결과 생성
        if (searchResult.productInfo.products.length > 0) {
          // 1. Products 헤더 추가 (클릭 불가능한 구분선)
          newOptions.push({
            value: 'products-header', // 헤더는 클릭할 수 없도록 특별한 value 사용
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

          // 2. 각 상품을 검색 결과 옵션으로 추가
          searchResult.productInfo.products.forEach((product: Product) => {
            newOptions.push({
              value: `product-${product.id}`, // 상품 선택 시 식별할 수 있는 고유 value
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

        // Categories 섹션 - 카테고리 검색 결과 생성
        if (searchResult.categoryInfo.categories.length > 0) {
          // 1. Categories 헤더 추가 (클릭 불가능한 구분선)
          newOptions.push({
            value: 'categories-header', // 헤더는 클릭할 수 없도록 특별한 value 사용
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

          // 2. 각 카테고리를 검색 결과 옵션으로 추가
          searchResult.categoryInfo.categories.forEach((category: Category) => {
            newOptions.push({
              value: `category-${category.id}`, // 카테고리 선택 시 식별할 수 있는 고유 value
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
    }, 300);
  }, []);

  /**
   * 검색 결과에서 항목을 선택했을 때 호출되는 핸들러
   * @param value - 선택된 항목의 value (예: "product-1", "category-cat1")
   */
  const handleSelect = useCallback((value: string) => {
    // 1. 헤더 항목은 클릭할 수 없도록 처리
    // "products-header" 또는 "categories-header"는 단순히 구분선 역할
    if (value === 'products-header' || value === 'categories-header') {
      return;
    }

    // 2. 상품과 카테고리를 구분하여 적절한 콜백 함수 호출
    if (value.startsWith('product-')) {
      // 상품 선택 시: "product-1" → "1"로 ID 추출
      const productId = value.replace('product-', '');
      console.log('상품 선택됨:', productId);
      onProductSelect?.(productId); // 부모 컴포넌트의 onProductSelect 콜백 호출
    } else if (value.startsWith('category-')) {
      // 카테고리 선택 시: "category-cat1" → "cat1"로 ID 추출
      const categoryId = value.replace('category-', '');
      console.log('카테고리 선택됨:', categoryId);
      onCategorySelect?.(categoryId); // 부모 컴포넌트의 onCategorySelect 콜백 호출
    }
  }, [onProductSelect, onCategorySelect]);

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{ width: '100%', ...style }}
      loading={loading}
      className={className}
    >
      <Input
        size={size}
        prefix={<SearchOutlined />}
        placeholder={placeholder}
      />
    </AutoComplete>
  );
}

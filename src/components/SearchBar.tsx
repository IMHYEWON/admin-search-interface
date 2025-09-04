'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Product, Category, SearchItem, GenericSearchResponse } from '@/types/product';
import { searchAll } from '@/lib/api';

// 검색 섹션 설정 인터페이스
export interface SearchSectionConfig {
  key: string; // 섹션 키 (예: 'products', 'categories', 'events')
  title: string; // 섹션 제목 (예: 'Products', 'Categories', 'Events')
  color: string; // 섹션 색상 (예: '#1890ff', '#52c41a')
  itemType: string; // 아이템 타입 (예: 'product', 'category', 'event')
  onSelect?: (itemId: string, itemType: string) => void; // 선택 시 콜백
  renderItem?: (item: SearchItem) => React.ReactNode; // 커스텀 아이템 렌더링
}

export interface SearchBarProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  className?: string;
  
  // 필수 설정
  sections: SearchSectionConfig[]; // 검색 섹션 설정 (필수)
  onItemSelect?: (itemId: string, itemType: string) => void; // 범용 선택 콜백
}

export default function SearchBar({
  placeholder = "상품명을 입력하세요...",
  size = "large",
  style,
  className,
  
  // 필수 props
  sections,
  onItemSelect
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

        // 범용 섹션 처리 로직
        sections.forEach((section, sectionIndex) => {
          // 섹션별 데이터 추출 (기존 API 응답 구조에 맞춤)
          let sectionData: SearchItem[] = [];
          if (section.key === 'products' && searchResult.productInfo.products.length > 0) {
            sectionData = searchResult.productInfo.products.map(product => ({
              id: product.id,
              name: product.name,
              type: 'product',
              status: product.status,
              metadata: {}
            }));
          } else if (section.key === 'categories' && searchResult.categoryInfo.categories.length > 0) {
            sectionData = searchResult.categoryInfo.categories.map(category => ({
              id: category.id,
              name: category.name,
              type: 'category',
              status: category.status,
              metadata: { productCount: category.productCount }
            }));
          }

          // 섹션에 데이터가 있을 때만 렌더링
          if (sectionData.length > 0) {
            // 1. 섹션 헤더 추가
            newOptions.push({
              value: `${section.key}-header`,
              label: (
                <div style={{ 
                  fontWeight: 'bold', 
                  color: section.color, 
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0',
                  marginBottom: '4px',
                  marginTop: sectionIndex > 0 ? '8px' : '0'
                }}>
                  {section.title}
                </div>
              ),
            });

            // 2. 섹션 아이템들 추가
            sectionData.forEach((item) => {
              newOptions.push({
                value: `${section.itemType}-${item.id}`,
                label: section.renderItem ? section.renderItem(item) : (
                  <div className="product-item" style={{ paddingLeft: '16px' }}>
                    <span className="product-name">{item.name}</span>
                    {item.status && (
                      <span className={`product-status status-${item.status}`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                ),
              });
            });
          }
        });

        setOptions(newOptions);
      } catch (error) {
        console.error('검색 중 오류가 발생했습니다:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [sections]);

  /**
   * 검색 결과에서 항목을 선택했을 때 호출되는 핸들러
   * @param value - 선택된 항목의 value (예: "product-1", "category-cat1", "event-123")
   */
  const handleSelect = useCallback((value: string) => {
    // 1. 헤더 항목은 클릭할 수 없도록 처리
    if (value.endsWith('-header')) {
      return;
    }

    // 2. 범용 선택 처리 로직
    const [itemType, itemId] = value.split('-', 2);
    
    if (itemType && itemId) {
      console.log(`${itemType} 선택됨:`, itemId);
      
      // 범용 콜백 호출
      onItemSelect?.(itemId, itemType);
      
      // 섹션별 개별 콜백 호출
      const section = sections.find(s => s.itemType === itemType);
      section?.onSelect?.(itemId, itemType);
    }
  }, [onItemSelect, sections]);

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{ width: '100%', ...style }}
      className={className}
    >
      <Input
        size={size}
        prefix={loading ? <SearchOutlined spin /> : <SearchOutlined />}
        placeholder={loading ? '검색 중...' : placeholder}
        disabled={loading}
      />
    </AutoComplete>
  );
}

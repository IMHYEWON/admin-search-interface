'use client';

import { useState, useCallback, useEffect } from 'react';
import SearchBar from './SearchBar';
import { searchAll } from '@/lib/api';
import { SearchItem, getStatusDisplayText, getStatusCssClass } from '@/types/product';

interface SearchBarWithApiProps {
  sections: any[];
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  className?: string;
  onItemSelect?: (itemId: string, itemType: string) => void;
}

export default function SearchBarWithApi({ sections, ...props }: SearchBarWithApiProps) {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      setSearchValue('');
      return;
    }

    setSearchValue(value);
  }, []);

  // searchValue가 변경될 때마다 API 호출
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const searchResult = await searchAll(searchValue);
        
        // API 응답을 SearchItem[]로 변환
        const allItems: SearchItem[] = [];
        
        // Products 변환
        if (searchResult.productInfo?.products?.length > 0) {
          const productItems = searchResult.productInfo.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            type: 'product',
            status: product.status,
            metadata: {}
          }));
          allItems.push(...productItems);
        }
        
        // Categories 변환
        if (searchResult.categoryInfo?.categories?.length > 0) {
          const categoryItems = searchResult.categoryInfo.categories.map((category: any) => ({
            id: category.id,
            name: category.name,
            type: 'category',
            status: category.status,
            metadata: { productCount: category.productCount }
          }));
          allItems.push(...categoryItems);
        }
        
        setSearchResults(allItems);
      } catch (error) {
        console.error('검색 중 오류가 발생했습니다:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    // 300ms 디바운스
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // sections에 searchResults를 추가
  if (!sections || !Array.isArray(sections)) {
    return <div>No sections provided</div>;
  }

  const sectionsWithData = sections.map((section: any) => ({
    ...section,
    items: searchResults.filter(item => item.type === section.itemType)
  }));

  // externalOptions 생성
  const externalOptions: { value: string; label: React.ReactNode }[] = [];
  
  sectionsWithData.forEach((section: any, sectionIndex: number) => {
    if (section.items.length > 0) {
      // 섹션 헤더 추가
      externalOptions.push({
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

      // 섹션 아이템들 추가
      section.items.forEach((item: SearchItem) => {
        externalOptions.push({
          value: `${section.itemType}-${item.id}`,
          label: section.renderItem ? section.renderItem(item) : (
            <div className="product-item" style={{ 
              paddingLeft: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              minHeight: '32px'
            }}>
              <span className="product-name" style={{ flex: 1, marginRight: '8px' }}>{item.name}</span>
              {item.status && (
                <span className={`product-status ${getStatusCssClass(item.status)}`} style={{
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {getStatusDisplayText(item.status)}
                </span>
              )}
            </div>
          )
        });
      });
    }
  });

  return (
    <SearchBar
      {...props}
      sections={sectionsWithData}
      onItemSelect={props.onItemSelect}
      onSearch={handleSearch}
      externalOptions={externalOptions}
    />
  );
}

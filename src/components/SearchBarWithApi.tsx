'use client';

import { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import { searchAll } from '@/lib/api';
import { SearchItem } from '@/types/product';

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

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResult = await searchAll(value);
      
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
  }, []);

  // sections에 searchResults를 추가
  if (!sections || !Array.isArray(sections)) {
    return <div>No sections provided</div>;
  }

  const sectionsWithData = sections.map((section: any) => ({
    ...section,
    items: searchResults.filter(item => item.type === section.itemType)
  }));

  return (
    <SearchBar
      {...props}
      sections={sectionsWithData}
    />
  );
}

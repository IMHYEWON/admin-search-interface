export interface Product {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
}

export interface Category {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
  productCount: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
}

export interface CategorySearchResult {
  categories: Category[];
  total: number;
}

export interface SearchResponse {
  productInfo: ProductSearchResult;
  categoryInfo: CategorySearchResult;
}

// 범용 검색 아이템 인터페이스
export interface SearchItem {
  id: string;
  name: string;
  type: string; // 'product', 'category', 'event', 'user' 등
  status?: string;
  metadata?: Record<string, any>; // 추가 정보 (productCount, date 등)
}

// 범용 검색 결과 인터페이스
export interface GenericSearchResult {
  items: SearchItem[];
  total: number;
}

// 범용 검색 응답 인터페이스
export interface GenericSearchResponse {
  [key: string]: GenericSearchResult; // 동적으로 섹션 추가 가능
}

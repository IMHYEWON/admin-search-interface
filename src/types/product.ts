// Status 관련 상수 정의
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCONTINUED: 'discontinued'
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];

// Status 표시 텍스트 매핑
export const STATUS_DISPLAY_TEXT = {
  [PRODUCT_STATUS.ACTIVE]: '활성',
  [PRODUCT_STATUS.INACTIVE]: '비활성',
  [PRODUCT_STATUS.DISCONTINUED]: '단종'
} as const;

// Status별 CSS 클래스 매핑
export const STATUS_CSS_CLASS = {
  [PRODUCT_STATUS.ACTIVE]: 'status-active',
  [PRODUCT_STATUS.INACTIVE]: 'status-inactive',
  [PRODUCT_STATUS.DISCONTINUED]: 'status-discontinued'
} as const;

// Status 표시를 위한 유틸리티 함수들
export const getStatusDisplayText = (status?: ProductStatus): string => {
  return status ? STATUS_DISPLAY_TEXT[status] || status : '알 수 없음';
};

export const getStatusCssClass = (status?: ProductStatus): string => {
  return status ? STATUS_CSS_CLASS[status] || 'status-unknown' : 'status-unknown';
};

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
}

export interface Category {
  id: string;
  name: string;
  status: ProductStatus;
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
  status?: ProductStatus;
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

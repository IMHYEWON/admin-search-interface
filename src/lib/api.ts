import axios from 'axios';
import { Product, Category, SearchResponse } from '@/types/product';

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api/v1';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 응답 타입 정의
interface ApiProduct {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
}

interface ApiCategory {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
  productCount: number;
}

interface ApiSearchResponse {
  productInfo: {
    products: ApiProduct[];
    total: number;
  };
  categoryInfo: {
    categories: ApiCategory[];
    total: number;
  };
}

// 실제 API 호출 함수
export const searchAll = async (query: string): Promise<SearchResponse> => {
  try {
    if (!query.trim()) {
      return {
        productInfo: { products: [], total: 0 },
        categoryInfo: { categories: [], total: 0 }
      };
    }

    const response = await apiClient.get<ApiSearchResponse>('/products/autocomplete', {
      params: {
        query: query.trim()
      }
    });

    // API 응답을 내부 타입으로 변환
    const products: Product[] = response.data.productInfo.products.map(apiProduct => ({
      id: apiProduct.id,
      name: apiProduct.name,
      status: apiProduct.status
    }));

    const categories: Category[] = response.data.categoryInfo.categories.map(apiCategory => ({
      id: apiCategory.id,
      name: apiCategory.name,
      status: apiCategory.status,
      productCount: apiCategory.productCount
    }));

    return {
      productInfo: {
        products: products.slice(0, 5), // 최대 5개까지만 반환
        total: response.data.productInfo.total
      },
      categoryInfo: {
        categories: categories.slice(0, 5), // 최대 5개까지만 반환
        total: response.data.categoryInfo.total
      }
    };
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    
    // API 오류 시 빈 결과 반환
    return {
      productInfo: { products: [], total: 0 },
      categoryInfo: { categories: [], total: 0 }
    };
  }
};

// 기존 상품 검색 함수 (하위 호환성을 위해 유지)
export const searchProducts = async (query: string): Promise<Product[]> => {
  const result = await searchAll(query);
  return result.productInfo.products;
};

// 개별 상품 조회 함수
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get<ApiProduct>(`/products/${id}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      status: response.data.status
    };
  } catch (error) {
    console.error('상품 조회 중 오류가 발생했습니다:', error);
    return null;
  }
};

// 개별 카테고리 조회 함수
export const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const response = await apiClient.get<ApiCategory>(`/categories/${id}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      status: response.data.status,
      productCount: response.data.productCount
    };
  } catch (error) {
    console.error('카테고리 조회 중 오류가 발생했습니다:', error);
    return null;
  }
};

// 카테고리별 상품 목록 조회 함수
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await apiClient.get<ApiProduct[]>(`/categories/${categoryId}/products`);
    
    return response.data.map(apiProduct => ({
      id: apiProduct.id,
      name: apiProduct.name,
      status: apiProduct.status
    }));
  } catch (error) {
    console.error('카테고리별 상품 조회 중 오류가 발생했습니다:', error);
    return [];
  }
};

// API 상태 확인 함수
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/health');
    return true;
  } catch (error) {
    console.error('API 서버 연결 실패:', error);
    return false;
  }
};

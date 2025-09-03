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

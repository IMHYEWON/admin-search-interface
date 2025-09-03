import { Product, Category, SearchResponse } from '@/types/product';

// 모킹된 상품 데이터 (더 풍부한 테스트 데이터)
export const mockProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', status: 'active' },
  { id: '2', name: 'Samsung Galaxy S24', status: 'active' },
  { id: '3', name: 'MacBook Pro M3', status: 'active' },
  { id: '4', name: 'iPad Air', status: 'inactive' },
  { id: '5', name: 'AirPods Pro', status: 'active' },
  { id: '6', name: 'Sony WH-1000XM5', status: 'active' },
  { id: '7', name: 'Nintendo Switch', status: 'discontinued' },
  { id: '8', name: 'PlayStation 5', status: 'active' },
  { id: '9', name: 'Xbox Series X', status: 'inactive' },
  { id: '10', name: 'Dell XPS 13', status: 'active' },
  { id: '11', name: 'Surface Pro 9', status: 'active' },
  { id: '12', name: 'Google Pixel 8', status: 'active' },
  { id: '13', name: 'OnePlus 12', status: 'inactive' },
  { id: '14', name: 'LG OLED TV', status: 'active' },
  { id: '15', name: 'Samsung QLED TV', status: 'discontinued' },
  { id: '16', name: 'Apple Watch Series 9', status: 'active' },
  { id: '17', name: 'Garmin Fenix 7', status: 'active' },
  { id: '18', name: 'Fitbit Versa 4', status: 'inactive' },
  { id: '19', name: 'Canon EOS R5', status: 'active' },
  { id: '20', name: 'Sony A7 IV', status: 'active' },
  { id: '21', name: 'Nike Air Max 270', status: 'active' },
  { id: '22', name: 'Adidas Ultraboost 22', status: 'active' },
  { id: '23', name: 'Jordan 1 Retro', status: 'inactive' },
  { id: '24', name: 'Yeezy Boost 350', status: 'discontinued' },
  { id: '25', name: 'Tesla Model 3', status: 'active' },
  { id: '26', name: 'BMW i4', status: 'active' },
  { id: '27', name: 'Mercedes EQS', status: 'inactive' },
  { id: '28', name: 'Audi e-tron', status: 'active' },
  { id: '29', name: 'Dyson V15', status: 'active' },
  { id: '30', name: 'Roomba i7+', status: 'active' },
  { id: '31', name: 'KitchenAid Mixer', status: 'active' },
  { id: '32', name: 'Instant Pot', status: 'inactive' },
  { id: '33', name: 'Vitamix A3500', status: 'active' },
  { id: '34', name: 'Breville Barista', status: 'discontinued' },
  { id: '35', name: 'Nespresso Vertuo', status: 'active' },
  { id: '36', name: 'Herman Miller Chair', status: 'active' },
  { id: '37', name: 'Standing Desk', status: 'active' },
  { id: '38', name: 'Monitor 4K', status: 'inactive' },
  { id: '39', name: 'Mechanical Keyboard', status: 'active' },
  { id: '40', name: 'Gaming Mouse', status: 'active' },
  { id: '41', name: 'Wireless Headphones', status: 'active' },
  { id: '42', name: 'Bluetooth Speaker', status: 'active' },
  { id: '43', name: 'Smart Watch', status: 'inactive' },
  { id: '44', name: 'Fitness Tracker', status: 'discontinued' },
  { id: '45', name: 'Tablet 10 inch', status: 'active' },
  { id: '46', name: 'Laptop Gaming', status: 'active' },
  { id: '47', name: 'Desktop PC', status: 'active' },
  { id: '48', name: 'Graphics Card RTX', status: 'inactive' },
  { id: '49', name: 'RAM 32GB', status: 'active' },
  { id: '50', name: 'SSD 1TB', status: 'active' },
];

// 모킹된 카테고리 데이터
export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Electronics', status: 'active', productCount: 25 },
  { id: 'cat2', name: 'Smartphones', status: 'active', productCount: 8 },
  { id: 'cat3', name: 'Laptops', status: 'active', productCount: 12 },
  { id: 'cat4', name: 'Audio', status: 'active', productCount: 6 },
  { id: 'cat5', name: 'Gaming', status: 'active', productCount: 15 },
  { id: 'cat6', name: 'Cameras', status: 'active', productCount: 4 },
  { id: 'cat7', name: 'Wearables', status: 'active', productCount: 7 },
  { id: 'cat8', name: 'Home Appliances', status: 'active', productCount: 18 },
  { id: 'cat9', name: 'Fashion', status: 'active', productCount: 22 },
  { id: 'cat10', name: 'Shoes', status: 'active', productCount: 14 },
  { id: 'cat11', name: 'Automotive', status: 'active', productCount: 5 },
  { id: 'cat12', name: 'Sports', status: 'active', productCount: 9 },
  { id: 'cat13', name: 'Books', status: 'inactive', productCount: 0 },
  { id: 'cat14', name: 'Toys', status: 'discontinued', productCount: 0 },
  { id: 'cat15', name: 'Furniture', status: 'active', productCount: 11 },
  { id: 'cat16', name: 'Kitchen', status: 'active', productCount: 8 },
  { id: 'cat17', name: 'Office', status: 'active', productCount: 13 },
  { id: 'cat18', name: 'Health', status: 'active', productCount: 6 },
  { id: 'cat19', name: 'Beauty', status: 'inactive', productCount: 0 },
  { id: 'cat20', name: 'Travel', status: 'active', productCount: 3 },
];

// 통합 검색 함수 (상품 + 카테고리)
export const searchAll = async (query: string): Promise<SearchResponse> => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query.trim()) {
    return {
      productInfo: { products: [], total: 0 },
      categoryInfo: { categories: [], total: 0 }
    };
  }
  
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  
  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(query.toLowerCase())
  );
  
  // 최대 5개까지만 반환
  return {
    productInfo: {
      products: filteredProducts.slice(0, 5),
      total: filteredProducts.length
    },
    categoryInfo: {
      categories: filteredCategories.slice(0, 5),
      total: filteredCategories.length
    }
  };
};

// 기존 상품 검색 함수 (하위 호환성을 위해 유지)
export const searchProducts = async (query: string): Promise<Product[]> => {
  const result = await searchAll(query);
  return result.productInfo.products;
};

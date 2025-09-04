'use client';

import { Layout, Card, Typography, Tag, Button, Spin, List } from 'antd';
import { ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Category, Product } from '@/types/product';
import { getCategoryById, getProductsByCategory } from '@/lib/api';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface CategoryDetailPageProps {
  params: {
    id: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const foundCategory = await getCategoryById(params.id);
        if (foundCategory) {
          setCategory(foundCategory);
          // 해당 카테고리의 상품들을 API에서 가져오기
          const products = await getProductsByCategory(params.id);
          setCategoryProducts(products.slice(0, 10)); // 최대 10개만 표시
        } else {
          setCategory(null);
          setCategoryProducts([]);
        }
      } catch (error) {
        console.error('카테고리 조회 중 오류가 발생했습니다:', error);
        setCategory(null);
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'discontinued':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'discontinued':
        return '단종';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px' }}>
          <Card>
            <Title level={2}>카테고리를 찾을 수 없습니다</Title>
            <Paragraph>요청하신 카테고리가 존재하지 않거나 삭제되었습니다.</Paragraph>
            <Button type="primary" onClick={() => router.push('/')}>
              홈으로 돌아가기
            </Button>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              style={{ marginBottom: '16px' }}
            >
              뒤로가기
            </Button>
          </div>
          
          <Title level={2}>
            <ShoppingOutlined style={{ marginRight: '8px' }} />
            {category.name}
          </Title>
          
          <div style={{ marginBottom: '16px' }}>
            <Tag color={getStatusColor(category.status)}>
              {getStatusText(category.status)}
            </Tag>
            <Tag color="blue">
              {category.productCount}개 상품
            </Tag>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <Title level={4}>카테고리 정보</Title>
            <Paragraph>
              <strong>카테고리 ID:</strong> {category.id}
            </Paragraph>
            <Paragraph>
              <strong>카테고리명:</strong> {category.name}
            </Paragraph>
            <Paragraph>
              <strong>상태:</strong> {getStatusText(category.status)}
            </Paragraph>
            <Paragraph>
              <strong>상품 수:</strong> {category.productCount}개
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>카테고리 내 상품</Title>
            {categoryProducts.length > 0 ? (
              <List
                dataSource={categoryProducts}
                renderItem={(product) => (
                  <List.Item
                    actions={[
                      <Button 
                        type="link" 
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        상세보기
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={product.name}
                      description={
                        <Tag color={getStatusColor(product.status)}>
                          {getStatusText(product.status)}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Paragraph>이 카테고리에 등록된 상품이 없습니다.</Paragraph>
            )}
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

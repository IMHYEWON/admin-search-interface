'use client';

import { Layout, Card, Typography, Tag, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Product } from '@/types/product';
import { getProductById } from '@/lib/api';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const foundProduct = await getProductById(params.id);
        setProduct(foundProduct);
      } catch (error) {
        console.error('상품 조회 중 오류가 발생했습니다:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

  if (!product) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px' }}>
          <Card>
            <Title level={2}>상품을 찾을 수 없습니다</Title>
            <Paragraph>요청하신 상품이 존재하지 않거나 삭제되었습니다.</Paragraph>
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
          
          <Title level={2}>{product.name}</Title>
          
          <div style={{ marginBottom: '16px' }}>
            <Tag color={getStatusColor(product.status)}>
              {getStatusText(product.status)}
            </Tag>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <Title level={4}>상품 정보</Title>
            <Paragraph>
              <strong>상품 ID:</strong> {product.id}
            </Paragraph>
            <Paragraph>
              <strong>상품명:</strong> {product.name}
            </Paragraph>
            <Paragraph>
              <strong>상태:</strong> {getStatusText(product.status)}
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>추가 정보</Title>
            <Paragraph>
              여기에 상품의 추가 정보가 표시됩니다. 
              실제 프로젝트에서는 데이터베이스에서 가져온 상세 정보를 표시할 수 있습니다.
            </Paragraph>
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

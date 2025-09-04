'use client';

import { Layout, Card, Typography, Space, Divider, Alert, Tag } from 'antd';
import { SearchBar } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkApiHealth } from '@/lib/api';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function SearchBarDemo() {
  const router = useRouter();
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    const checkApi = async () => {
      const isConnected = await checkApiHealth();
      setApiStatus(isConnected ? 'connected' : 'disconnected');
    };
    
    checkApi();
  }, []);

  const handleProductSelect = (productId: string) => {
    console.log('Product selected:', productId);
    router.push(`/products/${productId}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log('Category selected:', categoryId);
    router.push(`/categories/${categoryId}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <Card>
          <Title level={2}>SearchBar 컴포넌트 사용 예시</Title>
          
          <Paragraph>
            SearchBar 컴포넌트는 독립적으로 사용할 수 있는 재사용 가능한 컴포넌트입니다.
            다양한 props를 통해 커스터마이징할 수 있습니다.
          </Paragraph>

          {/* API 상태 표시 */}
          <div style={{ marginBottom: '16px' }}>
            <Text strong>API 상태: </Text>
            {apiStatus === 'checking' && <Tag color="processing">확인 중...</Tag>}
            {apiStatus === 'connected' && <Tag color="success">API 연결됨</Tag>}
            {apiStatus === 'disconnected' && <Tag color="warning">API 연결 실패 (Mock 데이터 사용)</Tag>}
          </div>

          {apiStatus === 'disconnected' && (
            <Alert
              message="API 서버 연결 실패"
              description="API 서버(localhost:8080)에 연결할 수 없어 Mock 데이터를 사용합니다. 실제 API 서버를 실행하면 실제 데이터를 볼 수 있습니다."
              type="warning"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}

          <Divider />

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>기본 사용법</Title>
              <Paragraph>
                <Text code>{'<SearchBar />'}</Text> - 기본 설정으로 사용
              </Paragraph>
              <SearchBar />
            </div>

            <div>
              <Title level={4}>커스텀 플레이스홀더</Title>
              <Paragraph>
                <Text code>{'<SearchBar placeholder="검색어를 입력하세요..." />'}</Text>
              </Paragraph>
              <SearchBar placeholder="검색어를 입력하세요..." />
            </div>

            <div>
              <Title level={4}>작은 크기</Title>
              <Paragraph>
                <Text code>{'<SearchBar size="small" />'}</Text>
              </Paragraph>
              <SearchBar size="small" />
            </div>

            <div>
              <Title level={4}>중간 크기</Title>
              <Paragraph>
                <Text code>{'<SearchBar size="middle" />'}</Text>
              </Paragraph>
              <SearchBar size="middle" />
            </div>

            <div>
              <Title level={4}>콜백 함수와 함께 사용</Title>
              <Paragraph>
                상품 선택 시와 카테고리 선택 시 각각 다른 동작을 수행할 수 있습니다.
              </Paragraph>
              <SearchBar
                placeholder="상품이나 카테고리를 검색해보세요..."
                onProductSelect={handleProductSelect}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            <div>
              <Title level={4}>커스텀 스타일</Title>
              <Paragraph>
                <Text code>{'<SearchBar style={{ width: 300, margin: "0 auto" }} />'}</Text>
              </Paragraph>
              <SearchBar 
                style={{ width: 300, margin: "0 auto" }}
                placeholder="중앙 정렬된 검색바"
              />
            </div>
          </Space>

          <Divider />

          <Title level={4}>Props 설명</Title>
          <Card size="small">
            <ul>
              <li><Text strong>placeholder</Text>: 검색바에 표시될 플레이스홀더 텍스트</li>
              <li><Text strong>size</Text>: 검색바 크기 ('small' | 'middle' | 'large')</li>
              <li><Text strong>style</Text>: 커스텀 CSS 스타일</li>
              <li><Text strong>onProductSelect</Text>: 상품 선택 시 호출될 콜백 함수</li>
              <li><Text strong>onCategorySelect</Text>: 카테고리 선택 시 호출될 콜백 함수</li>
              <li><Text strong>className</Text>: CSS 클래스명</li>
            </ul>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
}

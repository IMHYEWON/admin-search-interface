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

  // 기본 섹션 설정 (상품 + 카테고리)
  const defaultSections = [
    {
      key: 'products',
      title: 'Products',
      color: '#1890ff',
      itemType: 'product',
      onSelect: (id: string) => {
        console.log('상품 선택됨:', id);
        router.push(`/products/${id}`);
      },
      renderItem: (item: any) => (
        <div className="product-item" style={{ paddingLeft: '16px' }}>
          <span className="product-name">{item.name}</span>
          <span className={`product-status status-${item.status}`}>
            {item.status === 'active' && '활성'}
            {item.status === 'inactive' && '비활성'}
            {item.status === 'discontinued' && '단종'}
          </span>
        </div>
      )
    },
    {
      key: 'categories',
      title: 'Categories',
      color: '#52c41a',
      itemType: 'category',
      onSelect: (id: string) => {
        console.log('카테고리 선택됨:', id);
        router.push(`/categories/${id}`);
      },
      renderItem: (item: any) => (
        <div className="product-item" style={{ paddingLeft: '16px' }}>
          <span className="product-name">{item.name}</span>
          <span className={`product-status status-${item.status}`}>
            {item.metadata?.productCount || 0}개 상품
          </span>
        </div>
      )
    }
  ];


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
                <Text code>{'<SearchBar sections={defaultSections} />'}</Text> - 기본 설정으로 사용
              </Paragraph>
              <SearchBar sections={defaultSections} />
            </div>

            <div>
              <Title level={4}>커스텀 플레이스홀더</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={defaultSections} placeholder="검색어를 입력하세요..." />'}</Text>
              </Paragraph>
              <SearchBar sections={defaultSections} placeholder="검색어를 입력하세요..." />
            </div>

            <div>
              <Title level={4}>작은 크기</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={defaultSections} size="small" />'}</Text>
              </Paragraph>
              <SearchBar sections={defaultSections} size="small" />
            </div>

            <div>
              <Title level={4}>중간 크기</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={defaultSections} size="middle" />'}</Text>
              </Paragraph>
              <SearchBar sections={defaultSections} size="middle" />
            </div>

            <div>
              <Title level={4}>범용 콜백 사용법</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={defaultSections} onItemSelect={handleItemSelect} />'}</Text>
              </Paragraph>
              <SearchBar
                sections={defaultSections}
                placeholder="상품이나 카테고리를 검색해보세요..."
                onItemSelect={(itemId, itemType) => {
                  console.log(`${itemType} 선택됨:`, itemId);
                  if (itemType === 'product') {
                    router.push(`/products/${itemId}`);
                  } else if (itemType === 'category') {
                    router.push(`/categories/${itemId}`);
                  }
                }}
              />
            </div>

            <div>
              <Title level={4}>커스텀 스타일</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={defaultSections} style={{ width: 300, margin: "0 auto" }} />'}</Text>
              </Paragraph>
              <SearchBar 
                sections={defaultSections}
                style={{ width: 300, margin: "0 auto" }}
                placeholder="중앙 정렬된 검색바"
              />
            </div>
          </Space>

          <Divider />

          <Title level={3}>🎯 단일 섹션 검색 예시</Title>
          <Paragraph style={{ marginBottom: '24px' }}>
            새로운 범용 SearchBar를 사용하여 특정 섹션만 검색하는 예시들입니다.
          </Paragraph>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>상품만 검색</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={[productSection]} />'}</Text> - 상품만 검색하는 SearchBar
              </Paragraph>
              <SearchBar 
                sections={[
                  {
                    key: 'products',
                    title: 'Products',
                    color: '#1890ff',
                    itemType: 'product',
                    onSelect: (id) => {
                      console.log('상품 선택됨:', id);
                      router.push(`/products/${id}`);
                    }
                  }
                ]}
                placeholder="상품명을 입력하세요..."
              />
            </div>

            <div>
              <Title level={4}>카테고리만 검색</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={[categorySection]} />'}</Text> - 카테고리만 검색하는 SearchBar
              </Paragraph>
              <SearchBar 
                sections={[
                  {
                    key: 'categories',
                    title: 'Categories',
                    color: '#52c41a',
                    itemType: 'category',
                    onSelect: (id) => {
                      console.log('카테고리 선택됨:', id);
                      router.push(`/categories/${id}`);
                    }
                  }
                ]}
                placeholder="카테고리명을 입력하세요..."
              />
            </div>

            <div>
              <Title level={4}>이벤트 검색 (예시)</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={[eventSection]} />'}</Text> - 이벤트만 검색하는 SearchBar (Mock 데이터)
              </Paragraph>
              <SearchBar 
                sections={[
                  {
                    key: 'events',
                    title: 'Events',
                    color: '#722ed1',
                    itemType: 'event',
                    onSelect: (id) => {
                      console.log('이벤트 선택됨:', id);
                      alert(`이벤트 ${id} 선택됨!`);
                    },
                    renderItem: (item) => (
                      <div className="product-item" style={{ paddingLeft: '16px' }}>
                        <span className="product-name">{item.name}</span>
                        <span className="product-status" style={{ 
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#f0f0f0',
                          color: '#666'
                        }}>
                          {item.metadata?.date || '2024-01-01'}
                        </span>
                      </div>
                    )
                  }
                ]}
                placeholder="이벤트명을 입력하세요..."
              />
            </div>

            <div>
              <Title level={4}>사용자 검색 (예시)</Title>
              <Paragraph>
                <Text code>{'<SearchBar sections={[userSection]} />'}</Text> - 사용자만 검색하는 SearchBar (Mock 데이터)
              </Paragraph>
              <SearchBar 
                sections={[
                  {
                    key: 'users',
                    title: 'Users',
                    color: '#fa8c16',
                    itemType: 'user',
                    onSelect: (id) => {
                      console.log('사용자 선택됨:', id);
                      alert(`사용자 ${id} 선택됨!`);
                    },
                    renderItem: (item) => (
                      <div className="product-item" style={{ paddingLeft: '16px' }}>
                        <span className="product-name">{item.name}</span>
                        <span className="product-status" style={{ 
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#fff2e8',
                          color: '#fa8c16',
                          border: '1px solid #ffd591'
                        }}>
                          {item.metadata?.role || 'User'}
                        </span>
                      </div>
                    )
                  }
                ]}
                placeholder="사용자명을 입력하세요..."
              />
            </div>
          </Space>

          <Divider />

          <Title level={4}>Props 설명</Title>
          <Card size="small">
            <Title level={5}>기본 Props</Title>
            <ul>
              <li><Text strong>placeholder</Text>: 검색바에 표시될 플레이스홀더 텍스트</li>
              <li><Text strong>size</Text>: 검색바 크기 (&apos;small&apos; | &apos;middle&apos; | &apos;large&apos;)</li>
              <li><Text strong>style</Text>: 커스텀 CSS 스타일</li>
              <li><Text strong>className</Text>: CSS 클래스명</li>
            </ul>
            
            <Title level={5}>필수 Props</Title>
            <ul>
              <li><Text strong>sections</Text>: 검색 섹션 설정 배열 (SearchSectionConfig[]) - <Text type="danger">필수</Text></li>
              <li><Text strong>onItemSelect</Text>: 범용 아이템 선택 콜백 (itemId, itemType) - 선택사항</li>
            </ul>
            
            <Title level={5}>SearchSectionConfig 속성</Title>
            <ul>
              <li><Text strong>key</Text>: 섹션 고유 키 (예: &apos;products&apos;, &apos;categories&apos;)</li>
              <li><Text strong>title</Text>: 섹션 제목 (예: &apos;Products&apos;, &apos;Categories&apos;)</li>
              <li><Text strong>color</Text>: 섹션 색상 (예: &apos;#1890ff&apos;, &apos;#52c41a&apos;)</li>
              <li><Text strong>itemType</Text>: 아이템 타입 (예: &apos;product&apos;, &apos;category&apos;, &apos;event&apos;)</li>
              <li><Text strong>onSelect</Text>: 섹션별 선택 콜백 함수</li>
              <li><Text strong>renderItem</Text>: 커스텀 아이템 렌더링 함수</li>
            </ul>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
}

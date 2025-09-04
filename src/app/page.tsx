'use client';

import { Layout, Card, Row, Col, Typography, Button, Space, Divider } from 'antd';
import { 
  SearchOutlined, 
  ExperimentOutlined, 
  ShoppingOutlined,
  AppstoreOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const router = useRouter();

  const pageList = [
    {
      title: 'SearchBar 데모',
      description: 'SearchBar 컴포넌트의 다양한 사용법과 예시를 확인할 수 있습니다.',
      path: '/searchbar-demo',
      icon: <ExperimentOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      color: '#1890ff'
    },
    {
      title: '상품 검색',
      description: '실시간 상품 검색 기능을 테스트해보세요. API 서버 상태에 따라 실제 데이터 또는 Mock 데이터를 사용합니다.',
      path: '/',
      icon: <SearchOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      color: '#52c41a',
      isCurrent: true
    }
  ];

  const handlePageClick = (path: string) => {
    if (path === '/') {
      // 현재 페이지이므로 스크롤을 맨 위로
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          <Title level={1} style={{ marginBottom: '8px' }}>
            <HomeOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
            어드민 대시보드
          </Title>
          <Paragraph style={{ fontSize: '16px', marginBottom: '0' }}>
            헤더의 검색바를 사용하여 상품을 검색해보세요. 
            검색 결과에서 상품을 클릭하면 상세 페이지로 이동합니다.
          </Paragraph>
        </div>

        <Card>
          <Title level={2} style={{ marginBottom: '16px' }}>
            접근 가능한 페이지
          </Title>
          <Paragraph style={{ marginBottom: '24px' }}>
            아래 페이지들을 통해 다양한 기능을 확인하고 테스트할 수 있습니다.
          </Paragraph>

          <Row gutter={[16, 16]}>
            {pageList.map((page, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    border: page.isCurrent ? `2px solid ${page.color}` : '1px solid #d9d9d9',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  bodyStyle={{ padding: '20px' }}
                  onClick={() => handlePageClick(page.path)}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center' }}>
                      {page.icon}
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <Title level={4} style={{ margin: '0 0 8px 0', color: page.color }}>
                        {page.title}
                        {page.isCurrent && (
                          <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
                            (현재 페이지)
                          </Text>
                        )}
                      </Title>
                      <Paragraph style={{ margin: '0', color: '#666' }}>
                        {page.description}
                      </Paragraph>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <Button 
                        type={page.isCurrent ? 'default' : 'primary'}
                        size="small"
                        style={{ 
                          backgroundColor: page.isCurrent ? '#f5f5f5' : page.color,
                          borderColor: page.color,
                          color: page.isCurrent ? '#666' : '#fff'
                        }}
                      >
                        {page.isCurrent ? '현재 페이지' : '이동하기'}
                      </Button>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <Card size="small" style={{ backgroundColor: '#f9f9f9' }}>
            <Title level={4} style={{ marginBottom: '12px' }}>
              💡 사용 팁
            </Title>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>
                <Text strong>검색 기능:</Text> 헤더의 검색바에서 상품명이나 카테고리를 입력하면 실시간으로 검색 결과를 확인할 수 있습니다.
              </li>
              <li>
                <Text strong>API 상태:</Text> SearchBar 데모 페이지에서 현재 API 서버 연결 상태를 확인할 수 있습니다.
              </li>
              <li>
                <Text strong>Mock 데이터:</Text> API 서버가 실행되지 않은 경우 자동으로 Mock 데이터를 사용합니다.
              </li>
              <li>
                <Text strong>상세 페이지:</Text> 검색 결과에서 상품이나 카테고리를 클릭하면 상세 정보를 볼 수 있습니다.
              </li>
            </ul>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
}
